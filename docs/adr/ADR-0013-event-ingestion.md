# ADR-0013: Event Ingestion

## Status

Accepted for Release 1.3 as a local architecture boundary.

## Context

Vayon hubs need a consistent way to describe business actions as canonical timeline events without coupling hub logic to timeline storage, transport, or a production ingestion mechanism. The Release 1.1 validator requires category-qualified, versioned canonical names, while product-facing mappings benefit from concise action aliases.

## Decision

Introduce three boundaries:

1. A registry maps stable action identifiers and aliases to canonical event name, version, envelope version, category, and subject kind.
2. A canonical factory combines a mapping with explicit trusted context and immutable action input to produce a deeply frozen `EventProposal`.
3. Hub adapters expose creation methods only and depend on `EventFactoryPort`.

No adapter is connected to a production action in this release. A deterministic local preview may validate and append sample proposals to the existing in-memory store, clearly labeled as architecture preview data.

## Naming

Aliases such as `lead.created` and `deal.closed` remain mapping inputs. Emitted canonical names are category-qualified—for example `sales.lead.created` and `sales.deal.closed`—so Release 1.1 naming and version validation remain unchanged.

## Validation boundary

Factories do not establish trust. A future server ingestion boundary must supply tenant, workspace, actor, source, correlation, idempotency, and occurrence metadata. `CanonicalEventValidator` verifies the proposal against trusted scope before append. The local preview exercises this exact contract without becoming a production source.

## Consequences

- Hubs remain independent of persistence and transport.
- Mappings are discoverable and versioned in one registry.
- Tests can validate event construction without running business actions.
- Deep immutability protects factory outputs before append.
- Production delivery, atomicity, and authorization remain intentionally unresolved.

## Alternatives rejected

- Direct writes from hubs would couple CRM behavior to timeline persistence.
- Production hooks in this release would create events without durable atomicity guarantees.
- Two-segment canonical names would weaken the approved Foundation taxonomy.
- A broker or database would prematurely select infrastructure.
- Generated tenant, time, or idempotency values inside adapters would obscure provenance.

## Future decisions

Future ADRs must address transactional outbox semantics, authenticated producers, durable ordering, schema compatibility, broker adapters, delivery retries, dead-letter handling, integrity signing, observability, retention, and backfill governance.
