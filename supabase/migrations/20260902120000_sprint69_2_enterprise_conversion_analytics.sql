create table if not exists public.workspace_analytics_events(
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id),
  workspace_id uuid not null references public.workspaces(id),
  event_name text not null,
  path text not null check(char_length(path)<=300),
  duration_ms integer check(duration_ms between 0 and 86400000),
  metadata jsonb not null default'{}',
  occurred_at timestamptz not null default now()
);
create index if not exists workspace_analytics_events_scope_idx on public.workspace_analytics_events(organization_id,workspace_id,occurred_at desc)include(event_name,path,duration_ms);
alter table public.workspace_analytics_events enable row level security;
revoke all on public.workspace_analytics_events from anon,authenticated;
create policy workspace_analytics_events_select on public.workspace_analytics_events for select to authenticated using(public.current_workspace_role(workspace_id)in('organization_owner','organization_admin','manager','marketing','finance','read_only'));
create or replace function public.record_workspace_analytics_event(p_workspace_id uuid,p_event jsonb)returns void language plpgsql security definer set search_path=public as $$declare v_org uuid;v_name text:=p_event->>'name';begin select organization_id into v_org from workspaces where id=p_workspace_id and public.current_workspace_role(id)is not null;if v_org is null then raise exception'workspace access required';end if;if v_name not in('organization_created','workspace_completed','onboarding_completed','first_ai_interaction','subscription_initiated','ai_workforce_used','crm_used','knowledge_used','workflow_used','notifications_used','email_used','executive_dashboard_used','marketing_ai_used','sales_ai_used','whatsapp_ai_used')or coalesce(p_event->>'path','')not like'/vayon/%'then raise exception'invalid analytics event';end if;insert into workspace_analytics_events(organization_id,workspace_id,event_name,path,duration_ms,metadata)values(v_org,p_workspace_id,v_name,p_event->>'path',least(86400000,greatest(0,coalesce((p_event->>'durationMs')::integer,0))),coalesce(p_event->'metadata','{}')-'email'-'name'-'phone'-'token'-'authorization');end$$;
revoke all on function public.record_workspace_analytics_event(uuid,jsonb)from public;grant execute on function public.record_workspace_analytics_event(uuid,jsonb)to authenticated;
create index if not exists marketing_events_path_performance_idx on public.marketing_events(path,event_type,created_at desc);
create or replace function public.record_public_marketing_event(p_event jsonb)returns void language plpgsql security definer set search_path=public as $$begin if p_event->>'type'not in('page_view','cta_click','demo_request','trial_signup','contact_sales','newsletter','demo_launch','roi_calculation','industry_view','comparison_view','marketing_conversion','web_vital','tracking_failure')or length(p_event->>'path')>300 or(p_event->>'sessionId')!~'^[0-9a-f-]{36}$'then raise exception'invalid event';end if;insert into marketing_events(event_type,path,session_hash,metadata)values(p_event->>'type',p_event->>'path',encode(digest(p_event->>'sessionId','sha256'),'hex'),coalesce(p_event->'metadata','{}')-'email'-'name'-'phone'-'token'-'authorization');end$$;
revoke all on function public.record_public_marketing_event(jsonb)from public;grant execute on function public.record_public_marketing_event(jsonb)to anon,authenticated;
