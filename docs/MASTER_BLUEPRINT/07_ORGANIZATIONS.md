# Organization Management

## Domain model

An organization is the primary customer and tenant boundary. It owns
memberships, configuration, entitlements, modules, business data, workflows,
audit scope, and hierarchy. Organization identifiers are immutable and are never
derived from editable names or domains.

## Hierarchy

AtlasOS supports a configurable hierarchy:

1. **Organization:** Contractual tenant and top-level security boundary.
2. **Country:** National operating unit with locale and policy context.
3. **Region:** Geographic or commercial grouping within a country.
4. **Branch:** Operational location or business unit.
5. **Department:** Functional area such as Sales, Support, or Finance.
6. **Team:** Working group for assignment, visibility, targets, and workflows.

Hierarchy nodes have stable IDs, display names, lifecycle states, managers,
metadata, and parent relationships. Configuration defines which levels are
enabled; the platform does not fabricate unused layers.

## Lifecycle

Organizations progress through prospect, provisioning, active, restricted,
suspended, offboarding, retention, and deleted states. State transitions are
permission-controlled, validated, auditable, and reversible where policy
permits. Deletion is asynchronous and follows contractual retention.

## Administration

Organization Owners and authorized Admins manage profile, domains, locale,
hierarchy, membership, role assignments, integrations, modules, branding,
notifications, policies, and data settings within platform constraints.

## Membership

A user may hold memberships in multiple organizations. Each membership has
status, roles, hierarchy scope, invitation provenance, effective dates, and
audit history. Switching organizations establishes a new explicit tenant
context; permissions do not bleed between memberships.

## Configuration inheritance

Configuration resolves from platform to product to organization and, where
approved, hierarchy node or user. More specific values may override only fields
marked overridable. Effective values retain provenance and version information.

## Operational requirements

Provisioning is idempotent and observable. Limits, quotas, residency, modules,
and baseline roles must be established before activation. Suspension blocks
appropriate product access without destroying data or impeding authorized
recovery and billing operations.
