# ADR-0004: Memory Architecture

## Context
Conversations, users, companies, and business objects require differently scoped and retained memory.
## Problem
A single transcript store cannot express expiration, semantic recall, provenance, or versioning.
## Decision
Separate memory records, storage, retrieval, and vector-store contracts with explicit scope and duration.
## Alternatives Considered
Prompt-only memory; provider-managed threads; one unversioned vector index.
## Trade-offs
Retention, deletion, indexing, and privacy orchestration become platform concerns.
## Consequences
The architecture supports short/long-term, session, knowledge, and object memory without schema changes.
## Future Evolution
Add consent, tenant isolation, encryption, retention jobs, hybrid retrieval, and source citations.
