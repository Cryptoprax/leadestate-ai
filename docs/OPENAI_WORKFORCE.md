# Live OpenAI AI Workforce

## Architecture

Sprint 48 adds `features/platform/openai` using Domain → Contract → Repository → Service → Provider → ViewModel → Server Component boundaries. AI employees continue to depend on a provider interface. Each employee resolves either the deterministic provider or OpenAI independently, and the Sprint 17 runtime adapter delegates live generation to the same platform OpenAI provider.

## Provider model

`OpenAIProvider` uses the official JavaScript SDK and the Responses API. It provides chat, responses, streaming, embeddings, summaries, recommendations, classification, extraction, moderation, token estimation, and cost estimation. The registry includes `gpt-5`, `gpt-5.5`, immutable snapshots, and an environment-configurable future-model path. Capability discovery is model-registry driven.

The official model catalog confirms that GPT-5 and GPT-5.5 support Responses, streaming, structured output, and function calling. GPT-5.5’s current snapshot is `gpt-5.5-2026-04-23`. See the [official GPT-5 documentation](https://developers.openai.com/api/docs/models/gpt-5) and [official GPT-5.5 documentation](https://developers.openai.com/api/docs/models/gpt-5.5).

## Security

The API key is environment-managed and represented in the UI only as configured or unavailable. Server-only modules own the SDK and provider pool. Authorization headers, keys, raw responses, prompts, and sensitive payloads are never returned by settings view models or written to logs. Responses are requested with storage disabled. Workspace attribution is mandatory and no autonomous or cross-workspace memory is created.

## Costs

Actual Responses usage supplies prompt and completion token counts. Cost estimates use the versioned model price registry and are persisted through the existing tenant-scoped runtime output path. `countTokens` is explicitly an estimate based on input length; it is not presented as provider-billed usage. Pricing is dated and isolated so it can be revised without changing provider behavior.

## Prompt lifecycle

1. The existing employee supplies an approved workspace and factual context.
2. The service builds a bounded system prompt and user prompt without hidden state.
3. Prompt presence, workspace attribution, and maximum size are validated.
4. Input is moderated before generation or embedding.
5. The SDK request uses a timeout, cancellation signal, and bounded retry policy.
6. Structured results are schema validated where required.
7. Only normalized output, usage, cost, model, and latency enter existing runtime persistence.
8. Recommendations remain non-executable and require Workflow Approval.

## Fallback

Every employee defaults to deterministic rules. An employee uses OpenAI only when explicitly assigned. Provider, moderation, timeout, quota, or validation failures are recorded without prompt content and return a deterministic result with `fallback: true`. The UI continues to show OpenAI as unavailable; it never labels deterministic output as OpenAI output.

## Workflow, events, and notifications

Generated actions are recommendation-only, `executionAllowed` is false, and approval is mandatory. The integration declares `ai.requested`, `ai.completed`, `ai.failed`, `ai.provider.connected`, and `ai.provider.disconnected` events. Provider failures, quota warnings, budget warnings, and approval-required recommendations map into the existing Notification Platform.

## Technical debt

- Persist employee provider assignments through a governed, tenant-scoped Administration RPC instead of environment configuration.
- Add a durable failure/attempt table so success-rate metrics include failed calls, not only successful runtime outputs.
- Replace approximate preflight token counting with the provider token-counting endpoint when supported by the installed SDK and chosen model.
- Add an authenticated streaming route that forwards normalized text deltas without raw provider events.
- Add workspace budget enforcement before dispatch, using the existing billing and approval boundaries.
- Extend output schemas for each domain capability while retaining evidence references.

## Future providers

Claude, Gemini, Azure OpenAI, local models, and future OpenAI models can implement the same provider and employee-assignment contracts. Provider-specific SDK details remain behind adapters; employee, workflow, CRM, Timeline, and Product Shell contracts remain unchanged.
