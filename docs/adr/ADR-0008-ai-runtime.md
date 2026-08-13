# ADR-0008: Vayon AI Runtime

## Status

Accepted for Release 0.8 as an architecture-only provider gateway.

## Problem

Future AI capabilities need model providers, but direct SDK usage across Workforce, Brain, Cognitive Engine, and CRM modules would create vendor coupling, inconsistent safety, fragmented prompts, weak observability, and bypassable cost and permission controls.

## Decision

Create Vayon AI Runtime as the only future gateway to providers. The runtime owns descriptive provider registration, policy-based routing, prompt assembly, safety, output validation, streaming state, tool proposals, conversations, observability, and storage ports. Every adapter is disabled and unavailable in this release.

## Provider independence

Core requests and responses contain no provider SDK types. Providers are descriptors with stable capability metadata. Routing selects against those contracts, while future adapters translate at the outbound edge. Model names, prices, and volatile provider details are not fabricated into the core.

## Alternatives considered

- Continue the existing module-specific runtime for all future workloads. Rejected because the platform needs a shared, provider-neutral boundary without changing current behavior.
- Allow each advisor to select and call providers. Rejected because safety, cost, prompts, validation, and tracing would diverge.
- Integrate one provider now and abstract later. Rejected because vendor assumptions would become architectural defaults before governance review.

## Trade-offs

- The new boundary initially duplicates some concepts from legacy runtime code.
- Architecture delivers no generated output until an adapter is explicitly approved.
- A common runtime adds orchestration overhead and becomes a critical platform dependency.
- The initial schema validator and safety checks are intentionally conservative foundations, not production-grade classifiers.

## Future scalability

Provider registries, routers, prompt stores, safety services, validators, stream transports, tool catalogs, conversation stores, and observability sinks are independent ports. Runtime instances can scale statelessly once sessions and traces use durable stores. Region and workspace routing supports data residency and enterprise policies. Future A/B routing and load balancing remain explicit strategies.

## Consequences

Future AI integration occurs only through Vayon AI Runtime. Provider adapters require separate security and operational approval. Tool execution remains a separate governed layer. Current authentication, billing, onboarding, Supabase schema, database, RLS, security, routes, UI, Workforce, Brain, Cognitive Engine, and CRM behavior remain unchanged.

