# Release 1.2 — Business Timeline Projections & Live Experience

## Overview

Release 1.2 turns the immutable Business Timeline Foundation into a customer-facing projection experience. The implementation remains entirely local and consumes `CanonicalBusinessEvent` and its associated Foundation references, classifications, lineage, and projection contracts.

The `/vayon/timeline` route receives an empty event collection intentionally. It does not seed, mock, infer, publish, or fabricate business activity. Future production ingestion can provide accepted canonical events through the existing boundary without changing the UI model.

```text
CanonicalBusinessEvent[]
          │
          ├── LiveTimelineProjectionService ── Workspace / Department / User / Category
          ├── Object reference projection ──── Subject + related object links
          ├── TimelineCorrelationService ────── Correlation and causation chain
          ├── TimelineJourneyService ────────── Origin → intermediate → current/outcome
          └── Inspector / projection health ─── Read-only experience
```

## Workspace timeline

Workspace events are always rendered chronologically. Scope definitions support the entire workspace, a department represented by team ownership, a user represented by actor or user ownership, and a category. Organization and workspace boundaries remain explicit inputs to the projection service.

The UI provides an accessible workspace tab, structured filters, chronological feed, selection state, and an empty state explaining the future ingestion boundary.

## Object timelines

Supported object timeline kinds are contacts, companies, properties, leads, deals, documents, tasks, and campaigns. Matching uses only the canonical primary subject and semantic related-object links. It does not query, copy, or mutate Universal Object records.

The object-type selector is keyboard accessible and designed to accept an object identity through the shared filter contract. Campaign remains a forward-compatible timeline type because the Foundation permits string object types without changing Universal Objects.

## Correlation explorer

The correlation service selects canonical events sharing a correlation ID, orders them chronologically, and identifies whether each node is the origin, directly caused by another event in the chain, or correlated without an in-chain parent. Related subject and linked-object identities are deduplicated.

The visual explorer uses native layout only. It reports incomplete causation when a referenced cause is outside the locally available chain. No graph library or graph persistence is introduced.

## Journey view

Journey steps are a disposable view over chronologically ordered events. The first event is the origin, interior events are intermediate steps, and the last event is either the current state or an outcome when the canonical name or severity indicates a terminal result. This does not mutate or reinterpret canonical payloads.

## Filters and structured local search

The live filter contract supports:

- occurred-time date range;
- category;
- priority;
- severity;
- actor;
- workspace;
- canonical object reference;
- correlation ID.

The customer experience also performs a local text refinement over already supplied safe envelope fields: event name, summary, actor identity/display hint, correlation identity, and subject identity/display hint. This is an in-memory refinement, not an indexing engine. The Foundation `TimelineSearch` port remains the future provider boundary for larger result sets.

## Event inspector

The inspector is read-only and displays envelope identity/version, sequence, correlation, causation, trace, visibility, classification, retention, integrity metadata, and validation state. Object references remain canonical identities rather than copied object payloads. The separate inspection service can run the Foundation validator against a trusted context when connected by a future server projection loader.

## Projection dashboard

The dashboard represents six projection families: workspace, department, user, category, object, and correlation. Each exposes projection status, replay readiness, sequence status, and validation status. Status values describe projection architecture only; they are not operational telemetry.

## Security and data boundaries

- No authentication, billing, onboarding, RLS, schema, or migration changes.
- No Universal Object, Brain, Cognitive Engine, AI Runtime, Workforce, or CRM changes.
- No external APIs, event brokers, AI providers, indexing providers, or production event generation.
- Projection services require explicit organization scope and preserve workspace scope.
- Visibility and classification remain canonical metadata; a future authorized loader must enforce field-level disclosure before passing events to the client.
- Client filters never expand the server-authorized event collection.

## Extension path

Future releases can connect an authorized server-side projection loader, persistent checkpoints, durable replay workers, indexed search, streaming updates, and projection telemetry through existing ports. The customer components accept canonical event arrays and therefore do not need knowledge of the eventual storage or broker provider.

Before production ingestion, engineers must add authorization-aware server loading, visibility/classification redaction, cursor pagination, projection checkpoint persistence, sequence-gap monitoring, retention enforcement, and load testing.
