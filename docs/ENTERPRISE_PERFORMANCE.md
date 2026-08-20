# Enterprise performance operations

Sprint 65 preserves the existing repository, service, provider, RBAC, RLS, audit, and approval boundaries. Server Components remain the default code-splitting unit; the performance route streams through Suspense and exposes no fabricated browser measurements. Images and fonts continue through the existing Next.js optimization pipeline.

The memory cache is bounded by configurable TTL and mandatory organization/workspace keys. Tag invalidation is available for write paths. Edge caches and Redis are extension interfaces only. Never cache secrets, authorization decisions, mutable approval state, or cross-workspace data.

The database snapshot uses one tenant-scoped RPC to avoid N+1 monitoring queries. Indexes target queue claims, approvals, unread/preferences, AI latency, workflow duration, and knowledge listings. Review `EXPLAIN (ANALYZE, BUFFERS)` in staging before production promotion and retain cursor/limit pagination for large datasets.

Budgets default to API 500 ms, bundle 350 KB, LCP 2.5 s, TTI 3.5 s, and workflow execution 5 s. Browser and bundle measurements are shown as unavailable until CI or real-user monitoring supplies them.
