# Release 1.3 — Event Ingestion & Hub Integration

## Overview

Release 1.3 adds a provider-neutral event-emission boundary between Vayon hubs and the immutable Business Timeline. It does not connect production actions, generate production events, persist events durably, publish to a broker, call external APIs, or invoke AI.

```text
Hub action data
     │
     ▼
Hub Event Adapter (creation methods only)
     │
     ▼
Business Action Mapping Registry
     │
     ▼
Canonical Event Factory → immutable EventProposal
     │
     ▼
Validator → local append-only preview store
```

## Event Factory

`CanonicalEventFactory` accepts an explicit trusted context and action input. The trusted context contains organization, workspace, partition, actor, owner, and producer source. The action input contains the canonical subject reference, related references, safe summary, payload, occurrence time, correlation, causation, idempotency, priority, severity, visibility, classification, retention, derivation, supersession, and trace metadata.

The factory resolves the action through the mapping registry and returns a deeply frozen `EventProposal`. It does not generate identity, time, tenant scope, correlation, or idempotency values. Callers must supply them, preventing hidden or non-deterministic provenance.

Supported subject families are lead, deal, property, contact, company, task, document, campaign, communication, calendar, note, attachment, Workforce recommendation, and configuration.

## Hub adapters

Adapters exist for Sales Hub, Growth Hub, Communication Hub, Configuration, and Universal Objects. Each adapter only exposes explicit creation methods and delegates to `EventFactoryPort`. No adapter is imported into an existing hub workflow and none registers hooks, subscribes to state, writes data, publishes events, or triggers business behavior.

This inversion keeps hubs independent of storage and future transport. A later release can invoke adapters from approved transactional boundaries without changing canonical mappings.

## Event mapping

`BusinessEventMappingRegistry` maps stable business-action identifiers and requested shorthand aliases to category-qualified canonical names. Examples:

| Business action | Alias | Canonical event |
|---|---|---|
| Lead Created | `lead.created` | `sales.lead.created` |
| Deal Won | `deal.closed` | `sales.deal.closed` |
| Property Published | `property.published` | `sales.property.published` |
| Campaign Saved | `campaign.saved` | `growth.campaign.saved` |
| Document Uploaded | `document.uploaded` | `documents.document.uploaded` |
| Meeting Scheduled | `meeting.scheduled` | `operations.meeting.scheduled` |

Category qualification preserves the Release 1.1 naming invariant. Every mapping declares event version, envelope version, category, and required subject kind.

## Validation and ingestion

The local preview pipeline uses `CanonicalEventValidator` and `BusinessTimelineService` before the existing append-only in-memory store. This enforces required fields, trusted organization and workspace matching, idempotency, positive versions, canonical name syntax, envelope version, visibility, and classification.

The in-memory store supplies immutable canonical IDs, recorded time, partition sequence, and duplicate suppression for the current preview session only. It is neither durable nor production ingestion.

## Timeline preview

The Business Timeline header includes an explicit “Load architecture preview” control. It creates a deterministic local sequence through the factory and adapters, validates it, and displays it using Release 1.2 projections. Every identity, label, payload, and timestamp is marked as preview data. The samples contain no business metrics, financial amounts, performance claims, customer data, or inferred outcomes.

Exiting preview clears the local collection. The route continues to pass an empty production event collection.

## Security and scope boundaries

- No authentication, billing, onboarding, database, migration, or RLS changes.
- No modifications to CRM behavior, Universal Objects, AI Runtime, Brain, Cognitive Engine, or Workforce.
- No external API, event broker, durable store, AI provider, production hook, or production event source.
- Adapters must be invoked only after a future trusted server boundary has authorized an action.
- Client preview is demonstration architecture and must never be interpreted as an audit record.

## Future durable ingestion

A later release should add a transactional outbox or equivalent atomic source, server-side adapter invocation, durable append storage, schema-registry governance, producer authentication, signed integrity metadata, dead-letter handling, replay checkpoints, partition strategy, observability, redaction, retention, and broker adapters. These additions can implement existing ports without changing hub-facing adapter methods or the canonical envelope.
