# ADR-0006: Vayon Brain

## Status

Accepted for Release 0.6.5 as an architecture-only foundation.

## Context

Vayon OS has universal objects and reusable knowledge, memory, event, audit, recommendation, prediction, insight, analytics, and workforce contracts. Future Digital Workforce roles would become inconsistent and unsafe if each role assembled context or queried CRM modules independently.

## Decision

Introduce Vayon Brain as the only intelligence orchestration gateway. Workforce employees submit `BrainRequest` and consume `BrainResponse`. A staged pipeline assembles permission-aware context through resolver interfaces, creates a provider-neutral prompt contract, forms an explainable decision graph, and records a trace. No provider or execution engine is part of this release.

Modules publish or expose information through platform contracts; they do not call one another to satisfy workforce requests. This preserves module ownership and prevents an AI worker from bypassing existing authorization boundaries.

## Why Brain exists

A central layer provides one place to enforce tenant scope, permissions, provenance, confidence, limitations, approval, observability, and provider policy. It keeps AI as a consumer of governed platform intelligence rather than a privileged database client.

## Scalability

Resolvers and storage are ports. In-memory adapters can later be replaced by tenant-scoped stores, distributed queues, Kafka or EventBridge consumers, vector retrieval, analytics warehouses, and approved model providers. Correlation IDs and stage traces support distributed execution without changing the gateway contract.

## Trade-offs

- An additional orchestration layer adds contracts and coordination overhead.
- Architecture precedes user-facing automation, so current decisions remain explicit placeholders.
- Context assembly can become expensive; future implementations need budgets, caching, redaction, and source limits.
- A single logical gateway requires resilient deployment, though its adapters and stages can scale independently.

## Consequences

Future workforce features integrate through Brain, not CRM repositories. Existing authentication, billing, onboarding, schema, RLS, migrations, routing behavior, and CRM logic remain unchanged. Production AI requires separate security, privacy, evaluation, cost, approval, and provider decisions.

