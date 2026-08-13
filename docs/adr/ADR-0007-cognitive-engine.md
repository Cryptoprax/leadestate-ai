# ADR-0007: Vayon Cognitive Engine

## Status

Accepted for Release 0.6.6 as an architecture-only foundation.

## Problem

Vayon Brain assembles context but does not define how future workforce employees should set goals, prepare plans, evaluate deterministic constraints, obtain approval, review outcomes, or learn safely. Implementing those concerns independently per employee would duplicate policy logic and weaken governance.

## Decision

Create a Cognitive Engine above Vayon Brain. It accepts `BrainContext` and exposes graph, goal, planning, decision, policy, approval, lifecycle, reflection, learning, rule, and explanation contracts. Every Digital Workforce employee uses this layer. Production execution, rollback, simulation, reinforcement, AI, and ML remain unavailable.

## Alternatives considered

- Put planning and policies inside each workforce employee. Rejected because governance and explanations would diverge.
- Add reasoning directly to Vayon Brain. Rejected because context assembly and cognitive policy lifecycles have different responsibilities.
- Implement an autonomous agent runtime immediately. Rejected because authorization, evaluation, approval, audit, and rollback foundations must precede autonomy.
- Persist graphs, goals, and policies in the current schema. Rejected because this release forbids schema changes and persistence design requires separate review.

## Trade-offs

- Additional contracts increase architectural surface area.
- The current system visualizes and validates architecture without delivering automation.
- A central cognitive boundary can become complex and must retain independently replaceable services.
- Deterministic policy evaluation is intentionally limited to explicit, testable operators.

## Scalability

Each capability is an injected port. Graph storage, durable goals, policy registries, approval workflows, distributed planning, audit stores, and evaluated provider adapters can scale independently. Correlation IDs from Brain preserve end-to-end tracing. Tenant-scoped resolvers prevent company configuration from coupling to CRM modules.

## Future evolution

Add governed persistence, policy and rule builders, KPI sources, approval assignment, idempotent action adapters, outcome verification, compensating actions, reviewed memory storage, evaluation harnesses, and controlled provider integrations. No autonomous execution should ship until human override, audit, least privilege, rollback, and operational safety criteria are satisfied.

## Consequences

Workforce employees consume Brain for context and Cognitive Engine for planning and governance. Authentication, billing, onboarding, database, Supabase schema, RLS, migrations, routing behavior, current UI behavior, CRM behavior, and security remain unchanged.

