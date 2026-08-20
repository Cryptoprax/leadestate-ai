# VAYON production deployment verification

Promote the same immutable build from development to staging and then production. Set `APP_ENV`, build metadata, Supabase, OpenAI, Stripe, and the selected email-provider variables through the deployment secret manager. Never commit values.

Before promotion, run TypeScript, ESLint, tests, and the production build; apply Supabase migrations through the controlled migration job; then verify Authentication, Organizations, CRM, Workflow Engine, AI Workforce, Notifications, Email, Stripe, and Knowledge Platform in `/platform/deployment`.

The dashboard reports application/provider latency and migration state. Sentry and PostHog are optional provider-neutral extension points. Database, storage, and configuration backup plus restore verification are prepared interfaces only: operators must use their managed backup system and record evidence before promotion.
