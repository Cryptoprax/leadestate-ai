# ADR-0015: Unified Context Engine

## Status

Accepted for Release 1.5.

## Context

Vayon modules expose related information through separate contracts and user experiences. Object workspaces need a consistent read-only context surface without allowing UI components to query CRM repositories, bypass authorization, call AI, or create a second system of record.

## Decision

Create an isolated Unified Context Engine that assembles an explicitly supplied, already-authorized `ContextAssemblySnapshot`. Use existing Universal Object, Universal Relationship, Timeline Object Reference, and Canonical Business Event contracts directly. Represent other source contributions as minimal source-tagged context references.

Return a deeply structured `UnifiedBusinessContext` containing independently available or unavailable slices. Render it through reusable embedded, side-panel, and slide-over variants. Do not attach panels to production object routes in this release.

## Why snapshot assembly

An explicit snapshot makes authorization and data provenance visible at the boundary. It prevents the context engine from becoming an ungoverned aggregation service or reaching directly into protected business modules. Future server loaders can gather authorized sources concurrently and pass the result to the same assembler.

## Why source-level unavailable states

Missing data is not equivalent to an empty business result. Every absent source produces “Awaiting connected business data.” This prevents missing integrations from appearing as zero activity, no risk, no recommendations, or good health.

## Storage decision

The local snapshot reader receives immutable constructor data and exposes `read` only. There is no database, browser storage, cache mutation, or write port. Durable context storage is intentionally out of scope because canonical facts remain owned by source systems.

## UI decision

The context panel operates on a serializable view model and never fetches. Tabs only select slices already present in that model. Embedded, side-panel, and slide-over variants allow future workspace integration without changing assembly contracts.

## Consequences

- Context composition is decoupled from CRM repositories and UI routes.
- Existing platform objects and events remain authoritative.
- Partial source availability is explicit.
- No AI reasoning or business execution occurs.
- Future authorized loaders and caches can implement stable ports.

## Future decisions

Later ADRs must define server aggregation authorization, concurrency and timeout policy, provenance and freshness, redaction, caching, invalidation, context size limits, partial streaming, object-route integration, and governed recommendation providers.
