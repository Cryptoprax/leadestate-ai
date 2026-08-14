-- Sprint 43 — Google Identity & Workspace Platform
-- Additive only. Review and apply through the normal Supabase deployment process.

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null,
  avatar_url text,
  timezone text not null default 'UTC',
  language text not null default 'en',
  country char(2),
  phone text,
  job_title text,
  department text,
  notification_preferences jsonb not null default '{"email":true,"in_app":true,"security":true}'::jsonb,
  security_settings jsonb not null default '{"session_timeout_minutes":480,"login_alerts":true}'::jsonb,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1
);

alter table public.user_profiles enable row level security;
create policy "user_profiles_owner_read" on public.user_profiles for select to authenticated using (user_id = auth.uid());
create policy "user_profiles_owner_update" on public.user_profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table public.organizations add column if not exists business_type text;
alter table public.organizations add column if not exists company_size text;
alter table public.organizations add column if not exists phone text;
alter table public.organizations add column if not exists website text;
alter table public.organizations add column if not exists industry text;

create table if not exists public.identity_audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id),
  workspace_id uuid references public.workspaces(id),
  user_id uuid not null references auth.users(id),
  event_type text not null check (event_type in ('login','logout','workspace.created','organization.created','google.connected','profile.updated','invitation.created')),
  outcome text not null default 'success' check (outcome in ('success','failure')),
  correlation_id uuid not null default gen_random_uuid(),
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index if not exists identity_audit_user_time_idx on public.identity_audit_events(user_id, occurred_at desc);
create index if not exists identity_audit_workspace_time_idx on public.identity_audit_events(workspace_id, occurred_at desc) where workspace_id is not null;
alter table public.identity_audit_events enable row level security;
create policy "identity_audit_owner_or_member_read" on public.identity_audit_events for select to authenticated using (
  user_id = auth.uid() or (organization_id is not null and public.is_organization_member(organization_id))
);

create or replace function public.handle_new_user_profile() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.user_profiles(user_id, name, email, avatar_url)
  values(new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''), coalesce(new.email, ''), new.raw_user_meta_data->>'avatar_url')
  on conflict(user_id) do update set email = excluded.email, avatar_url = coalesce(excluded.avatar_url, user_profiles.avatar_url), updated_at = now();
  return new;
end
$$;
drop trigger if exists on_auth_user_profile on auth.users;
create trigger on_auth_user_profile after insert or update of email, raw_user_meta_data on auth.users for each row execute function public.handle_new_user_profile();

insert into public.user_profiles(user_id, name, email, avatar_url)
select id, coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', ''), coalesce(email, ''), raw_user_meta_data->>'avatar_url'
from auth.users on conflict(user_id) do nothing;

create or replace function public.record_identity_audit(
  p_event_type text,
  p_organization_id uuid default null,
  p_workspace_id uuid default null,
  p_outcome text default 'success',
  p_metadata jsonb default '{}'::jsonb
) returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare v_user uuid := auth.uid(); v_id uuid;
begin
  if v_user is null then raise exception 'authentication required'; end if;
  if p_event_type not in ('login','logout','workspace.created','organization.created','google.connected','profile.updated','invitation.created') then raise exception 'invalid audit event'; end if;
  if p_outcome not in ('success','failure') then raise exception 'invalid audit outcome'; end if;
  if p_organization_id is not null and not public.is_organization_member(p_organization_id) then raise exception 'invalid audit tenant'; end if;
  insert into public.identity_audit_events(organization_id, workspace_id, user_id, event_type, outcome, metadata)
  values(p_organization_id, p_workspace_id, v_user, p_event_type, p_outcome, coalesce(p_metadata, '{}'::jsonb)) returning id into v_id;
  if p_event_type='login' and p_outcome='success' then update public.user_profiles set last_login_at=now(),updated_at=now() where user_id=v_user; end if;
  return v_id;
end
$$;

create or replace function public.update_user_profile(p_input jsonb) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'authentication required'; end if;
  insert into public.user_profiles(user_id,name,email,avatar_url,timezone,language,country,phone,job_title,department,notification_preferences,security_settings)
  select v_user, trim(coalesce(p_input->>'name','')), coalesce(u.email,''), nullif(p_input->>'avatarUrl',''), coalesce(nullif(p_input->>'timezone',''),'UTC'), coalesce(nullif(p_input->>'language',''),'en'), nullif(upper(p_input->>'country'),''), nullif(trim(p_input->>'phone'),''), nullif(trim(p_input->>'jobTitle'),''), nullif(trim(p_input->>'department'),''), coalesce(p_input->'notificationPreferences','{}'::jsonb), coalesce(p_input->'securitySettings','{}'::jsonb) from auth.users u where u.id=v_user
  on conflict(user_id) do update set name=excluded.name,email=excluded.email,avatar_url=excluded.avatar_url,timezone=excluded.timezone,language=excluded.language,country=excluded.country,phone=excluded.phone,job_title=excluded.job_title,department=excluded.department,notification_preferences=excluded.notification_preferences,security_settings=excluded.security_settings,updated_at=now(),version=user_profiles.version+1;
  perform public.record_identity_audit('profile.updated', null, null, 'success', '{}'::jsonb);
