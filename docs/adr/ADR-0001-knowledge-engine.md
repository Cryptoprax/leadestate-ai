# ADR-0001: Knowledge Engine

## Context
Business objects need reusable intelligence without duplicating analysis inside CRM modules.
## Problem
Direct AI access to module tables creates coupling, inconsistent context, and weak provenance.
## Decision
Attach versioned `KnowledgeRecord` objects to canonical UBO references through store and generator ports.
## Alternatives Considered
Module-specific summary columns; direct provider calls from pages; untyped JSON blobs.
## Trade-offs
An additional projection layer is required, and knowledge can lag source changes.
## Consequences
Consumers receive consistent summaries, evidence categories, confidence, source, version, and status.
## Future Evolution
Add tenant-scoped persistence, invalidation events, provenance, approval, and governed generators.
