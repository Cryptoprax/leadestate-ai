# Release 0.6.5 — Vayon Brain

## Purpose

Vayon Brain is the central intelligence orchestration boundary for Vayon OS. Future Digital Workforce employees ask one gateway for governed context and receive one explainable response contract. They do not query CRM modules, Supabase tables, knowledge stores, event stores, or analytics providers directly.

This release is architecture only. It changes no authentication, billing, onboarding, database, RLS, migration, CRM workflow, or production persistence behavior. It makes no AI, ML, telemetry, or external API calls and creates no production business records.

## Architecture

```text
Digital Workforce employees
            │ BrainRequest
            ▼
     VayonBrainGateway
            │
            ▼
 ArchitectureReasoningPipeline ───────────────▶ BrainTrace
            │
            ▼
 DefaultBrainContextAssembler
   ├── Context + identity + region + route
   ├── Permission resolver (before intelligence output)
   ├── Universal Object references
   ├── Knowledge resolver
   ├── Memory resolver
   ├── Event resolver
   ├── Recommendation resolver
   ├── Prediction resolver
   └── Analytics resolver
            │
            ▼
 Prompt contract → Decision graph → Explanation → BrainResponse
 (unformatted)      (placeholder)     (sources)     (typed)
```

Dependencies point inward to domain contracts. Resolvers adapt Release 0.6 ports, the context assembler coordinates them, the pipeline owns ordering, and the gateway is the sole public orchestration entry point. In-memory storage implements optional session, response, and trace ports without schema changes.

## Brain contracts

The core defines context, request, response, decision, reason, action, observation, session, pipeline, capability, state, trace, explanation, reference, citation, confidence, intent, goal, plan, and result contracts. `BrainContext` carries tenant identity and permissions; regional settings; route, screen, open record, and task; universal objects; knowledge; memory; events; recommendations; predictions; analytics; feature flags; and future plugin identifiers.

## Resolvers and context

Each source has an independent port. `DefaultBrainContextAssembler` first resolves identity and scope, then verifies the user/workspace/organization boundary. Recommendation and prediction resolution is suppressed when required tenant identity is incomplete. Current adapters consume only existing platform interfaces; persistence and transport remain replaceable.

Context never implies authorization. A future production resolver must apply current RLS-backed application authorization and object ownership rules before returning records. ABAC and delegated access remain explicit extension points.

## Reasoning pipeline

The ordered stages are: Observe, Understand, Collect Context, Resolve Memory, Resolve Knowledge, Resolve Events, Resolve Permissions, Resolve Recommendations, Resolve Predictions, Build Context, Build Prompt Placeholder, Generate Decision Placeholder, Generate Explanation, and Generate Result.

The decision stage deliberately produces no business advice. It records that the provider boundary is disconnected, reports zero confidence, and exposes architecture limitations. The pipeline can later accept an approved decision provider without changing callers.

## Prompt assembly

`ContractPromptBuilder` assembles system, workspace, role, context, memory, knowledge, output-contract, and tool-contract sections. The result is explicitly `unformatted` and non-executable. Provider-specific formatting belongs in a future outbound adapter, not in the Brain domain.

## Decision graph and explainability

The graph models decisions, dependencies, observations, reasons, evidence, references, and future human approval. Every response exposes why, evidence, confidence, data sources, objects, memory, knowledge, recommendations, predictions, and limitations. Empty sources remain empty; the layer never invents evidence.

## Observability

`BrainTraceRecorder` captures pipeline stage status, execution order, timestamps, and context sources. Token usage, latency, and cost are optional future fields only. No telemetry provider is installed. Trace persistence is an injected port with a local in-memory implementation.

## Digital Workforce readiness

Contracts are ready for CEO, Sales Director, Sales Executive, Receptionist, Operations, Finance, Legal, Marketing, Customer Success, Property Advisor, Recruiter, and Support employees. Each creates a `BrainRequest` and consumes a `BrainResponse`; direct execution is forbidden by the contract. Human approval can be introduced at the decision graph boundary.

## Dashboard

`/vayon/brain` is a responsive, keyboard-accessible, dark architecture view showing Brain status, resolver boundaries, the reasoning pipeline, decision graph shape, permissions posture, and workforce connections. Labels are architectural status only—there are no fabricated business metrics.

## Extension points

- Replace static context with authenticated, tenant-scoped context adapters.
- Add durable trace/session stores behind existing storage ports.
- Add evaluated queue, vector, semantic-search, analytics, and knowledge adapters.
- Add approved provider formatting and generation behind a new outbound decision port.
- Add policy enforcement for ABAC, ownership, delegation, and human approval.
- Add latency, token, and cost telemetry only after privacy and retention review.

