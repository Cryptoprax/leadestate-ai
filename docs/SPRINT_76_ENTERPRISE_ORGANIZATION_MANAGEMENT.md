# Sprint 76 — Enterprise Organization Management Platform

Sprint 76 completes the administrative organization foundation by extending the existing Sprint 51 organization service, repository, RBAC, audit, security, notification, and onboarding architecture.

## Delivered

- Organization profile controls for business identity, logo, brand colors, timezone, currency, locale, address, weekday business hours, date format, and week-start preferences.
- RLS-protected organization departments with default Sales, Marketing, Operations, Support, Finance, HR, Legal, and IT departments plus custom departments. Departments support managers, KPIs, permission metadata, and governed archiving.
- RLS-protected teams with departments, managers, members, capacity, workload indicators, and governed archiving.
- A searchable, filterable, memoized employee directory showing identity, role, department, status, last activity, effective permission count, teams, and AI assignment policy. Bulk selection is available for governed future operations.
- A visual permission matrix based on canonical RBAC role assignments across CRM, AI, analytics, billing, reports, settings, knowledge, documents, and administration.
- Existing organization audit, security, notification, invitation, ownership, and onboarding workflows remain integrated. The security center now makes password, IP-restriction, and organization-key policy states explicit.
- A unified enterprise settings home and navigation covering General, Organization, Users, Teams, Departments, Security, AI, Notifications, Billing, and Integrations.

## Security and architecture

Department and team mutations execute only through security-definer RPCs gated by the existing `enterprise_org_context` authorization function. Every read is organization- and workspace-scoped with RLS, and every mutation creates a sanitized organization audit event. No public or direct table writes were introduced.

No landing page, marketing, CRM, AI Workforce, analytics, billing, WhatsApp, or authentication-provider implementation was modified.

