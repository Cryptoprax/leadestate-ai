# Production Deployment Checklist

## Before deployment

- [ ] CI is green for the exact commit.
- [ ] Production environment values are complete and independently reviewed.
- [ ] No populated `.env` file or credential is committed.
- [ ] Supabase migration plan and backup/restore point are approved separately.
- [ ] Vercel, Supabase, GitHub, and Cloudflare administrators use MFA and least privilege.
- [ ] Production domain, TLS, Supabase Site URL, OAuth callbacks, and webhook URLs match exactly.
- [ ] Optional AI, Gmail, WhatsApp, Stripe, and beta flags remain disabled unless approved.
- [ ] CSP report-only destinations are reviewed.

## Deployment

- [ ] Deploy the tested commit to staging.
- [ ] Verify liveness, readiness, version, authentication, onboarding, billing boundaries, and core navigation.
- [ ] Promote the same commit to production.
- [ ] Confirm Cloudflare DNS resolution and Vercel certificate health.
- [ ] Confirm production build metadata matches the release record.

## After deployment

- [ ] Run production smoke tests without mutating customer data.
- [ ] Review errors, latency, function logs, and CSP reports.
- [ ] Verify no secret values appear in logs or client bundles.
- [ ] Record deployment owner, UTC time, commit, build ID, and rollback target.
- [ ] Keep rollback coverage active through the observation window.
