# Sprint 43 — Google Identity & Workspace Platform

## Architecture

Sprint 43 keeps Supabase Auth as VAYON's authentication and session authority. The browser receives only Supabase's secure session cookies. Server Components, Server Actions, route handlers, and the proxy validate the user through `auth.getUser()` rather than trusting cookie contents. Existing CRM, dashboard, workforce, workflow, communication, calendar, analytics, property, deal, integration, demo, and marketing boundaries are unchanged.

The implementation separates two Google relationships:

1. **VAYON login** uses the Supabase Google provider. Supabase owns Authorization Code exchange, PKCE verifier/state handling, refresh rotation, session persistence, and provider identity validation.
2. **Google Workspace products** use the existing VAYON Google provider abstraction. This flow has explicit state, PKCE, nonce, issuer, audience, expiry, verified-email, and scope validation. Credentials are encrypted before the reference is stored. Gmail and Calendar use incremental authorization and do not sync data from the settings surface.

## OAuth and session lifecycle

- `flowType: "pkce"` is explicit on the server client.
- Callback destinations accept only same-origin relative paths, preventing open redirects.
- The callback exchanges the one-time code, validates the resulting user with Supabase, records a sanitized login audit event, and checks tenant membership.
- Users without an active organization membership are sent to `/onboarding` from both the callback and proxy.
- Supabase automatically refreshes expiring sessions and rotates refresh tokens through its SSR cookie adapter.
- Cookies are HTTP-only, secure in production, and `SameSite=Lax`.
- Logout records the request before invalidating the Supabase session.
- Server Actions retain Next.js same-origin protections; OAuth state additionally protects provider callbacks.

## Tenant onboarding

`complete_sprint43_onboarding` creates the organization, owner organization membership, workspace, owner workspace membership, profile regional defaults, and organization/workspace audit events in one transaction. The UI captures organization and workspace names, country, currency, timezone, language, business type, company size, phone, website, industry, office, branch, and optional logo.

The logo is validated server-side and uploaded after the tenant transaction to the existing private organization/workspace storage path. If storage is unavailable, tenant creation remains successful and the logo can be retried from settings.

## Profile and settings

`user_profiles` stores production profile metadata separately from `auth.users`. The authentication identity remains authoritative for email and provider identity. Profile updates use a security-definer RPC restricted to `auth.uid()` and create an audit event.

Settings routes:

- `/vayon/settings/profile`
- `/vayon/settings/workspace`
- `/vayon/settings/organization`
- `/vayon/settings/google`
- `/vayon/settings/security`
- `/vayon/settings/notifications`
- `/vayon/settings/appearance`

## Team governance

Organization owners and administrators can create pending invitation records for Admin, Manager, Sales Manager, Agent, and Viewer roles. No email is sent. Accepted and declined states remain part of the existing invitation lifecycle for a future approved delivery and acceptance release.

## Audit coverage

The additive identity audit store covers login, logout, organization creation, workspace creation, Google connection, profile update, and invitation creation. Metadata excludes tokens, authorization codes, email contents, and secrets. Tenant events require active organization membership.

## Deployment checklist

1. Review and apply `20260814000000_sprint43_google_identity_workspace.sql` through the approved Supabase migration pipeline.
2. Enable Google in Supabase Auth and configure the approved Google client ID and secret in the Supabase dashboard.
3. Register the Supabase callback URL shown by the dashboard with Google Cloud.
4. Configure `NEXT_PUBLIC_APP_URL` to the exact HTTPS production origin.
5. Configure the separate Workspace OAuth client variables for `/integrations/google/callback` and a 32-byte `GOOGLE_TOKEN_ENCRYPTION_KEY`.
6. Enable only the approved workspace feature flags for Google Identity, Gmail, and Calendar.
7. Verify production cookie security, redirect origins, consent-screen publication, test users, and refresh-token rotation.
8. Perform login, first-login onboarding, logout, reconnect, token expiry, and revoked-consent acceptance tests in staging before production.

The migration is prepared only; it is not applied by this implementation.
