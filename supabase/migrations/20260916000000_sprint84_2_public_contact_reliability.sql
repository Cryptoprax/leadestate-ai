-- Sprint 84.2 forward-fix: ensure public contact and telemetry persistence exists in every environment.
create extension if not exists pgcrypto;

create table if not exists public.marketing_leads(
  id uuid primary key default gen_random_uuid(),
  kind text not null check(kind in('demo','trial','sales','newsletter')),
  name text,
  email text not null,
  company text,
  message text,
  plan text,
  source text not null default 'public_website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create table if not exists public.marketing_events(
  id bigint generated always as identity primary key,
  event_type text not null,
  path text not null,
  session_hash text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists marketing_leads_pipeline_idx on public.marketing_leads(kind,status,created_at desc);
create index if not exists marketing_events_analytics_idx on public.marketing_events(event_type,created_at desc);
alter table public.marketing_leads enable row level security;
alter table public.marketing_events enable row level security;

create or replace function public.capture_public_marketing_lead(p_input jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid; v_kind text:=p_input->>'kind'; v_email text:=lower(trim(p_input->>'email'));
begin
  if v_kind not in('demo','trial','sales','newsletter') or v_email!~'^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' or length(v_email)>254 or length(coalesce(p_input->>'message',''))>2000 then raise exception 'invalid lead'; end if;
  insert into public.marketing_leads(kind,name,email,company,message,plan)
  values(v_kind,left(nullif(trim(p_input->>'name'),''),100),v_email,left(nullif(trim(p_input->>'company'),''),160),left(nullif(trim(p_input->>'message'),''),2000),left(nullif(trim(p_input->>'plan'),''),30)) returning id into v_id;
  return v_id;
end$$;

create or replace function public.record_public_marketing_event(p_event jsonb)
returns void language plpgsql security definer set search_path=public as $$
begin
  if p_event->>'type' not in('page_view','cta_click','demo_request','trial_signup','contact_sales','newsletter','demo_launch','roi_calculation','industry_view','comparison_view','marketing_conversion','web_vital','tracking_failure') or length(p_event->>'path')>300 or (p_event->>'sessionId')!~'^[0-9a-f-]{36}$' then raise exception 'invalid event'; end if;
  insert into public.marketing_events(event_type,path,session_hash,metadata)
  values(p_event->>'type',p_event->>'path',encode(digest(p_event->>'sessionId','sha256'),'hex'),coalesce(p_event->'metadata','{}')-'email'-'name'-'phone'-'token'-'authorization');
end$$;

revoke all on public.marketing_leads,public.marketing_events from anon,authenticated;
revoke all on function public.capture_public_marketing_lead(jsonb),public.record_public_marketing_event(jsonb) from public;
grant execute on function public.capture_public_marketing_lead(jsonb),public.record_public_marketing_event(jsonb) to anon,authenticated;
