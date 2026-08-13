# Release 0.7 — Vayon Workforce MVP

## Workforce overview

Vayon Workforce is the first customer-facing advisory experience built on Vayon Brain and the Cognitive Engine. It introduces Executive, Sales, and Operations advisors under `/vayon/workforce` while preserving the existing AI Workforce routes and CRM behavior.

The MVP is advisory only. It does not call an AI or ML provider, execute an action, write CRM data, query Supabase, or create production business assessments. Empty states explicitly wait for governed context rather than inventing metrics, priorities, risks, or recommendations.

## Architecture

```text
Customer advisory request
          │
          ▼
   WorkforceAdvisor
          │ BrainRequest
          ▼
    BrainGateway.ask
   permission-aware context
          │ CognitiveRequest
          ▼
  CognitiveEngine.reason
 policy + plan + explanation
          │
          ▼
 AdvisorResponse (executionAvailable: false)
          │
          ▼
 Advisor view model + explainability UI
```

The Workforce layer imports the Brain Gateway and Cognitive Engine interfaces. It does not import CRM repositories, Supabase clients, provider SDKs, database services, or action handlers. The gateway assembles governed context and cognition evaluates the advisory objective. The advisor maps those responses to a customer-facing, cited, explainable view model.

The package separates domain, contracts, services, view models, dashboard components, storage, and exported types. In-memory storage provides a future-compatible boundary for conversation and recommendation history without persistence or schema changes.

## Advisors

### Executive Advisor

The Executive workspace includes an executive summary, business health overview, key priorities, risks, opportunities, recommended actions, confidence, explainability, and source references. Until governed context is requested and sufficiently supported, every surface remains in an `awaiting-context` state.

### Sales Advisor

The Sales workspace provides contracts and surfaces for lead prioritization, deal health, stalled pipeline detection, follow-up recommendations, missing-information alerts, pipeline improvement suggestions, confidence, explanations, and citations. It does not modify leads, deals, pipelines, or follow-up records.

### Operations Advisor

The Operations workspace supports overdue work summaries, bottleneck reviews, incomplete-record detection, operational recommendations, productivity suggestions, confidence, explanations, and citations. It does not modify tasks, workflows, records, calendars, or assignments.

## Workforce shell

The responsive dark interface provides:

- Keyboard-accessible advisor selection
- Capability-specific insight cards
- A session-local conversation architecture preview
- Confidence indicators
- An explainability drawer with reasoning, sources, citations, and limitations
- Recommendation timeline placeholder
- Activity history placeholder
- Explicit advisory and non-execution status

Conversation prompts remain in React state only and produce a fixed architecture notice. They do not invoke the advisor service, Brain, Cognitive Engine, or any provider in this release.

## Explainability model

Every `AdvisorResponse` contains the Cognitive explanation, Brain citations, confidence, correlation ID, Brain response, and Cognitive response. Insight cards expose confidence and citation count. The drawer presents reasoning, data sources, individual citations, and limitations. Empty evidence remains empty.

The model supports future audit linkage through correlation IDs and existing Brain traces. A future production implementation must preserve object-level permissions and redact any source the current user cannot access.

## Future AI provider integration

If a provider is approved later, it belongs behind the existing Brain and Cognitive outbound ports. Advisors continue to depend only on the gateway and engine. Provider activation requires privacy review, evaluations, prompt-injection defenses, tenant isolation, model and prompt versioning, structured output validation, cost controls, rate limits, observability, data retention rules, and human override.

No advisor should receive a provider SDK or direct database client.

## Future execution layer

Execution is not part of Workforce MVP. Future actions require a separate least-privilege command boundary with explicit policy checks, approval, idempotency, audit, dry-run support, outcome verification, compensation or rollback, timeout and retry controls, and customer-visible activity history.

Advisory recommendations must never become actions implicitly. The `executionAvailable: false` and `executable: false` contracts ensure this release cannot cross that boundary.

## Extension points

- Authenticated server composition of the existing Brain and Cognitive implementations
- Tenant-scoped conversation and recommendation storage
- Streaming advisory transport behind a provider-neutral interface
- Customer feedback and reviewed learning candidates
- Source-level permission and freshness indicators
- Saved advisor sessions and cross-advisor handoff
- Governed execution proposals with human approval

