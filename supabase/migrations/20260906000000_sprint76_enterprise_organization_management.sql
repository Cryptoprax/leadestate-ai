-- Sprint 76: Enterprise Organization Management Platform
alter table public.organizations add column if not exists business_hours jsonb not null default '{"monday":{"open":"09:00","close":"18:00"},"tuesday":{"open":"09:00","close":"18:00"},"wednesday":{"open":"09:00","close":"18:00"},"thursday":{"open":"09:00","close":"18:00"},"friday":{"open":"09:00","close":"18:00"}}';
alter table public.organizations add column if not exists regional_settings jsonb not null default '{}';

create table if not exists public.organization_departments(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id),
  name text not null check(char_length(trim(name)) between 2 and 100), manager_member_id uuid references public.workspace_members(id), kpis jsonb not null default '[]', permissions text[] not null default '{}',
  status text not null default 'active' check(status in('active','archived')), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), version integer not null default 1
);
create unique index if not exists organization_departments_active_name_idx on public.organization_departments(workspace_id,lower(name)) where status='active';
create index if not exists organization_departments_tenant_idx on public.organization_departments(organization_id,workspace_id,status);
insert into public.organization_departments(organization_id,workspace_id,name,kpis,permissions)
select w.organization_id,w.id,seed.name,'[]'::jsonb,'{}'::text[] from public.workspaces w cross join unnest(array['Sales','Marketing','Operations','Support','Finance','HR','Legal','IT']) seed(name)
where not exists(select 1 from public.organization_departments d where d.workspace_id=w.id and lower(d.name)=lower(seed.name) and d.status='active');

create table if not exists public.organization_teams(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), department_id uuid not null references public.organization_departments(id),
  name text not null check(char_length(trim(name)) between 2 and 100), manager_member_id uuid references public.workspace_members(id), capacity integer not null default 10 check(capacity between 1 and 10000),
  status text not null default 'active' check(status in('active','archived')), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), version integer not null default 1
);
create unique index if not exists organization_teams_active_name_idx on public.organization_teams(workspace_id,lower(name)) where status='active';
create index if not exists organization_teams_tenant_idx on public.organization_teams(organization_id,workspace_id,department_id,status);

create table if not exists public.organization_team_members(
  organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), team_id uuid not null references public.organization_teams(id) on delete cascade, member_id uuid not null references public.workspace_members(id) on delete cascade, assigned_at timestamptz not null default now(), primary key(team_id,member_id)
);

alter table public.organization_departments enable row level security;
alter table public.organization_teams enable row level security;
alter table public.organization_team_members enable row level security;
create policy "organization_departments_member_read" on public.organization_departments for select to authenticated using(public.is_organization_member(organization_id) and exists(select 1 from public.workspace_members wm where wm.workspace_id=organization_departments.workspace_id and wm.user_id=auth.uid() and wm.status='active'));
create policy "organization_teams_member_read" on public.organization_teams for select to authenticated using(public.is_organization_member(organization_id) and exists(select 1 from public.workspace_members wm where wm.workspace_id=organization_teams.workspace_id and wm.user_id=auth.uid() and wm.status='active'));
create policy "organization_team_members_member_read" on public.organization_team_members for select to authenticated using(public.is_organization_member(organization_id) and exists(select 1 from public.workspace_members wm where wm.workspace_id=organization_team_members.workspace_id and wm.user_id=auth.uid() and wm.status='active'));

create or replace function public.manage_organization_department(p_workspace_id uuid,p_intent text,p_department_id uuid,p_input jsonb) returns uuid language plpgsql security definer set search_path=public as $$
declare v_org uuid:=public.enterprise_org_context(p_workspace_id);v_id uuid:=p_department_id;v_manager uuid:=nullif(p_input->>'managerMemberId','')::uuid;
begin
  if v_manager is not null and not exists(select 1 from workspace_members where id=v_manager and organization_id=v_org and workspace_id=p_workspace_id and status='active') then raise exception'invalid department manager';end if;
  if p_intent='create' then insert into organization_departments(organization_id,workspace_id,name,manager_member_id,kpis,permissions) values(v_org,p_workspace_id,trim(p_input->>'name'),v_manager,coalesce(p_input->'kpis','[]'),coalesce(array(select jsonb_array_elements_text(coalesce(p_input->'permissions','[]'))),'{}')) returning id into v_id;
  elsif p_intent='update' then update organization_departments set name=trim(p_input->>'name'),manager_member_id=v_manager,kpis=coalesce(p_input->'kpis',kpis),permissions=coalesce(array(select jsonb_array_elements_text(coalesce(p_input->'permissions','[]'))),permissions),updated_at=now(),version=version+1 where id=v_id and organization_id=v_org and workspace_id=p_workspace_id and status='active';
  elsif p_intent='archive' then update organization_departments set status='archived',updated_at=now(),version=version+1 where id=v_id and organization_id=v_org and workspace_id=p_workspace_id;
  else raise exception'invalid department intent';end if;
  if not found then raise exception'department not found';end if;
  insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,subject_id,metadata) values(v_org,p_workspace_id,auth.uid(),'organization.updated',v_id,jsonb_build_object('resource','department','intent',p_intent));return v_id;
