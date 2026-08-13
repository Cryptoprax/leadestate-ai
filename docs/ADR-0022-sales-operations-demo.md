# ADR-0022: Build Sales Operations as a Connected Immutable Demo Graph

## Status

Accepted for Release 1.8.4.

## Context

Aurora already has stable organization, company, contact, and property identities. Sales-operation examples must demonstrate realistic connected work without mutating production CRM behavior, inventing analytics, persisting records, or asserting historical Business Timeline events.

## Decision

Generate deterministic immutable leads, deals, tasks, meetings, document metadata, and calendar entries in a dedicated demo-workspace module. Validate every foreign identity in memory at construction. Expose local search and context-identity registries through existing provider-neutral contracts. Keep timeline collections empty and advisory examples rule-based, transparent, non-generated, and non-executable.

## Consequences

- The entire demo graph has no orphan records.
- Executive surfaces can display connected records without fabricated analytical claims.
- Production CRM workflows, Universal Objects, Context Engine, Timeline, Workforce, schema, and RLS remain unchanged.
- Future persistence and events require explicit reconciliation and governance rather than silently treating demo records as production history.

