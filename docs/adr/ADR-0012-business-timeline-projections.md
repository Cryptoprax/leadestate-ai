# ADR-0012: Business Timeline Projections

## Status

Accepted for Release 1.2.

## Context

The immutable Business Timeline Foundation needs customer-facing workspace, object, correlation, and journey views without coupling the experience to a database, broker, search index, CRM table, or fabricated demonstration events.

## Decision

Build disposable read-only projections over `CanonicalBusinessEvent[]`. Keep chronological ordering deterministic using occurrence time, partition sequence, and event ID. Resolve object history through canonical subject and related-object references. Derive correlation and journey views without altering canonical facts.

The route passes an empty canonical event collection until an authorized production ingestion and projection loader exists. Projection health shown in Release 1.2 is architecture metadata, not live telemetry.

## Projection boundaries

- Workspace scope is constrained by organization and workspace.
- Department scope uses canonical team ownership.
- User scope uses canonical actor or user ownership.
- Category scope uses the canonical taxonomy category.
- Object scope compares canonical type and identity across subject and related links.
- Correlation scope uses correlation and causation identifiers.

Filters only reduce an already authorized collection. They never establish authorization. A future server loader must apply tenant, visibility, classification, and retention rules before serialization to client components.

## Consequences

The experience is useful and testable without choosing production persistence or streaming infrastructure. Projection views can be rebuilt, and future providers remain replaceable. The local implementation is not a production ingestion pipeline, search index, telemetry system, or authorization boundary.

## Alternatives rejected

- Querying CRM tables directly would bypass the Business Timeline contract.
- Copying Universal Object payloads into projections would create stale duplicate state.
- Generating sample business events would violate provenance and release constraints.
- Introducing a graph or indexing library would prematurely select infrastructure.
- Mutating canonical events to store journey state would violate immutability.

## Future decisions

Durable projection stores, checkpoint ownership, server authorization, indexed search, streaming transport, redaction, retention, and operational SLOs require later ADRs. Those decisions can use the existing interfaces without changing the canonical event envelope.