end$$;

create or replace function public.manage_organization_team(p_workspace_id uuid,p_intent text,p_team_id uuid,p_input jsonb) returns uuid language plpgsql security definer set search_path=public as $$
declare v_org uuid:=public.enterprise_org_context(p_workspace_id);v_id uuid:=p_team_id;v_department uuid:=nullif(p_input->>'departmentId','')::uuid;v_manager uuid:=nullif(p_input->>'managerMemberId','')::uuid;v_member text;
begin
  if p_intent in('create','update') and not exists(select 1 from organization_departments where id=v_department and organization_id=v_org and workspace_id=p_workspace_id and status='active') then raise exception'invalid department';end if;
  if v_manager is not null and not exists(select 1 from workspace_members where id=v_manager and organization_id=v_org and workspace_id=p_workspace_id and status='active') then raise exception'invalid team manager';end if;
  if p_intent='create' then insert into organization_teams(organization_id,workspace_id,department_id,name,manager_member_id,capacity) values(v_org,p_workspace_id,v_department,trim(p_input->>'name'),v_manager,greatest(1,coalesce((p_input->>'capacity')::integer,10))) returning id into v_id;
  elsif p_intent='update' then update organization_teams set department_id=v_department,name=trim(p_input->>'name'),manager_member_id=v_manager,capacity=greatest(1,coalesce((p_input->>'capacity')::integer,capacity)),updated_at=now(),version=version+1 where id=v_id and organization_id=v_org and workspace_id=p_workspace_id and status='active';
  elsif p_intent='archive' then update organization_teams set status='archived',updated_at=now(),version=version+1 where id=v_id and organization_id=v_org and workspace_id=p_workspace_id;
  else raise exception'invalid team intent';end if;
  if not found then raise exception'team not found';end if;
  if p_intent in('create','update') then delete from organization_team_members where team_id=v_id and organization_id=v_org and workspace_id=p_workspace_id;for v_member in select jsonb_array_elements_text(coalesce(p_input->'memberIds','[]')) loop insert into organization_team_members(organization_id,workspace_id,team_id,member_id) select v_org,p_workspace_id,v_id,wm.id from workspace_members wm where wm.id=v_member::uuid and wm.organization_id=v_org and wm.workspace_id=p_workspace_id and wm.status='active' on conflict do nothing;end loop;end if;
  insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,subject_id,metadata) values(v_org,p_workspace_id,auth.uid(),'organization.updated',v_id,jsonb_build_object('resource','team','intent',p_intent));return v_id;
end$$;

revoke all on function public.manage_organization_department(uuid,text,uuid,jsonb),public.manage_organization_team(uuid,text,uuid,jsonb) from public;
grant execute on function public.manage_organization_department(uuid,text,uuid,jsonb),public.manage_organization_team(uuid,text,uuid,jsonb) to authenticated;

create or replace function public.update_enterprise_organization(p_workspace_id uuid,p_input jsonb)returns void language plpgsql security definer set search_path=public as $$declare v_org uuid:=enterprise_org_context(p_workspace_id);begin update organizations set name=trim(p_input->>'name'),business_email=lower(p_input->>'businessEmail'),phone=nullif(trim(p_input->>'phone'),''),website=nullif(trim(p_input->>'website'),''),timezone=p_input->>'timezone',locale=p_input->>'locale',currency=upper(p_input->>'currency'),address=coalesce(p_input->'address','{}'),branding=coalesce(p_input->'branding','{}'),business_hours=coalesce(p_input->'businessHours',business_hours),regional_settings=coalesce(p_input->'regionalSettings',regional_settings),updated_at=now(),version=version+1 where id=v_org;insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,metadata)values(v_org,p_workspace_id,auth.uid(),'organization.updated',jsonb_build_object('profile_version','updated'));end$$;
