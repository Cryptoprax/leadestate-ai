# ADR-0019: Separate Immutable Organization Model

## Status

Accepted for Release 1.8.1.

## Context

Internal employees and reporting relationships describe how a company operates. CRM records describe external commercial relationships and work. Treating employees as contacts or embedding reporting structure in leads and deals creates ambiguous ownership, lifecycle, permissions, and data-retention behavior.

## Decision

Aurora organization data is separated from CRM records. Fictional employee profiles belong to the versioned demo-workspace product asset and do not become authentication identities, team memberships, contacts, companies, leads, or activity actors.

Reporting relationships use immutable employee identifiers. Organization-chart views derive manager, direct-report, department, office, and business-unit projections without rewriting source records. The model validates missing managers and cycles at construction.

## Consequences

- The demo organization can evolve without contaminating CRM behavior or customer data.
- Reporting projections are deterministic and reusable.
- Future persisted employee directories can adopt separate tenancy, identity-linking, effective-date, privacy, and authorization policies.
- Recent joiners, birthdays, announcements, and analytics remain empty until a governed source exists.
- No schema, RLS, authentication, or business workflow changes are required.
