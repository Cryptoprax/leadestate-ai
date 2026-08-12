# Multi-Tenancy

## Tenancy model

AtlasOS uses one logical platform serving many organizations. An organization is
the primary tenant security boundary. Shared infrastructure is acceptable only
when every storage and execution path enforces strict logical isolation.

## Tenant context

Trusted request handling resolves a tenant context containing product,
organization, membership, hierarchy scope, entitlements, permission snapshot,
region, locale, configuration version, and correlation identifiers. Context is
passed explicitly; mutable global tenant state is prohibited.

## Isolation requirements

- Every tenant-owned record includes an immutable organization identifier.
- All reads and writes apply tenant scope before business filters.
- Unique constraints include tenant identity where uniqueness is tenant-local.
- Cache, search, object storage, jobs, webhooks, metrics, exports, and AI memory
  preserve tenant boundaries.
- Client-provided organization IDs are treated as input, never authority.
- Cross-tenant joins and exports require explicit platform authorization.

## Shared and global data

Global metadata—countries, platform module definitions, permission catalog, and
public plans—is clearly classified and read-only to tenants unless a governed
override model exists. Tenant configuration references global definitions
without changing them.

## Data residency

Organization provisioning records an approved residency region. Data stores,
files, backups, analytics, logs, AI processing, and subprocessors follow the
applicable residency policy. Movement between regions uses a reviewed migration.

## Operations

Background jobs carry tenant and actor context in immutable envelopes. Support
diagnostics use governed tenant selection and cannot broaden access silently.
Impersonation is visibly marked, time-limited, and audited.

## Verification

Automated tests cover cross-tenant identifiers, enumeration, cached data,
search, bulk operations, exports, asynchronous jobs, files, AI retrieval, and
administrative tools. Production monitoring detects anomalous cross-tenant
patterns without exposing customer content.
