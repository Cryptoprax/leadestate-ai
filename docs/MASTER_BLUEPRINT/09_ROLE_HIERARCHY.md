# Role Hierarchy

## Model

Roles package permissions for common responsibilities. Hierarchy expresses
organizational responsibility, not automatic unrestricted access. Authorization
evaluates explicit permissions, tenant, resource scope, entitlements, and
policy; code must not infer access from a title alone.

## Platform roles

- **Founder:** Strategic visibility and explicitly approved high-level controls;
  not a permanent technical bypass.
- **CEO:** Business, customer, risk, and performance oversight.
- **CTO:** Technology governance, reliability, architecture, and delivery
  oversight.
- **Platform Admin:** Operates organizations, modules, configuration, and
  platform services within granted scope.
- **Developer:** Accesses developer tooling, diagnostics, test environments, and
  approved operational data.
- **Support:** Diagnoses customer issues through governed support and
  impersonation workflows.
- **Finance:** Manages catalogs, subscriptions, invoices, credits, and financial
  reporting.
- **Marketing:** Manages portfolio marketing content, campaigns, analytics, and
  publication.
- **Sales:** Manages platform sales operations and prospect context.
- **Customer Success:** Oversees onboarding, adoption, health, renewals, and
  approved customer interventions.

Platform roles are independently composable. Sensitive permissions can require
temporary elevation or approval regardless of role.

## Organization roles

- **Owner:** Accountable organization authority for subscription and governance.
- **Country Head:** Oversees authorized country nodes.
- **Regional Head:** Oversees authorized regions and subordinate branches.
- **Branch Manager:** Manages a branch, membership, assignments, and performance.
- **Manager:** Manages delegated functions, teams, workflows, and reporting.
- **Team Lead:** Coordinates an assigned team and its operational work.
- **Agent:** Performs authorized day-to-day tasks and manages assigned records.
- **Viewer:** Has read-only access to explicitly granted areas.
- **Guest:** Has narrow, time-bound access to shared resources or workflows.

## Scope inheritance

A role assignment includes an organization and optional hierarchy node. Scope
may include the assigned node and permitted descendants, but never ancestors,
siblings, or another organization by implication. Exceptions are explicit
grants.

## Custom roles

Organizations may create custom roles from a platform-approved permission
catalog. Reserved platform permissions are unavailable. Changes are versioned,
impact-previewed, auditable, and may require approval.

## Separation of duties

Policies can prevent conflicting capabilities, such as creating and approving
the same financial adjustment. Break-glass access is temporary, justified,
alerted, reviewed, and never granted through ordinary role editing.