end
$$;

create or replace function public.complete_sprint43_onboarding(p_input jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_user uuid:=auth.uid(); v_org uuid; v_workspace uuid; v_owner_role uuid; v_item jsonb; v_role uuid;
begin
  if v_user is null then raise exception 'authentication required'; end if;
  if exists(select 1 from public.organization_members where user_id=v_user and status='active') then raise exception 'user already belongs to an organization'; end if;
  select id into v_owner_role from public.roles where code='organization_owner';
  insert into public.organizations(name,country,currency,timezone,language,logo_path,business_type,company_size,phone,website,industry,created_by)
  values(trim(p_input->>'organizationName'),upper(p_input->>'country'),upper(p_input->>'currency'),p_input->>'timezone',p_input->>'language',nullif(p_input->>'logoPath',''),nullif(p_input->>'businessType',''),nullif(p_input->>'companySize',''),nullif(p_input->>'phone',''),nullif(p_input->>'website',''),nullif(p_input->>'industry',''),v_user) returning id into v_org;
  insert into public.organization_members(organization_id,user_id,role_id) values(v_org,v_user,v_owner_role);
  insert into public.workspaces(organization_id,name,office,branch,created_by) values(v_org,trim(p_input->>'workspaceName'),nullif(p_input->>'office',''),nullif(p_input->>'branch',''),v_user) returning id into v_workspace;
  insert into public.workspace_members(workspace_id,organization_id,user_id,role_id) values(v_workspace,v_org,v_user,v_owner_role);
  for v_item in select * from jsonb_array_elements(coalesce(p_input->'invitations','[]'::jsonb)) loop
    select id into v_role from public.roles where code=v_item->>'role' and code not in ('super_admin','organization_owner');
    if v_role is not null then
      insert into public.invitations(organization_id,workspace_id,email,name,role_id,invited_by)
      values(v_org,v_workspace,lower(v_item->>'email'),v_item->>'name',v_role,v_user) on conflict do nothing;
    end if;
  end loop;
  update public.user_profiles set timezone=p_input->>'timezone',language=p_input->>'language',country=upper(p_input->>'country'),phone=nullif(p_input->>'phone',''),updated_at=now(),version=version+1 where user_id=v_user;
  insert into public.identity_audit_events(organization_id,workspace_id,user_id,event_type,metadata) values(v_org,v_workspace,v_user,'organization.created',jsonb_build_object('source','onboarding'));
  insert into public.identity_audit_events(organization_id,workspace_id,user_id,event_type,metadata) values(v_org,v_workspace,v_user,'workspace.created',jsonb_build_object('source','onboarding'));
  return jsonb_build_object('organization_id',v_org,'workspace_id',v_workspace);
end
$$;

create or replace function public.create_team_invitation(p_workspace_id uuid,p_email text,p_name text,p_role text) returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_user uuid:=auth.uid(); v_org uuid; v_role_id uuid; v_id uuid; v_current_role text;
begin
  select organization_id into v_org from public.workspace_members where workspace_id=p_workspace_id and user_id=v_user and status='active';
  v_current_role:=public.current_workspace_role(p_workspace_id);
  if v_org is null or v_current_role not in ('organization_owner','organization_admin') then raise exception 'insufficient invitation permission'; end if;
  select id into v_role_id from public.roles where code=p_role and code in ('organization_admin','branch_manager','sales_manager','agent','viewer');
  if v_role_id is null then raise exception 'invalid invitation role'; end if;
  insert into public.invitations(organization_id,workspace_id,email,name,role_id,invited_by) values(v_org,p_workspace_id,lower(trim(p_email)),trim(p_name),v_role_id,v_user) returning id into v_id;
  insert into public.identity_audit_events(organization_id,workspace_id,user_id,event_type,metadata) values(v_org,p_workspace_id,v_user,'invitation.created',jsonb_build_object('invitation_id',v_id,'role',p_role));
  return v_id;
end
$$;

create or replace function public.set_organization_logo(p_organization_id uuid, p_logo_path text) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if public.is_organization_member(p_organization_id) is not true or not exists (
    select 1 from public.organization_members om join public.roles r on r.id=om.role_id
    where om.organization_id=p_organization_id and om.user_id=auth.uid() and om.status='active' and r.code in ('organization_owner','organization_admin')
  ) then raise exception 'insufficient logo permission'; end if;
  update public.organizations set logo_path=nullif(p_logo_path,''),updated_at=now() where id=p_organization_id;
end
$$;

revoke all on function public.record_identity_audit(text,uuid,uuid,text,jsonb), public.update_user_profile(jsonb), public.complete_sprint43_onboarding(jsonb), public.create_team_invitation(uuid,text,text,text), public.set_organization_logo(uuid,text) from public;
grant execute on function public.record_identity_audit(text,uuid,uuid,text,jsonb), public.update_user_profile(jsonb), public.complete_sprint43_onboarding(jsonb), public.create_team_invitation(uuid,text,text,text), public.set_organization_logo(uuid,text) to authenticated;
