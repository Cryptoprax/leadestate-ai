-- Sprint 62: resumable self-service onboarding. Existing platform services own execution.
create table if not exists public.onboarding_sessions(
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade unique,
  organization_id uuid references public.organizations(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete cascade,
  current_step integer not null default 1 check(current_step between 1 and 15),
  completed_steps integer[] not null default '{}', configuration jsonb not null default '{}',
  demo_mode boolean not null default false, started_at timestamptz not null default now(),
  completed_at timestamptz, updated_at timestamptz not null default now()
);
create table if not exists public.onboarding_step_events(
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade, workspace_id uuid references public.workspaces(id) on delete cascade,
  step integer not null check(step between 1 and 15), event_type text not null check(event_type in('started','completed','resumed','abandoned')),
  duration_ms integer, metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
create table if not exists public.onboarding_import_jobs(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade, created_by uuid not null references auth.users(id),
  import_kind text not null check(import_kind in('contacts','companies','leads','deals','properties')),
  file_path text not null, status text not null default 'preview' check(status in('preview','validated','approval_pending','queued','processing','completed','failed')),
  total_rows integer not null default 0, valid_rows integer not null default 0, duplicate_rows integer not null default 0,
  error_rows integer not null default 0, validation_report jsonb not null default '{}', demo_data boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.onboarding_tour_progress(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
  tour_key text not null, completed boolean not null default false, completed_at timestamptz, updated_at timestamptz not null default now(),
  unique(user_id,workspace_id,tour_key)
);
create table if not exists public.onboarding_connection_events(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check(provider in('gmail','google_calendar','whatsapp','openai','email','stripe')),
  success boolean not null, latency_ms integer, sanitized_error text, created_at timestamptz not null default now()
);
create table if not exists public.onboarding_demo_seed_requests(
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade, requested_by uuid not null references auth.users(id),
  status text not null default 'approval_pending' check(status in('approval_pending','approved','processing','completed','failed')),
  dataset_version text not null default 'aurora-v1', demo_data boolean not null default true,
  includes text[] not null default array['contacts','leads','deals','properties','activities','ai_recommendations','dashboards','workflows','executive_reports'],
  created_at timestamptz not null default now(), completed_at timestamptz
);
create index if not exists onboarding_events_dropoff_idx on public.onboarding_step_events(step,event_type,created_at);
create index if not exists onboarding_import_observability_idx on public.onboarding_import_jobs(organization_id,workspace_id,status,created_at desc);

alter table public.onboarding_sessions enable row level security;
alter table public.onboarding_step_events enable row level security;
alter table public.onboarding_import_jobs enable row level security;
alter table public.onboarding_tour_progress enable row level security;
alter table public.onboarding_connection_events enable row level security;
alter table public.onboarding_demo_seed_requests enable row level security;
create policy "onboarding owner session read" on public.onboarding_sessions for select to authenticated using(user_id=auth.uid());
create policy "onboarding owner events read" on public.onboarding_step_events for select to authenticated using(user_id=auth.uid());
create policy "onboarding tenant imports read" on public.onboarding_import_jobs for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "onboarding tenant tour read" on public.onboarding_tour_progress for select to authenticated using(user_id=auth.uid() and public.current_workspace_role(workspace_id) is not null);
create policy "onboarding tenant connections read" on public.onboarding_connection_events for select to authenticated using(public.current_workspace_role(workspace_id) is not null);
create policy "onboarding tenant demo read" on public.onboarding_demo_seed_requests for select to authenticated using(public.current_workspace_role(workspace_id) is not null);

create or replace function public.get_enterprise_onboarding_session() returns jsonb language plpgsql security definer set search_path=public as $$
declare result jsonb;begin if auth.uid() is null then raise exception 'authentication required';end if;
 insert into onboarding_sessions(user_id) values(auth.uid()) on conflict(user_id) do nothing;
 select to_jsonb(s) into result from onboarding_sessions s where user_id=auth.uid();return result;end$$;
create or replace function public.save_enterprise_onboarding_progress(p_step integer,p_configuration jsonb,p_completed_steps integer[],p_demo_mode boolean) returns void language plpgsql security definer set search_path=public as $$
declare previous_step integer; started timestamptz;begin if auth.uid() is null or p_step not between 1 and 15 then raise exception 'invalid onboarding progress';end if;
 select current_step,updated_at into previous_step,started from onboarding_sessions where user_id=auth.uid() for update;
 insert into onboarding_sessions(user_id,current_step,completed_steps,configuration,demo_mode) values(auth.uid(),p_step,coalesce(p_completed_steps,'{}'),coalesce(p_configuration,'{}'),p_demo_mode)
 on conflict(user_id) do update set current_step=excluded.current_step,completed_steps=excluded.completed_steps,configuration=excluded.configuration,demo_mode=excluded.demo_mode,updated_at=now();
 insert into onboarding_step_events(user_id,step,event_type,duration_ms,metadata) values(auth.uid(),coalesce(previous_step,p_step),'completed',greatest(0,(extract(epoch from(now()-coalesce(started,now())))*1000)::integer),jsonb_build_object('next_step',p_step));end$$;
create or replace function public.complete_enterprise_onboarding() returns void language plpgsql security definer set search_path=public as $$
declare s onboarding_sessions%rowtype;v_org uuid;v_workspace uuid;begin select*into s from onboarding_sessions where user_id=auth.uid() for update;if not found then raise exception 'onboarding session unavailable';end if;
 select wm.organization_id,wm.workspace_id into v_org,v_workspace from workspace_members wm where wm.user_id=auth.uid() and wm.status='active' order by wm.created_at limit 1;
 if v_org is null then raise exception 'organization must be created before launch';end if;
 update onboarding_sessions set organization_id=v_org,workspace_id=v_workspace,current_step=15,completed_steps=array[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],completed_at=now(),updated_at=now() where id=s.id;
 if s.demo_mode then insert into onboarding_demo_seed_requests(organization_id,workspace_id,requested_by) values(v_org,v_workspace,auth.uid()) on conflict do nothing;end if;
 insert into organization_audit_events(organization_id,workspace_id,actor_id,event_type,subject_id,metadata) values(v_org,v_workspace,auth.uid(),'onboarding.completed',s.id,jsonb_build_object('demo_mode',s.demo_mode));
 insert into onboarding_step_events(user_id,organization_id,workspace_id,step,event_type,duration_ms) values(auth.uid(),v_org,v_workspace,15,'completed',(extract(epoch from(now()-s.started_at))*1000)::integer);end$$;
revoke all on function public.get_enterprise_onboarding_session(),public.save_enterprise_onboarding_progress(integer,jsonb,integer[],boolean),public.complete_enterprise_onboarding() from public;
grant execute on function public.get_enterprise_onboarding_session(),public.save_enterprise_onboarding_progress(integer,jsonb,integer[],boolean),public.complete_enterprise_onboarding() to authenticated;
