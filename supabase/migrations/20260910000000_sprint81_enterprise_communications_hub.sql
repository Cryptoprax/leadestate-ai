-- Sprint 81: Enterprise Communications Hub. Authenticated, tenant-scoped, recommendation-only.
alter table public.communication_notes add column if not exists pinned boolean not null default false;
alter table public.communication_notes add column if not exists mentions uuid[] not null default '{}';
alter table public.communication_notes add column if not exists attachment_ids uuid[] not null default '{}';

create table if not exists public.communication_attachments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  thread_id uuid not null references public.communication_threads(id) on delete cascade,
  communication_id uuid references public.communications(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 240),
  kind text not null check (kind in ('image','pdf','brochure','floor-plan','contract','video-placeholder')),
  content_type text not null check (content_type in ('image/jpeg','image/png','image/webp','application/pdf','video/placeholder')),
  size_bytes bigint not null check (size_bytes between 1 and 26214400),
  storage_path text,
  permission_scope text not null default 'conversation-members' check (permission_scope='conversation-members'),
  metadata jsonb not null default '{}',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index if not exists communication_attachments_thread_idx on public.communication_attachments(organization_id,workspace_id,thread_id,created_at desc);

create table if not exists public.communication_ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  thread_id uuid not null references public.communication_threads(id) on delete cascade,
  employee text not null,
  recommendation_type text not null check (recommendation_type in ('summary','reply-draft','response-recommendation','intent','action-items','urgency','follow-up-task')),
  content text not null check (char_length(content) between 1 and 12000),
  confidence numeric(5,2) check (confidence between 0 and 100),
  recommendation_only boolean not null default true check (recommendation_only),
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected','expired')),
  trace_id uuid not null default gen_random_uuid(),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index if not exists communication_ai_thread_idx on public.communication_ai_recommendations(organization_id,workspace_id,thread_id,created_at desc);

create table if not exists public.communication_audit (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  thread_id uuid references public.communication_threads(id) on delete set null,
  event_type text not null,
  actor_id uuid not null references auth.users(id),
  metadata jsonb not null default '{}',
  occurred_at timestamptz not null default now()
);
create index if not exists communication_audit_tenant_idx on public.communication_audit(organization_id,workspace_id,occurred_at desc);

alter table public.communication_attachments enable row level security;
alter table public.communication_ai_recommendations enable row level security;
alter table public.communication_audit enable row level security;

create or replace function public.communication_tenant_member(p_organization_id uuid,p_workspace_id uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select auth.uid() is not null
    and public.is_organization_member(p_organization_id)
    and public.current_workspace_role(p_workspace_id) is not null
    and exists(select 1 from public.workspaces w where w.id=p_workspace_id and w.organization_id=p_organization_id)
$$;

create or replace function public.communication_can_manage(p_workspace_id uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select public.current_workspace_role(p_workspace_id) in ('organization_owner','organization_admin','branch_manager','sales_manager','agent')
$$;

create policy "communication_attachments_read" on public.communication_attachments for select to authenticated using (public.communication_tenant_member(organization_id,workspace_id));
create policy "communication_attachments_insert" on public.communication_attachments for insert to authenticated with check (public.communication_tenant_member(organization_id,workspace_id) and public.communication_can_manage(workspace_id) and created_by=auth.uid());
create policy "communication_attachments_delete" on public.communication_attachments for delete to authenticated using (public.communication_tenant_member(organization_id,workspace_id) and public.communication_can_manage(workspace_id));
create policy "communication_ai_read" on public.communication_ai_recommendations for select to authenticated using (public.communication_tenant_member(organization_id,workspace_id));
create policy "communication_ai_insert" on public.communication_ai_recommendations for insert to authenticated with check (public.communication_tenant_member(organization_id,workspace_id) and public.communication_can_manage(workspace_id) and created_by=auth.uid() and recommendation_only=true);
create policy "communication_ai_update" on public.communication_ai_recommendations for update to authenticated using (public.communication_tenant_member(organization_id,workspace_id) and public.communication_can_manage(workspace_id)) with check (public.communication_tenant_member(organization_id,workspace_id) and recommendation_only=true);
create policy "communication_audit_read" on public.communication_audit for select to authenticated using (public.communication_tenant_member(organization_id,workspace_id));
create policy "communication_audit_insert" on public.communication_audit for insert to authenticated with check (public.communication_tenant_member(organization_id,workspace_id) and actor_id=auth.uid());

create or replace function public.add_enterprise_communication_note(p_thread_id uuid,p_body text,p_pinned boolean default false,p_mentions uuid[] default '{}')
returns uuid language plpgsql security definer set search_path=public as $$
declare t public.communication_threads%rowtype; n uuid;
begin
  select * into t from public.communication_threads where id=p_thread_id and deleted_at is null;
  if not found or not public.communication_tenant_member(t.organization_id,t.workspace_id) or not public.communication_can_manage(t.workspace_id) then raise exception 'insufficient communication permission'; end if;
  if char_length(trim(p_body)) not between 1 and 12000 then raise exception 'invalid note length'; end if;
  insert into public.communication_notes(organization_id,workspace_id,thread_id,body,pinned,mentions,created_by,updated_by) values(t.organization_id,t.workspace_id,t.id,trim(p_body),p_pinned,p_mentions,auth.uid(),auth.uid()) returning id into n;
  insert into public.communications(organization_id,workspace_id,thread_id,channel,direction,status,body,user_id) values(t.organization_id,t.workspace_id,t.id,'internal_note','internal','logged',trim(p_body),auth.uid());
  insert into public.communication_audit(organization_id,workspace_id,thread_id,event_type,actor_id,metadata) values(t.organization_id,t.workspace_id,t.id,'internal_note.created',auth.uid(),jsonb_build_object('note_id',n,'pinned',p_pinned,'mention_count',cardinality(p_mentions)));
  return n;
end $$;

revoke all on function public.add_enterprise_communication_note(uuid,text,boolean,uuid[]) from public;
grant execute on function public.add_enterprise_communication_note(uuid,text,boolean,uuid[]) to authenticated;
