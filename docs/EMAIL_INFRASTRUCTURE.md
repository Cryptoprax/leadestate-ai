# Enterprise Email Infrastructure

Sprint 60 adds one transactional email boundary alongside the existing Gmail mailbox. Business services publish typed email intents to `EmailService`; they never select or call a delivery vendor.

## Runtime

Set `EMAIL_PROVIDER` to exactly one of `resend`, `sendgrid`, `postmark`, or `smtp`, then configure only that provider's server-side credential. Configure `EMAIL_FROM_ADDRESS`, `EMAIL_PAYLOAD_ENCRYPTION_KEY` (at least 32 characters), and `EMAIL_PROCESSOR_SECRET`. Authenticated SMTP requires implicit TLS (`SMTP_SECURE=true`); insecure credential transmission is rejected.

Invoke `POST /api/email/process` from a trusted scheduler with `Authorization: Bearer <EMAIL_PROCESSOR_SECRET>`. The processor claims jobs atomically, renders the workspace template or built-in localized default, applies organization branding, sends through the active provider, and records its sanitized outcome. Failed jobs use exponential retry up to the persisted maximum.

## Security and governance

- Recipients, messages, templates, attempts, and metrics are organization/workspace scoped with RLS.
- Dynamic variables and secure identity links are encrypted with AES-256-GCM before persistence.
- Provider credentials remain environment-only and are never returned to the browser or stored in delivery history.
- Template edits and manual retries require email-management RBAC and create organization audit events.
- Every queued, delivered, or failed email creates an activity timeline event.
- Terminal failures create a sanitized in-app notification through Sprint 59.
- Open and click tracking are architecture-ready and do not fabricate engagement data.

Supabase Auth remains the authority for verification, recovery, and invitation links. Organization invitations now use Supabase-generated links and this shared transactional queue. Verified Stripe events publish billing email intents only after authoritative billing persistence succeeds.
