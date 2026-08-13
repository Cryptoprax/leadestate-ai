# ADR-0025: Google identity and workspace connection

## Status

Accepted for Release 2.1.

## Decision

Use additive Supabase Google sign-in for application authentication and a separate provider-neutral, server-side OAuth connection for workspace authorization. The workspace flow uses authorization code, PKCE, state, nonce, offline access, encrypted server storage, tenant-bound access, and identity-only scopes.

## Consequences

Password authentication remains backward compatible and provider credentials never enter browser storage. Future Google products require incremental consent. Existing storage cannot retain profile presentation fields or validation timestamps, so the UI reports them as unavailable. No schema changes are introduced.
