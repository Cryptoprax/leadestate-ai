# ADR-0003: AI Provider Contracts

## Context
Future intelligence may use several hosted and local model providers.
## Problem
Provider SDK types and features would otherwise leak across the platform.
## Decision
Define capability-oriented provider and registry contracts for six provider families with policy metadata.
## Alternatives Considered
One OpenAI-specific service; lowest-common-denominator text API; direct SDK use in features.
## Trade-offs
Adapters must normalize streaming, usage, tools, and structured output semantics.
## Consequences
Core intelligence remains provider-neutral and contains no live credentials or calls.
## Future Evolution
Add governed adapters, routing, fallback, evaluation, budget controls, moderation, and telemetry.
