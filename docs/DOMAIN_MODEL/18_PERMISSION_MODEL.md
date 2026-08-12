# Permission Model

Permissions use stable capability keys, e.g. `lead.read`, `deal.manage`, `ai.approve`. Roles are configurable bundles; assignments are scoped to organization/workspace/branch/team and effective dates.

Identity → Employee → Membership → RoleAssignment → Role → Permission. Authorization evaluates tenant, subject scope, resource ownership, explicit constraints, and policy; UI visibility is not enforcement. Default deny, least privilege, separation of duties, delegated administration, break-glass evidence, and periodic access review are mandatory.
