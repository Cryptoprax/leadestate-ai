-- Sprint 61: durable, tenant-scoped workflow automation on the existing runtime.
create table if not exists public.workflow_definitions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  description text not null default '',
  version integer not null default 1 check (version > 0),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  definition jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id), updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  published_at timestamptz, deleted_at timestamptz,
  unique(workspace_id,id)
);
create table if not exists public.workflow_instances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  workflow_id uuid not null references public.workflow_definitions(id) on delete cascade,
  workflow_version integer not null,
  trigger_kind text not null, trigger_payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check(status in ('queued','running','waiting','approval_pending','completed','failed','cancelled','timed_out')),
  started_at timestamptz not null default now(), completed_at timestamptz,
  duration_ms integer, step_count integer not null default 0,
  ai_participation boolean not null default false,
  estimated_cost numeric(18,8) not null default 0,
  retry_count integer not null default 0,
  failure_reason text, approval_status text,
  runtime_snapshot jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.workflow_step_executions (
  id uuid primary key default gen_random_uuid(), instance_id uuid not null references public.workflow_instances(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  node_id text not null, action_kind text not null, status text not null,
  attempt integer not null default 1, duration_ms integer, provider text, model text,
  prompt_tokens integer not null default 0, completion_tokens integer not null default 0,
  estimated_cost numeric(18,8) not null default 0, sanitized_error text,
  output_metadata jsonb not null default '{}'::jsonb, started_at timestamptz not null default now(), completed_at timestamptz
);
create table if not exists public.workflow_trigger_events (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  trigger_kind text not null, source_type text not null, source_id text not null,
  idempotency_key text not null, payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check(status in ('pending','processing','processed','failed')),
  attempts integer not null default 0, available_at timestamptz not null default now(), processed_at timestamptz,
  failure_reason text, created_at timestamptz not null default now(), unique(workspace_id,idempotency_key)
);
create table if not exists public.workflow_automation_approvals (
  id uuid primary key default gen_random_uuid(), instance_id uuid not null references public.workflow_instances(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  node_id text not null, status text not null default 'pending' check(status in ('pending','approved','rejected','expired')),
  requested_by uuid references auth.users(id), decided_by uuid references auth.users(id), reason text,
  requested_at timestamptz not null default now(), decided_at timestamptz, expires_at timestamptz,
  unique(instance_id,node_id)
);
create index if not exists workflow_definitions_tenant_idx on public.workflow_definitions(organization_id,workspace_id,status) where deleted_at is null;
create index if not exists workflow_instances_monitor_idx on public.workflow_instances(organization_id,workspace_id,created_at desc);
create index if not exists workflow_triggers_claim_idx on public.workflow_trigger_events(status,available_at) where status='pending';

alter table public.workflow_definitions enable row level security;
alter table public.workflow_instances enable row level security;
alter table public.workflow_step_executions enable row level security;
alter table public.workflow_trigger_events enable row level security;
alter table public.workflow_automation_approvals enable row level security;
create policy "workflow definitions tenant read" on public.workflow_definitions for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "workflow instances tenant read" on public.workflow_instances for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "workflow steps tenant read" on public.workflow_step_executions for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "workflow triggers tenant read" on public.workflow_trigger_events for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "workflow approvals tenant read" on public.workflow_automation_approvals for select to authenticated using(public.current_workspace_role(workspace_id) is not null);

create or replace function public.can_manage_workflow_automation(p_workspace_id uuid) returns boolean language sql stable security definer set search_path=public as $$
 select public.current_workspace_role(p_workspace_id) in ('organization_owner','organization_admin','manager','operations');
$$;
create or replace function public.save_workflow_definition(p_workspace_id uuid,p_input jsonb) returns uuid language plpgsql security definer set search_path=public as $$
declare v_org uuid; v_id uuid:=coalesce(nullif(p_input->>'id','')::uuid,gen_random_uuid()); v_version integer:=greatest(coalesce((p_input->>'version')::integer,1),1);
begin
 select organization_id into v_org from workspace_members where workspace_id=p_workspace_id and user_id=auth.uid() and status='active';
 if v_org is null or not public.can_manage_workflow_automation(p_workspace_id) then raise exception 'insufficient workflow permission'; end if;
 if jsonb_array_length(coalesce(p_input->'nodes','[]'))=0 or length(coalesce(p_input->>'name',''))<2 then raise exception 'invalid workflow definition'; end if;
 insert into workflow_definitions(id,organization_id,workspace_id,name,description,version,status,definition,created_by,updated_by)
 values(v_id,v_org,p_workspace_id,trim(p_input->>'name'),coalesce(p_input->>'description',''),v_version,'draft',p_input,auth.uid(),auth.uid())
 on conflict(id) do update set name=excluded.name,description=excluded.description,definition=excluded.definition,version=workflow_definitions.version+1,status='draft',updated_by=auth.uid(),updated_at=now()
 where workflow_definitions.organization_id=v_org and workflow_definitions.workspace_id=p_workspace_id and workflow_definitions.deleted_at is null;
 if not found then raise exception 'workflow not found in workspace'; end if;
 insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,subject_id,metadata) values(v_org,p_workspace_id,auth.uid(),'workflow.saved',v_id,jsonb_build_object('version',v_version));
 return v_id;
end$$;
create or replace function public.publish_workflow_definition(p_workspace_id uuid,p_workflow_id uuid,p_expected_version integer) returns void language plpgsql security definer set search_path=public as $$
declare v_org uuid;
begin
 select organization_id into v_org from workspace_members where workspace_id=p_workspace_id and user_id=auth.uid() and status='active';
 if v_org is null or not public.can_manage_workflow_automation(p_workspace_id) then raise exception 'insufficient workflow permission'; end if;
 update workflow_definitions set status='published',published_at=now(),updated_by=auth.uid(),updated_at=now() where id=p_workflow_id and organization_id=v_org and workspace_id=p_workspace_id and version=p_expected_version and deleted_at is null;
 if not found then raise exception 'workflow changed or unavailable'; end if;
 insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,subject_id) values(v_org,p_workspace_id,auth.uid(),'workflow.published',p_workflow_id);
end$$;
create or replace function public.enqueue_workflow_trigger(p_workspace_id uuid,p_trigger_kind text,p_source_type text,p_source_id text,p_idempotency_key text,p_payload jsonb default '{}'::jsonb) returns uuid language plpgsql security definer set search_path=public as $$
declare v_org uuid;v_id uuid;
begin select organization_id into v_org from workspaces where id=p_workspace_id;if v_org is null then raise exception 'workspace unavailable';end if;
 insert into workflow_trigger_events(organization_id,workspace_id,trigger_kind,source_type,source_id,idempotency_key,payload) values(v_org,p_workspace_id,p_trigger_kind,p_source_type,p_source_id,p_idempotency_key,coalesce(p_payload,'{}')) on conflict(workspace_id,idempotency_key) do update set idempotency_key=excluded.idempotency_key returning id into v_id;return v_id;end$$;
revoke all on function public.enqueue_workflow_trigger(uuid,text,text,text,text,jsonb) from public,authenticated;
grant execute on function public.enqueue_workflow_trigger(uuid,text,text,text,text,jsonb) to service_role;
grant execute on function public.can_manage_workflow_automation(uuid),public.save_workflow_definition(uuid,jsonb),public.publish_workflow_definition(uuid,uuid,integer) to authenticated;
