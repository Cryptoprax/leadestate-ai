# Tenancy Model

## Core model

LeadEstate OS is designed for one logical database serving many organizations.
An organization is the primary tenant boundary. Users may eventually belong to
one or more organizations, but every tenant-scoped request must execute with one
explicit organization context.

## Isolation principles

- Tenant-owned records carry an immutable organization identifier.
- Queries and mutations are scoped to the active organization by default.
- Client-provided tenant identifiers are never trusted without server-side
  authorization.
- Cross-tenant access is denied unless an explicit platform capability permits
  it.
- Background work, search indexes, files, caches, logs, analytics, and AI
  context follow the same isolation model as primary data.
- Tenant-boundary tests are required for every data-access path.

## Roles

### Super Admin

A platform operator with explicitly granted cross-organization capabilities.
Super Admin access is exceptional, strongly audited, and unavailable through
ordinary tenant roles.

### Organization Admin

Manages organization settings, membership, role assignments, and enabled
capabilities within one organization.

### Manager

Coordinates teams, assignments, operational reporting, and approved workflows
within delegated scope.

### Agent

Performs day-to-day work on authorized leads, conversations, properties, and
activities.

## Tenant context lifecycle

Future request handling must establish authenticated identity, resolve active
organization membership, calculate effective permissions, and then perform
tenant-scoped work. Tenant context must be propagated explicitly to services and
auditing; it must not rely on mutable global state.

## Super Admin safeguards

Cross-tenant tooling requires least-privilege permissions, step-up verification
for sensitive actions, clear operator context, reason capture where appropriate,
and immutable audit events. Impersonation must be time-bound, visible, and
revocable.
