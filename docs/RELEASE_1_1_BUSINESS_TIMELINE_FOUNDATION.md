# Release 1.1 — Business Timeline Foundation

## Architecture

Release 1.1 implements the local architecture described by the approved Business Timeline specification. It establishes a canonical immutable event contract, versioned taxonomy, Universal Object references, trusted-scope validation, append-only in-memory storage, projections, search contracts, inert subscriptions, and an architecture dashboard.

This release has no production persistence, database or schema changes, RLS changes, broker, external API, AI call, telemetry provider, automatic execution, or production event ingestion.

```text
EventProposal + trusted tenant context
                 │
                 ▼
        CanonicalEventValidator
  tenant / workspace / schema / policy
                 │
                 ▼
 InMemoryAppendOnlyTimelineStore
 immutable append / idempotency / sequence
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
 Projections   Search    Subscriptions
 (local)       (no index) (no delivery)
```

The package is isolated under `features/platform/business-timeline` and separates domain, contracts, services, storage, components, types, dashboard composition, projections, search, and subscriptions. Dependencies point toward domain and port contracts.

## Canonical event model

`CanonicalBusinessEvent` is readonly throughout its envelope. It includes event and envelope identity/version, organization and workspace, partition, primary subject and related object links, actor, owner, source, three time concepts, sequence, correlation, causation, idempotency, category, priority, severity, visibility, safe summary, payload, classification, retention, derivation, supersession, trace, and integrity metadata.

Object references contain canonical identity, type, optional version, and a display hint. They never copy Universal Object payloads. Related links add semantic roles, allowing one event to appear in several object projections without duplicate facts.

Event relations cover causation, correlation, supersession, correction, reversal, derivation, approval, rejection, fulfillment, retry, replay, and duplicate lineage.

## Taxonomy

The registry covers Sales, Growth, Communication, Operations, Finance, Documents, Governance, Customer, Integration, Workforce, Intelligence, Platform, and Audit. Schemas are keyed by event name and event version, associated with an envelope version and category, and can declare required payload fields.

Registering a new version does not alter older definitions. Consumers can inspect every version of an event name. No production schema registry is connected.

## Storage

`InMemoryAppendOnlyTimelineStore` supports append, ID lookup, partition reads, replay, and full local inspection. Appended envelopes and nested values are deeply frozen. There is no update, delete, or mutation API.

Idempotency is enforced by organization, workspace, producer, and idempotency key. Duplicate attempts return the existing event. Event IDs must be unique. Sequence numbers increase within each partition. Corrections use `BusinessTimelineService.correct`, which appends a new event with `supersedesEventId`; it never changes the original.

The default UUID and clock are injectable for deterministic future tests. This store is suitable only for architecture tests and previews.

## Projection architecture

Projection contracts cover workspace timelines, object timelines, recent events, category views, actor views, and correlation views. `InMemoryProjectionEngine` scopes every projection by organization and workspace before applying its view filter.

Object timelines match primary and related object identities. Standard projections preserve partition sequence; recent-event views order by recorded time. Checkpoint contracts model partition sequence and build status, but this release runs no background projector.

## Search

Search contracts support occurred, recorded, or received time ranges; category; primary or related object; actor; correlation; severity; priority; workspace; and organization. The local implementation filters only explicitly stored in-memory events and applies organization scope first.

Results use bounded cursor pagination and report `indexStatus: unavailable`. There is no search index or full-text engine.

## Subscriptions

Provider-neutral contracts model subscription identity, tenant scope, consumer identity and permissions, event/category/object filters, cursor, partition ordering, retry policy, dead-letter placeholder, replay bounds, and non-executable deliveries.

The in-memory service can register definitions, select events for a bounded replay, and retain local checkpoints. It does not publish, deliver, retry, invoke consumers, or connect to Kafka/EventBridge.

## Validation

`CanonicalEventValidator` validates required fields, trusted organization and workspace scope, envelope version, event-name/version syntax, idempotency key, permitted visibility, permitted classification, and optional taxonomy registration. Client-provided tenant scope must match the trusted validation context.

Validation failures throw a typed `TimelineValidationFailure` before append. The validation service performs no authorization lookup; production authorization remains a future trusted adapter.

## Observability

Local observability contracts record trace metadata and append, replay, projection, or validation history. They provide categorized read methods for architecture inspection. No telemetry provider, exporter, metric, or remote trace service exists.

## Dashboard

`/vayon/timeline` displays the architecture overview, canonical envelope, taxonomy, projection flow, object linking, lifecycle, categories, and foundation invariants. It contains no business event records or fabricated metrics.

## Future phases

1. Approve event schemas, naming governance, and compatibility policy.
2. Add a tenant-isolated durable append store and transactional outbox.
3. Add permission-aware workspace and object read projections.
4. Add a secure search index with freshness watermarks and redaction.
5. Add durable consumer checkpoints, replay controls, retry, and dead-letter handling.
6. Adopt event emission incrementally in owning domain modules.
7. Add Brain event resolution and immutable explainability citations.
8. Add broker adapters, archives, analytics exports, and offline synchronization.

Every future phase must preserve immutable identity, tenant scope, idempotency, versioning, correlation, causation, append-only corrections, and permission-safe projections.

