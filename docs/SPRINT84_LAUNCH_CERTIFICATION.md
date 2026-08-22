# VAYON launch certification

## Certified workflow

Organization → Invite Users → Projects → Inventory → CRM → Property Matching → Site Visits → Communications → Creative Studio → Growth Studio → Subscriptions → Billing → Analytics → Reports.

Each production sign-off must attach tenant-scoped evidence. Static tests and source audits do not replace authenticated browser, real-device, provider, backup-restore, or production webhook verification.

## Administrator guide

Verify organization branding, users and RBAC, feature licenses, provider health, queues, background jobs, AI and storage usage, audit history, legal pages, support contacts, and the exported launch checklist.

## User guide

Complete onboarding, create a project, import inventory, connect CRM records, review matches, schedule visits, use governed communications, prepare campaign drafts, obtain approval, and review analytics.

## Creative and Growth Studio guide

Both studios are Beta, tenant gated, draft only, and approval governed. Provider failures must show recoverable diagnostics. Image generation, campaign packs, video projects, Brand Guardian, and AI Marketing Brain never publish automatically.

## Billing and organization guide

Organization owners and billing roles manage seats, subscriptions, payment methods, invoices, trials, usage limits, feature licenses, cancellations, and renewals. Stripe and Razorpay webhook signatures are mandatory.

## Developer and architecture notes

Preserve Repository → Service → Provider boundaries, workspace attribution, RLS, RBAC, idempotency, sanitized observability, background retries, and provider-neutral contracts. Never place secrets or raw provider payloads in client UI or logs.

## Runtime verification still required

- Chrome, Edge, Safari, Firefox and real mobile/tablet devices
- Keyboard, focus trap, screen reader and contrast verification
- Database and storage backup restoration
- Live provider credentials, rate limits, retry queues and webhook delivery
- Production monitoring, domains, SSL, email, legal pages, privacy, terms, cookies and support destinations
