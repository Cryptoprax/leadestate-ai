# Permission System

## Authorization philosophy

AtlasOS uses default-deny, capability-based RBAC augmented by resource scope and
policy conditions. Roles simplify assignment; permissions remain the
authoritative language of access.

## Permission vocabulary

Permission keys use stable namespaces, for example `crm.lead.read`,
`organization.member.manage`, or `platform.feature-flag.publish`. A definition
includes description, owning module, risk level, allowed scopes, delegability,
audit requirements, and compatibility status.

## Decision inputs

An authorization decision considers:

- authenticated principal or service identity
- product and active organization
- membership status and role assignments
- requested permission
- resource ownership and hierarchy scope
- module installation and commercial entitlement
- feature flags and policy conditions
- temporary elevation, approval, or security restrictions

Authentication, entitlement, and authorization are distinct. Purchasing a
module never grants a user permission to operate it.

## Resource scopes

Standard scopes include own, assigned, team, hierarchy node, descendants,
organization, and platform. Modules may define narrower scopes through reviewed
contracts. Scope evaluation occurs in trusted services and data access paths.

## Permission Builder

The Permission Builder manages custom roles, assignment rules, scope, and
approval policy using the platform permission catalog. It provides effective-
access preview, conflict detection, change comparison, impact analysis,
versioning, approval, rollback, and audit linkage.

## Enforcement

- User interfaces may hide or disable unavailable actions for clarity.
- Trusted service boundaries always enforce permissions.
- Data queries enforce tenant and resource scope.
- Background jobs and AI tools authorize their service identity and delegated
  context.
- Events cannot be used to bypass the originating authorization model.

## Caching

Permission decisions may be cached only with principal, tenant, policy version,
role version, and relevant resource scope. Revocation must invalidate or outlive
cached grants within a documented maximum.

## Testing and review

Every protected capability requires allow, deny, cross-tenant, out-of-scope,
revoked-membership, and stale-cache tests. High-risk permissions undergo
periodic certification and anomalous-use monitoring.
