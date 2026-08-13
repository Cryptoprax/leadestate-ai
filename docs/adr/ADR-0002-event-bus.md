# ADR-0002: Event Bus

## Context
Intelligence, audit, notifications, and analytics need decoupled change signals.
## Problem
Direct cross-module calls create fragile dependencies and block distributed processing.
## Decision
Use typed events with correlation, priority, lifecycle status, metadata, and replay provenance behind an `EventBus` port.
## Alternatives Considered
Database polling; module callbacks; vendor-specific Kafka or EventBridge code in domain services.
## Trade-offs
Eventual consistency and idempotency become explicit engineering responsibilities.
## Consequences
The in-memory bus supports architecture tests while queue-provider contracts preserve portability.
## Future Evolution
Adopt a transactional outbox, schema registry, dead-letter queues, observability, and durable replay.
