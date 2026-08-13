# Release 2.1 — Google Identity & Workspace Integration

## Architecture

Vayon exposes two additive Google identity paths. Application sign-in continues through Supabase Auth and requests only `openid email profile`. Workspace connection uses a server-side authorization-code flow and stores the connection against the authenticated organization and workspace. Existing password authentication is unchanged.

Provider-neutral contracts live under `features/platform/integrations/identity`. Google is active; Microsoft, Apple, Slack, Meta, Stripe, Dropbox, Box, and Zoom are inactive extension targets.

## Authorization flow

An organization owner starts the connection from `/vayon/settings/integrations/google`. The server checks the workspace flag, creates random state, nonce, and PKCE values, and stores them in short-lived HttpOnly SameSite cookies. Google receives a fixed redirect URI and identity-only scopes. The callback consumes the one-time cookies, exchanges the code with PKCE, and validates issuer, audience, expiry, nonce, subject, verified email, and granted scopes. Access and refresh credentials are encrypted independently with AES-256-GCM before storage; the browser never receives them.

## Security and lifecycle

- State protects against CSRF, PKCE binds the code to its initiating browser, nonce binds the ID token to the request, and consume-before-processing prevents replay.
- Production redirects require HTTPS and the configured application origin. User input cannot select a redirect target.
- Refresh is server-side and uses optimistic versioning. Reconnect requests fresh consent and rotates credentials.
- Disconnect revokes authorization with Google before tenant-scoped soft deletion.
- Logs contain lifecycle names, workspace IDs, status codes, and scope counts only—never secrets or tokens.
- Keep `GOOGLE_TOKEN_ENCRYPTION_KEY` in a server secret store and rotate it through a controlled decrypt/re-encrypt procedure.

## Scope strategy

Release 2.1 grants only `openid`, `email`, and `profile`. Gmail, Calendar, Drive, Meet, Contacts, and Tasks are future capabilities that require incremental consent. This release does not call those product APIs.

## Configuration

Required server variables are `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_OAUTH_REDIRECT_URI`, and `GOOGLE_TOKEN_ENCRYPTION_KEY`. `FEATURE_GOOGLE_IDENTITY=true` enables workspace connection independently. Supabase Google provider settings control the separate sign-in path.

## Storage limitations

No schema or migration was changed. The existing RPC exposes email, encrypted credentials, scopes, expiry, and version. Display name, photo, connection timestamps, and last-validation timestamp therefore render as unavailable rather than fabricated.

## Operations

Monitor `google.identity.connected`, `google.identity.refreshed`, `google.identity.disconnected`, and failure variants. On suspected compromise, disable the feature, revoke the OAuth client, rotate encrypted credentials through the controlled process, and require reconnect.
