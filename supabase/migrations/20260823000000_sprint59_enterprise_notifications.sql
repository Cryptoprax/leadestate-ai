-- Sprint 59: Enterprise Notification Platform. Extends the Sprint 22 notification substrate.
alter table public.notification_events add column if not exists source_type text;
alter table public.notification_events add column if not exists source_id uuid;
alter table public.notification_events add column if not exists archived_at timestamptz;
alter table public.notification_events add column if not exists snoozed_until timestamptz;
alter table public.notification_events add column if not exists starred boolean not null default false;
alter table public.notification_events add column if not exists mentioned boolean not null default false;

alter table public.notification_preferences add column if not exists browser_push_enabled boolean not null default false;
alter table public.notification_preferences add column if not exists whatsapp_enabled boolean not null default false;
alter table public.notification_preferences add column if not exists muted boolean not null default false;
alter table public.notification_preferences add column if not exists digest_frequency text not null default 'instant' check(digest_frequency in('instant','daily','weekly','off'));

alter table public.notification_queue add column if not exists started_at timestamptz;
alter table public.notification_queue add column if not exists delivered_at timestamptz;
alter table public.notification_queue add column if not exists provider text;

create table if not exists public.notification_reminders(
  id uuid primary key default gen_random_uuid(),organization_id uuid not null references public.organizations(id)on delete cascade,workspace_id uuid not null references public.workspaces(id)on delete cascade,user_id uuid not null references auth.users(id)on delete cascade,
  kind text not null check(kind in('meeting','task','lead_follow_up','deal_deadline','subscription_renewal','trial_ending','workflow_approval','ai_recommendation','custom')),title text not null check(char_length(title)between 1 and 180),remind_at timestamptz not null,status text not null default 'scheduled' check(status in('scheduled','sent','cancelled')),source_type text,source_id uuid,notification_id uuid references public.notification_events(id)on delete set null,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index if not exists notification_events_center_idx on public.notification_events(workspace_id,user_id,created_at desc);
create index if not exists notification_events_unread_idx on public.notification_events(workspace_id,user_id)where read_at is null and archived_at is null;
create index if not exists notification_reminders_due_idx on public.notification_reminders(status,remind_at)where status='scheduled';

alter table public.notification_reminders enable row level security;
drop policy if exists notification_reminders_owner on public.notification_reminders;
create policy notification_reminders_owner on public.notification_reminders for all to authenticated using(user_id=auth.uid()and public.is_organization_member(organization_id))with check(user_id=auth.uid()and public.is_organization_member(organization_id));
drop policy if exists notification_queue_member_read on public.notification_queue;
create policy notification_queue_member_read on public.notification_queue for select to authenticated using(public.is_organization_member(organization_id));

create or replace function public.enqueue_notification(p_input jsonb)returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid;v_channel text;v_org uuid:=(p_input->>'organizationId')::uuid;v_workspace uuid:=(p_input->>'workspaceId')::uuid;v_user uuid:=nullif(p_input->>'userId','')::uuid;
begin
  if not exists(select 1 from workspaces where id=v_workspace and organization_id=v_org)then raise exception 'Invalid notification workspace.';end if;
  insert into notification_events(organization_id,workspace_id,user_id,category,title,body,priority,dedupe_key,source_type,source_id,mentioned)
  values(v_org,v_workspace,v_user,p_input->>'category',left(p_input->>'title',180),left(p_input->>'body',4000),coalesce(p_input->>'priority','normal'),left(p_input->>'dedupeKey',220),nullif(p_input->>'sourceType',''),nullif(p_input->>'sourceId','')::uuid,coalesce((p_input->>'mentioned')::boolean,false))
  on conflict(organization_id,dedupe_key)do update set title=excluded.title,body=excluded.body,priority=excluded.priority returning id into v_id;
  for v_channel in select jsonb_array_elements_text(coalesce(p_input->'channels','["in_app"]'))loop
    if v_channel not in('in_app','email')then continue;end if;
    insert into notification_queue(organization_id,workspace_id,notification_id,channel,idempotency_key)values(v_org,v_workspace,v_id,v_channel,v_id||':'||v_channel)on conflict(idempotency_key)do nothing;
  end loop;
  insert into activity_events(organization_id,workspace_id,event_type,title,description,related_type,related_id,metadata)
  values(v_org,v_workspace,'notification.created',left(p_input->>'title',180),left(p_input->>'body',4000),'notification',v_id,jsonb_build_object('category',p_input->>'category','priority',coalesce(p_input->>'priority','normal')))on conflict do nothing;
  return v_id;
end$$;

create or replace function public.mutate_notification(p_notification_id uuid,p_action text,p_snoozed_until timestamptz default null)returns void language plpgsql security definer set search_path=public as $$
begin
  if p_action not in('read','unread','archive','restore','star','unstar','snooze')then raise exception 'Unsupported notification action.';end if;
  update notification_events set read_at=case when p_action='read'then now()when p_action='unread'then null else read_at end,archived_at=case when p_action='archive'then now()when p_action='restore'then null else archived_at end,starred=case when p_action='star'then true when p_action='unstar'then false else starred end,snoozed_until=case when p_action='snooze'then p_snoozed_until else snoozed_until end
  where id=p_notification_id and public.is_organization_member(organization_id)and(user_id is null or user_id=auth.uid());
end$$;

create or replace function public.save_notification_preferences(p_input jsonb)returns void language plpgsql security definer set search_path=public as $$
declare v_org uuid:=(p_input->>'organizationId')::uuid;v_workspace uuid:=(p_input->>'workspaceId')::uuid;
begin
  if auth.uid()is null or not public.is_organization_member(v_org)or not exists(select 1 from workspaces where id=v_workspace and organization_id=v_org)then raise exception 'Access denied.';end if;
  insert into notification_preferences(organization_id,workspace_id,user_id,email_enabled,in_app_enabled,browser_push_enabled,whatsapp_enabled,webhook_enabled,muted,quiet_hours_start,quiet_hours_end,digest_frequency,categories)
  values(v_org,v_workspace,auth.uid(),coalesce((p_input->>'email')::boolean,true),coalesce((p_input->>'inApp')::boolean,true),coalesce((p_input->>'browserPush')::boolean,false),coalesce((p_input->>'whatsapp')::boolean,false),coalesce((p_input->>'webhook')::boolean,false),coalesce((p_input->>'muted')::boolean,false),nullif(p_input->>'quietHoursStart','')::time,nullif(p_input->>'quietHoursEnd','')::time,coalesce(p_input->>'digestFrequency','instant'),coalesce(p_input->'categories','{}'))
  on conflict(workspace_id,user_id)do update set email_enabled=excluded.email_enabled,in_app_enabled=excluded.in_app_enabled,browser_push_enabled=excluded.browser_push_enabled,whatsapp_enabled=excluded.whatsapp_enabled,webhook_enabled=excluded.webhook_enabled,muted=excluded.muted,quiet_hours_start=excluded.quiet_hours_start,quiet_hours_end=excluded.quiet_hours_end,digest_frequency=excluded.digest_frequency,categories=excluded.categories,updated_at=now();
end$$;

create or replace function public.schedule_notification_reminder(p_input jsonb)returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid;v_org uuid:=(p_input->>'organizationId')::uuid;v_workspace uuid:=(p_input->>'workspaceId')::uuid;
begin
  if auth.uid()is null or not public.is_organization_member(v_org)or not exists(select 1 from workspaces where id=v_workspace and organization_id=v_org)then raise exception 'Access denied.';end if;
  insert into notification_reminders(organization_id,workspace_id,user_id,kind,title,remind_at,source_type,source_id)values(v_org,v_workspace,auth.uid(),p_input->>'kind',left(p_input->>'title',180),(p_input->>'remindAt')::timestamptz,nullif(p_input->>'sourceType',''),nullif(p_input->>'sourceId','')::uuid)returning id into v_id;return v_id;
end$$;

create or replace function public.notification_observability(p_workspace_id uuid)returns table(unread_count bigint,queued bigint,delivered bigint,failed bigint,average_latency_ms numeric,by_channel jsonb,by_category jsonb)language sql stable security definer set search_path=public as $$
select(select count(*)from notification_events n where n.workspace_id=p_workspace_id and n.read_at is null and n.archived_at is null and(n.user_id is null or n.user_id=auth.uid())),(select count(*)from notification_queue q where q.workspace_id=p_workspace_id and q.status in('queued','processing')),(select count(*)from notification_queue q where q.workspace_id=p_workspace_id and q.status='sent'),(select count(*)from notification_queue q where q.workspace_id=p_workspace_id and q.status='failed'),(select round(avg(extract(epoch from(coalesce(q.delivered_at,q.updated_at)-q.created_at))*1000))from notification_queue q where q.workspace_id=p_workspace_id and q.status='sent'),coalesce((select jsonb_object_agg(channel,total)from(select channel,count(*)total from notification_queue where workspace_id=p_workspace_id group by channel)s),'{}'),coalesce((select jsonb_object_agg(category,total)from(select category,count(*)total from notification_events where workspace_id=p_workspace_id group by category)s),'{}')where public.is_organization_member((select organization_id from workspaces where id=p_workspace_id));
$$;

create or replace function public.notify_ai_recommendation()returns trigger language plpgsql security definer set search_path=public as $$begin perform enqueue_notification(jsonb_build_object('organizationId',new.organization_id,'workspaceId',new.workspace_id,'category','ai_recommendation','title',new.title,'body',new.summary,'priority',case when coalesce(new.confidence,0)>=.9 then'high'else'normal'end,'channels',jsonb_build_array('in_app'),'dedupeKey','ai-recommendation:'||new.id,'sourceType','ai_recommendation','sourceId',new.id));return new;end$$;
drop trigger if exists ai_recommendation_notification on public.ai_recommendations;create trigger ai_recommendation_notification after insert on public.ai_recommendations for each row execute function public.notify_ai_recommendation();

create or replace function public.notify_ai_approval()returns trigger language plpgsql security definer set search_path=public as $$begin perform enqueue_notification(jsonb_build_object('organizationId',new.organization_id,'workspaceId',new.workspace_id,'category','approval','title',case when new.status='pending'then'Approval required'else'Approval '||new.status end,'body','An AI recommendation approval is '||new.status||'.','priority',case when new.status='pending'then'high'else'normal'end,'channels',jsonb_build_array('in_app'),'dedupeKey','ai-approval:'||new.id||':'||new.version,'sourceType','approval','sourceId',new.id));return new;end$$;
drop trigger if exists ai_approval_notification on public.ai_approval_queue;create trigger ai_approval_notification after insert or update of status on public.ai_approval_queue for each row execute function public.notify_ai_approval();

create or replace function public.notify_security_alert()returns trigger language plpgsql security definer set search_path=public as $$begin if new.organization_id is not null and new.workspace_id is not null then perform enqueue_notification(jsonb_build_object('organizationId',new.organization_id,'workspaceId',new.workspace_id,'userId',new.user_id,'category','security','title',new.title,'body','Review this security event in Identity & Security.','priority',case when new.severity in('high','critical')then'urgent'else'normal'end,'channels',jsonb_build_array('in_app','email'),'dedupeKey','security-alert:'||new.id,'sourceType','security_alert','sourceId',new.id));end if;return new;end$$;
drop trigger if exists security_alert_notification on public.security_alerts;create trigger security_alert_notification after insert on public.security_alerts for each row execute function public.notify_security_alert();

create or replace function public.notify_billing_event()returns trigger language plpgsql security definer set search_path=public as $$declare v_title text;v_priority text:='normal';begin if new.organization_id is null or new.workspace_id is null or new.status not in('processed','failed')then return new;end if;v_title:=case new.event_type when'invoice.paid'then'Payment succeeded'when'invoice.payment_failed'then'Payment failed'when'checkout.session.completed'then'Subscription activated'when'customer.subscription.deleted'then'Subscription cancelled'else'Billing update'end;if new.event_type='invoice.payment_failed'or new.status='failed'then v_priority:='urgent';end if;perform enqueue_notification(jsonb_build_object('organizationId',new.organization_id,'workspaceId',new.workspace_id,'category','billing','title',v_title,'body','Review the latest billing event in Billing settings.','priority',v_priority,'channels',jsonb_build_array('in_app','email'),'dedupeKey','billing-event:'||new.id,'sourceType','billing_event','sourceId',new.id));return new;end$$;
drop trigger if exists billing_event_notification on public.billing_events;create trigger billing_event_notification after insert or update of status on public.billing_events for each row execute function public.notify_billing_event();

create or replace function public.process_due_notification_reminders(p_limit integer default 100)returns integer language plpgsql security definer set search_path=public as $$declare r notification_reminders%rowtype;v_count integer:=0;v_notification uuid;begin for r in select*from notification_reminders where status='scheduled'and remind_at<=now()order by remind_at for update skip locked limit least(greatest(p_limit,1),500)loop v_notification:=enqueue_notification(jsonb_build_object('organizationId',r.organization_id,'workspaceId',r.workspace_id,'userId',r.user_id,'category',case when r.kind='meeting'then'calendar'when r.kind in('lead_follow_up','deal_deadline')then'crm'when r.kind in('subscription_renewal','trial_ending')then'billing'when r.kind='workflow_approval'then'approval'when r.kind='ai_recommendation'then'ai_recommendation'else'workflow'end,'title',r.title,'body','Scheduled reminder','priority','normal','channels',jsonb_build_array('in_app','email'),'dedupeKey','reminder:'||r.id,'sourceType','reminder','sourceId',r.id));update notification_reminders set status='sent',notification_id=v_notification,updated_at=now()where id=r.id;v_count:=v_count+1;end loop;return v_count;end$$;

revoke all on function public.mutate_notification(uuid,text,timestamptz),public.save_notification_preferences(jsonb),public.schedule_notification_reminder(jsonb),public.notification_observability(uuid)from public;
grant execute on function public.mutate_notification(uuid,text,timestamptz),public.save_notification_preferences(jsonb),public.schedule_notification_reminder(jsonb),public.notification_observability(uuid)to authenticated;
revoke all on function public.process_due_notification_reminders(integer)from public;grant execute on function public.process_due_notification_reminders(integer)to service_role;
grant select on public.notification_queue,public.notification_reminders to authenticated;
