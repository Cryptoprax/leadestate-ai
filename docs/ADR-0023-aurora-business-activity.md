# ADR-0023: Populate Aurora Through the Canonical Business Timeline

## Status

Accepted for Release 1.8.5.

## Context

Aurora has stable organization, CRM, property, and sales-operation identities. Business activity now needs history, correlation, and customer-facing projections. Creating a demo-specific event envelope would fragment ordering, explainability, search, replay, and future persistence.

## Decision

Generate Aurora history exclusively through the existing canonical Event Factory and mapping registry, then append chronologically sorted proposals to the existing in-memory append-only store. Use only registered actions. Connect every event to existing identities, preserve idempotency, and keep the integration local and Aurora-gated.

## Consequences

- Timeline projections exercise the real platform contracts.
- No duplicate timeline architecture or unsupported event taxonomy is created.
- Campaign and communication records remain immutable local demo assets.
- Financial metrics, external message content, provider calls, AI, and durable persistence remain absent.
- Future durable ingestion can reconcile canonical IDs and idempotency keys instead of translating a parallel format.

