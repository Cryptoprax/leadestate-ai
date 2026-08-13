# ADR-0005: Intelligence Platform

## Context
Vayon OS must evolve beyond module-local data and direct model calls.
## Problem
Intelligence embedded in CRM modules duplicates concepts and prevents governance and reuse.
## Decision
Create a layered platform consuming UBO references, events, knowledge, memory, analytics, and provider ports.
## Alternatives Considered
Independent AI features per module; a monolithic AI service; immediate database redesign.
## Trade-offs
Architecture precedes production behavior and initially exposes explicit placeholders.
## Consequences
No CRM workflow or schema changes occur, and future capabilities share stable contracts.
## Future Evolution
Add approved persistence, distributed events, operational analytics, evaluated models, and governed workforce execution.
