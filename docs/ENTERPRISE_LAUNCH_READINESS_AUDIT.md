# Enterprise Launch Readiness Audit

Sprint 69.5 composes the existing deployment, security-review, and performance services into one administrator-only audit. It does not maintain a parallel health, security, or performance implementation.

The weighted score is evidence based: pass receives full weight, warning 60%, not verified 25%, and fail 0%. A failed required control always produces `Blocked`; otherwise a score of 85 or greater is `Ready`, and lower scores are `Needs Attention`.

## Operating procedure

1. Apply all Supabase migrations in the launch environment.
2. Open `/platform/launch-readiness` as an organization owner or administrator.
3. Select **Run and record audit** to persist a tenant-scoped baseline.
4. Complete real-device accessibility and Chrome, Edge, Safari, and Firefox checks. Prepared compatibility reports are intentionally not treated as proof of execution.
5. Resolve required blockers, rerun the audit, and compare readiness history.
6. Export the JSON launch checklist and attach it to the release record.

The report stores check identifiers, statuses, debt identifiers, and severities. It never stores environment values, credentials, API keys, authorization headers, or raw provider errors.

## Launch checklist categories

- Infrastructure and deployment configuration
- Security, RBAC, RLS, tenant isolation, rate limiting, and dependencies
- Performance budgets and runtime measurements
- AI, CRM, knowledge, workflow, notifications, email, and providers
- Public website, marketing, analytics, and documentation
- Accessibility, SEO, and cross-browser verification

An exported report is a point-in-time assessment, not an unconditional certification. Any `not_verified` entry requires launch-environment evidence before release approval.
