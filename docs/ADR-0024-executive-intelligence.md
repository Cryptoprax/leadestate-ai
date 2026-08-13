# ADR-0024: Project Executive Intelligence From Existing Aurora Records

## Status

Accepted for Release 1.8.6.

## Context

Aurora contains a complete connected demo graph and canonical history. Executive and advisory surfaces need useful information without creating new business records, fabricating KPIs, invoking providers, or coupling demo data into protected platform engines.

## Decision

Introduce an Aurora-only deterministic projection service. Reuse existing Executive Home models, Structured Narrative Engine, Unified Context Assembler, Brain context contracts, Workforce presentation boundaries, and canonical Timeline records. Require rule names, source IDs, and explicit evidence categories for every insight. Keep all execution unavailable.

## Consequences

- Executive information is reproducible and traceable.
- Readiness scores cannot be confused with revenue or conversion performance.
- Brain, Cognitive, Workforce, Context, Timeline, schema, RLS, and CRM logic remain unchanged.
- Persisted customer organizations continue to receive their prior awaiting-data behavior.
- Future providers can consume the same evidence boundary after separate governance approval.

