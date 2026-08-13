# Permissions and RBAC

## Philosophy

Vayon OS uses role-based access control (RBAC) with explicit, fine-grained
permissions. Roles are named collections of permissions; application code
authorizes capabilities rather than checking role names directly.

## Principles

- **Default deny:** Absence of a grant means access is denied.
- **Least privilege:** Users receive only the capabilities needed for their
  responsibilities.
- **Tenant aware:** Organization permissions cannot grant cross-tenant access.
- **Server enforced:** UI visibility improves usability but is never the
  security boundary.
- **Explicit scope:** Permissions describe both an action and its scope, such as
  own, assigned, team, organization, or platform.
- **Auditable changes:** Grants, revocations, role edits, and sensitive access
  decisions generate audit events.
- **Stable vocabulary:** Permission keys are versioned contracts, not display
  labels.

## Permission model

A future permission may follow a namespaced form such as
`crm.lead.read` or `organization.member.manage`. The authorization decision
combines identity, active organization, membership status, permission grants,
resource scope, feature availability, and relevant platform policy.

## Roles

Default roles may include Organization Admin, Manager, and Agent. Organizations
may eventually compose custom roles from approved permissions. Super Admin is a
separate platform role and must not be assignable from tenant administration.

## Implementation boundaries

`platform/permissions/` owns shared authorization contracts and evaluation
policy. `features/permissions/` owns permission-management product experiences
and their service boundary. Individual features define their permission
vocabulary without implementing isolated authorization systems.

## Review and testing

Every protected operation requires positive, negative, cross-tenant, and stale-
membership test coverage. Sensitive permission changes should support review,
alerting, and periodic access certification.
