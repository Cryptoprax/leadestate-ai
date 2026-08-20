create table if not exists public.documentation_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('view','search','failed_search','feedback','bookmark')),
  article_slug text check (char_length(article_slug) <= 120),
  search_query text check (char_length(search_query) <= 120),
  helpful boolean,
  session_hash text,
  created_at timestamptz not null default now()
);
alter table public.documentation_events enable row level security;
revoke all on public.documentation_events from anon, authenticated;
create index if not exists documentation_events_created_at_idx on public.documentation_events(created_at desc);
create index if not exists documentation_events_article_idx on public.documentation_events(article_slug, created_at desc);
create or replace function public.record_documentation_event(p_event jsonb) returns void language plpgsql security definer set search_path=public as $$
declare v_type text:=p_event->>'type'; begin
  if v_type is null or v_type not in ('view','search','failed_search','feedback','bookmark') then raise exception 'Invalid documentation event'; end if;
  insert into public.documentation_events(event_type,article_slug,search_query,helpful,session_hash) values(v_type,left(nullif(p_event->>'articleSlug',''),120),left(nullif(p_event->>'query',''),120),case when p_event ? 'helpful' then (p_event->>'helpful')::boolean end,case when nullif(p_event->>'sessionId','') is null then null else encode(digest(p_event->>'sessionId','sha256'),'hex') end);
end $$;
revoke all on function public.record_documentation_event(jsonb) from public;
grant execute on function public.record_documentation_event(jsonb) to anon, authenticated;
