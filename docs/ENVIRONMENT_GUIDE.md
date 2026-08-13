# Vayon Environment Guide

## Environments

Development uses local credentials and disconnected providers. Staging mirrors production configuration with isolated Supabase and provider test accounts. Production contains only production-scoped credentials and keeps optional features disabled until their launch approval.

Templates live in `.env.example` and `config/environments/`. Copy values into local `.env.local` or the Vercel environment UI; never commit populated files.

## Visibility rules

Only values intentionally safe for browser delivery may use `NEXT_PUBLIC_`. Supabase's public URL and anonymous key are browser configuration; service-role, database, storage, encryption, OAuth client secrets, webhook secrets, AI, email, and payment keys are server-only.

## Required runtime values

- `APP_ENV`: `development`, `staging`, or `production`.
- `NEXT_PUBLIC_APP_URL`: canonical HTTPS origin outside local development.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: environment-specific public Supabase configuration.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only and never exposed to client bundles.
- `APP_VERSION`, `BUILD_ID`, `GIT_COMMIT_SHA`, `BUILD_TIMESTAMP`: release identity. Vercel commit variables are used as fallbacks.
- `TRUSTED_ORIGINS`: comma-separated exact origins for future mutation-origin enforcement.

Provider and observability settings may remain empty. An empty provider key means disconnected, not unhealthy.

## Rotation

Rotate compromised secrets at the provider first, update Vercel, redeploy, revoke the old value, and verify readiness. Supabase service-role rotation requires auditing every server deployment. Never place secret values in logs, tickets, screenshots, build arguments, or `NEXT_PUBLIC_` variables.
