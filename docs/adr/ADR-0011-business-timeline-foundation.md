# ADR-0011: Business Timeline Foundation

## Status

Accepted for Release 1.1 as a local architecture foundation.

## Context

Vayon OS needs a canonical business-event backbone that can support every module without coupling domain history to transactional tables, UI activity feeds, analytics stores, provider payloads, or AI context formats.

## Decision

Define one immutable canonical envelope and versioned event taxonomy. Store accepted events append-only. Link events to Universal Business Objects by identity and semantic role. Build disposable query projections rather than changing canonical facts. Implement only local in-memory architecture in Release 1.1.

## Why append-only and immutable

Business history must retain what was known and recorded at a point in time. Mutation would destroy causality, approvals, financial history, explainability, and audit reconciliation. Corrections and reversals therefore append a new event linked to the original.

Append-only storage also makes idempotency, replay, projection rebuilding, lineage, and future streaming tractable. Mutable operational delivery state belongs outside canonical events.

## Why projections

Workspace feeds, object timelines, recent activity, search, analytics, Workforce context, and audit views have different ordering, filtering, authorization, and performance requirements. Dedicated projections allow those views to evolve or rebuild without changing canonical events or forcing the append store to serve every query pattern.

## Why Universal Object references

Canonical object references allow one event to concern contacts, companies, properties, leads, deals, tasks, documents, calendar entries, and future industry objects without copying their payloads. Semantic roles preserve relationship meaning while module authorization remains authoritative.

## Trade-offs

- Append-only correction is more complex than row updates.
- Event schemas require strong governance and compatibility discipline.
- Projections introduce eventual consistency in future durable deployments.
- The local store proves contracts but is not production persistence.

## Consequences

Future domain adoption must emit trusted, schema-validated event proposals through a server boundary. Consumers use projections, search, or subscription ports rather than reaching into storage. Release 1.1 changes no database, schema, RLS, migration, CRM behavior, existing event bus, AI platform, Workforce, Growth, or Communication behavior.

