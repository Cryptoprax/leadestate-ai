# Vayon Event Bus

## Architecture

The Event Bus is an additive, in-memory communication contract under `features/platform/event-bus`. It contains the domain event model, factory, registry, publisher, subscriber, replay, history, filtering, search, module publisher contracts, shared components, and Server Component routes. It does not replace the immutable Business Timeline: the bus transports local domain notifications while Timeline remains the durable business-event architecture.

## Event model

Every event contains event ID, registered type, source module, workspace, organization, correlation ID, actor, timestamp, metadata-only payload, optional evidence reference, severity, and visibility. Events and metadata are frozen at publication. Event IDs are idempotent within a bus instance.

## Publishing rules

- Publish only registered, versioned event types.
- Include organization, workspace, correlation, source, and evidence metadata.
- Never include secrets or unbounded business records in payload metadata.
- Publishing does not authorize execution or mutate another module.
- Current module publisher contracts are additive architecture only; production hooks are disabled.
- AI Workforce may publish recommendations, suggested tasks, and risks, never actions.
- Workflow may publish request, grant, rejection, and preparation state, never dispatch.

## Subscriber rules

Subscribers declare stable IDs and explicit event types. Delivery is deterministic and sequential within the local process. Duplicate event IDs are ignored. Replay uses immutable history and the same subscriber filter. Subscriber failure rejects publication to make failure visible; no retry or dead-letter policy is implied.

## Filtering, history, and observability

History supports type, module, severity, correlation, date, and text filters. The customer surface displays local throughput, catalog size, module activity, and recent events. Empty history is explicit because no production module hooks or persistence are enabled.

## Future distributed event strategy

A future broker adapter must preserve the same envelope, registry version, tenant boundary, ordering key, idempotency, correlation, causation, evidence, visibility, replay, retention, and audit behavior. Kafka, EventBridge, or queue adapters must register through the Integration Platform and use an outbox/inbox boundary before production publishing. They must not make modules broker-aware.

## Technical debt and Sprint 35 recommendation

Durable outbox persistence, causation IDs, subscriber checkpoints, dead-letter handling, partition ordering, retention, authorization-aware replay, and production publisher hooks are intentionally absent. Sprint 35 should introduce a schema-independent durable event-store contract and outbox proposal before any broker or module hook is enabled.
