# Vayon Production Deployment Guide

## Topology

Vercel runs the Next.js application. Supabase provides PostgreSQL, Auth, and Storage. Cloudflare is authoritative DNS only for the initial release; proxying should remain disabled until Vercel domain verification and webhook behavior are proven. GitHub is the source and CI control plane.

No provider is connected by this release. Sentry, OpenTelemetry, email, AI, payments, and messaging variables are placeholders until separately approved.

## Initial deployment

1. Protect `main` in GitHub and require the `Vayon CI / validate` check.
2. Import the repository into Vercel and select the Next.js framework preset.
3. Create distinct Vercel projects or deployment environments for staging and production. Never promote staging secrets into production automatically.
4. Populate environment variables from `.env.example` using the Environment Guide. Scope secrets to the minimum environment.
5. Link the production Supabase project. Apply reviewed migrations manually through the approved database deployment workflow; application deployment does not run migrations.
6. Add the production domain to Vercel. Run `vercel domains inspect` and copy its project-specific CNAME/A values exactly into Cloudflare; do not rely on a generic target. Disable proxying initially and remove conflicting records.
7. Configure Supabase Site URL and redirect allow-list for the exact production and staging origins.
8. Deploy staging, run smoke tests and health checks, then promote the exact tested commit to production.

## Verification

- `GET /api/health/live` confirms the runtime process.
- `GET /api/health/ready` confirms required environment configuration and a read-only Supabase query.
- `GET /api/version` identifies the deployed version, build, and commit.
- Confirm authentication redirects, callback URLs, secure cookies, asset loading, and webhook signature failures in staging.
- Inspect CSP report-only violations before converting the policy to enforcement.

## Rollback

Use Vercel instant rollback to the last verified deployment. Database migrations are deliberately outside the web deployment and require their own forward-fix or approved rollback plan. Record the incident, affected build ID, commit SHA, and decision timeline.
