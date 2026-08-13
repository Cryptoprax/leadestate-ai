# Release 0.8 — Vayon AI Runtime

## Architecture

Vayon AI Runtime is the future provider-neutral boundary between Vayon OS and model providers. Release 0.8 supplies contracts and deterministic orchestration only. Every provider descriptor is disabled, no adapter exists, no provider SDK is imported, and no network request can occur.

```text
Workforce / Brain / Cognitive consumer
                 │ AIRuntimeRequest
                 ▼
          Safety inspection
                 │
                 ▼
     Provider-neutral routing policy
                 │
                 ▼
     Versioned prompt management
                 │
                 ▼
       Provider adapter placeholder
       (all adapters unavailable)
                 │
                 ▼
    Normalization + output validation
                 │
                 ▼
 AIRuntimeResponse + trace + explanation
 status: unavailable/blocked, executable: false
```

The new package is isolated under `features/platform/ai-runtime`. It does not modify the existing operational `features/vayon/ai-runtime`, Workforce, Brain, Cognitive Engine, CRM, authentication, billing, onboarding, database, schema, RLS, migrations, or security behavior.

## Provider-neutral philosophy

Provider descriptors cover OpenAI, Anthropic, Google Gemini, Azure OpenAI, Ollama, OpenRouter, future local models, and future enterprise models. Descriptors expose capabilities, supported-model contracts, vision, speech, embeddings, structured output, streaming, tool and function calling, context-window metadata, and pricing, latency, and health placeholders.

Descriptors are not clients. `enabled` and `adapterAvailable` are both `false`. Supported-model arrays are empty instead of inventing model catalogs or volatile pricing. Future adapters must implement a separately reviewed outbound boundary.

## Runtime core

The core defines request, response, session, conversation, context, capability, metadata, cost, usage, trace, error, explanation, and citation contracts. Responses include safety and validation results, usage and cost placeholders, structured errors, stage traces, confidence, and `executable: false`.

`VayonAIRuntime` runs deterministic stages: received, safety, routing, prompt assembly, provider placeholder, normalization, validation, and completion. It always returns `blocked` when safety fails or `unavailable` when no adapter exists.

## Routing

`ArchitectureProviderRouter` supports preferred provider, fallback lists, capability routing, cost and latency policy fields, region requirements, workspace preferences, and future A/B and load-balancing strategies. It selects only a descriptor that is both enabled and adapter-backed; therefore this release selects none.

Routing decisions expose candidates, chosen strategy, reasons, provider, model, and availability status. Future policy implementations can evolve without changing runtime consumers.

## Prompt management

Central prompt management supports versioned templates, variables, localization, workspace overrides, role prompts, system prompts, task prompts, fragments, activation, assembly, and missing-variable validation. Workspace templates are preferred over global templates, and versions remain addressable.

Future prompt testing belongs behind an evaluation service. Prompts must never be embedded directly inside provider adapters.

## Output validation

The provider-neutral validator checks object shape, required fields, malformed output, confidence presence, citation presence, safety status, permission status, normalization, and validation errors. Its JSON Schema contract is deliberately minimal and replaceable with a standards-complete validator later.

No absent confidence or citation is synthesized. Undefined provider output remains undefined.

## Safety

The architecture covers prompt injection, PII indicators, tenant isolation, permission validation, sensitive-data classification, blocked content, future rate limits, and future human approval. The included deterministic inspection blocks missing workspace/organization scope, missing permissions, and basic injection signatures. PII patterns trigger review without modifying input.

Production activation requires audited classifiers, redaction, tenant-scoped data minimization, policy administration, robust injection testing, abuse controls, rate limits, and explicit approval semantics.

## Streaming

Provider-neutral streaming contracts model chunks, sequence assembly, cancellation, reconnection tokens, timeout, heartbeat, final chunks, and stream state. Future WebSocket or SSE transports can adapt to this contract. The architecture controller performs local state transitions only and opens no connection.

## Tool calling

Contracts are registered for Calendar, CRM, Email, Documents, Search, Tasks, Properties, Leads, Deals, Analytics, and future plugins. Every tool declares input/output schema, permissions, approval requirements, and `executable: false`. Proposals are always blocked; no tool handler or business action is called.

## Conversations and observability

Sessions and conversations support history, context, memory, knowledge, workspace, advisor, and future multi-agent references. In-memory storage is optional and non-production.

Observability captures request ID, provider and model placeholders, latency placeholder, retries, token usage placeholder, estimated cost placeholder, errors, warnings, confidence, safety status, and pipeline stages. No telemetry provider is installed.

## Dashboard

`/vayon/runtime` displays provider descriptors, health, routing architecture, prompt and validation pipelines, safety, conversation and streaming flows, tool contracts, and observability. All status is architectural and no usage, health, cost, latency, or token metrics are fabricated.

## Future provider integration

Provider activation requires an approved adapter contract, credentials boundary, tenant policy, regional routing, privacy and retention review, security testing, output evaluations, schema validation, prompt-injection defenses, rate and cost limits, retry and timeout controls, cancellation, trace redaction, incident response, and kill switches.

All consumers must use the Vayon AI Runtime. No Workforce advisor, Brain resolver, Cognitive service, or CRM module should import a provider SDK directly.

