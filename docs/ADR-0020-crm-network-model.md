# ADR-0020: Establish Companies and Contacts Before Transactional CRM Objects

## Status

Accepted for Release 1.8.2.

## Context

Leads, opportunities, deals, properties, tasks, communications, and activities are transactional objects. Creating them before stable external-party identity and relationship boundaries exist would force duplicated names, weak ownership, and later identity reconciliation. The Aurora demo workspace also requires a believable network without fabricated business performance or historical activity.

## Decision

Model fictional companies and contacts first as immutable, local, related reference objects. Contacts must resolve to one valid company, and each company must resolve to one primary contact. Stable identities are timeline-ready, but event collections remain empty. Search uses the existing provider-neutral Universal Bar boundary and is activated only for the Aurora demo identity. No persistence adapter is introduced.

## Consequences

- Future transactional CRM objects can reference stable external identities.
- Relationship summaries and filtering do not depend on leads or deals.
- No business metrics, dates, events, or transactional records need to be fabricated.
- The network is safe to remove or replace with governed tenant persistence in a future release.
- Database schema, RLS, authentication, existing CRM workflows, and Business Timeline behavior remain unchanged.

