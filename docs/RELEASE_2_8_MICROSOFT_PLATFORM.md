# Release 2.8 — Microsoft 365 Integration Platform

## Executive summary

Microsoft 365 is Vayon's second enterprise workspace provider. Release 2.8 activates tenant-aware Microsoft Entra ID connection and creates provider-neutral Microsoft Graph infrastructure. Outlook Mail, Outlook Calendar, OneDrive, Microsoft People, and Teams are contract-only: no business operation is implemented or executed.

## Identity architecture

The connection uses OAuth 2.0 Authorization Code Flow with PKCE S256, cryptographically random state and nonce, a ten-minute replay window, constant-time state comparison, offline refresh, incremental scope contracts, and tenant-aware ID-token validation. ID-token verification requires RS256, matches the Microsoft `kid` against Microsoft JWKS, verifies the signature, audience, expiration, nonce, tenant-specific issuer, subject, and tenant ID. The Graph `/me` endpoint validates the resulting identity connection.

The initial permission set is `openid profile email offline_access User.Read`. Product permissions are not requested. Refresh rotation increments the credential version. Logs contain workspace ID, tenant ID, provider, scope count, version, and HTTP status only—never tokens, profile payloads, or secrets.

## Credential storage boundary

The approved schema has no Microsoft credential table and this release prohibits schema changes. Credentials therefore use a workspace-bound AES-256-GCM encrypted HttpOnly vault adapter, split across bounded secure cookies, with authenticated workspace ID as additional authenticated data. Production uses `Secure`, `SameSite=Lax`, and a 30-day lifetime.

This is an explicit Release 2.8 limitation, not the future centralized storage model. A later schema-authorized release should implement the existing `MicrosoftCredentialVault` port with server-side encrypted durable storage, RLS, optimistic token versioning, and auditable revocation. Google tables are not reused.

## Provider registry and Graph gateway

The Microsoft registry identifies Entra ID as active and Outlook Mail, Outlook Calendar, OneDrive, Microsoft People, and Teams as contract-only. The provider-neutral Graph gateway owns authorization headers, JSON transport, and capability-tagged request contracts. No product adapter invokes it in this release.

## Integration Center

Microsoft Entra ID exposes feature state, connection state, health, granted and missing scopes, validation time, token expiration, and settings navigation. Future Microsoft providers remain unavailable while displaying their shared workspace feature boundary.

## Workflow readiness

Four provider nodes are registered: Send Outlook Email, Schedule Outlook Meeting, Upload to OneDrive, and Send Teams Message. Each is `contract-only` and `executable: false`. They do not enter the execution runtime.

## Security and isolation

- Organization-owner/platform-admin authorization is inherited from Integration Context.
- OAuth transient cookies are HttpOnly, scoped to the callback path, and deleted before exchange.
- Credential encryption uses AES-256-GCM with unique 96-bit IVs and workspace-bound AAD.
- Redirect origins are checked against `NEXT_PUBLIC_APP_URL`; HTTPS is mandatory in production.
- No Graph tokens or secrets are logged.
- Disconnect deletes the Vayon vault. Tenant administrators can additionally revoke consent in Entra ID.

## Known limitations

No Outlook, Calendar, OneDrive, People, or Teams operations exist. Organization display name requires future incremental directory consent. Central cross-device credential persistence, remote Microsoft revocation, lifecycle subscriptions, webhooks, sync, admin consent workflows, sovereign clouds, and multi-tenant connection switching are deferred.
