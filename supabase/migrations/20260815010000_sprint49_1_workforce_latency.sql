alter table if exists public.ai_workforce_messages add column if not exists latency_ms integer check(latency_ms>=0);
