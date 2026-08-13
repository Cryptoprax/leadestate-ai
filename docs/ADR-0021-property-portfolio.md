# ADR-0021: Establish Property Inventory Before Leads and Opportunities

## Status

Accepted for Release 1.8.3.

## Context

Leads and opportunities describe interest and commercial progression around identifiable inventory. Creating transactional records before stable property identities exist would duplicate property descriptions, weaken relationship integrity, and make future timeline causation and context assembly ambiguous.

## Decision

Create an immutable local Aurora property portfolio before creating leads or opportunities. Every property receives a stable identity and validated references to existing companies, organization units, offices, and sales personnel. Deal, lead, and timeline collections remain explicitly empty. Context support is identity registration only, and Executive Home projections remain awaiting-data placeholders.

## Consequences

- Future transactional records can reference stable property identities.
- Property/company and property/organization relationships are validated independently of CRM workflows.
- No historical activity, recency, sales performance, or intelligence needs to be fabricated.
- Future persistence must introduce tenant security, reconciliation, and migration boundaries explicitly.
- Existing CRM, Timeline, Context, authentication, schema, and RLS behavior remains unchanged.

