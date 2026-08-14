# Sprint 49 — Live AI Workforce Runtime

## Runtime path

`WorkforceChatPanel → /api/ai/workforce/chat → WorkforceRuntimeService → OpenAIProvider → GPT-5`

The UI consumes newline-delimited streaming events from the route handler. The provider remains behind its provider-neutral contract, uses the Responses API with `store: false`, and never executes business actions.

## Employees and governance

Sales, CRM, Marketing, WhatsApp, Voice, Operations, Finance, and Executive AI default to OpenAI. An explicit per-employee environment override may select deterministic behavior. Provider errors retain the existing deterministic fallback for advisory operations. Chat responses are always recommendation-only and require human approval.

Workspace context accepts references to CRM, Gmail, Calendar, WhatsApp, Deals, and Tasks. Only validated identifiers cross the chat boundary; the runtime does not infer or fabricate record relationships.

## Persistence

`ai_workforce_conversations` and `ai_workforce_messages` store tenant-scoped history, usage, estimated cost, model, and governance state. Both tables use RLS and authenticated workspace membership. Apply `20260815000000_sprint49_live_ai_workforce.sql` before enabling chat in production.

## Health validation

Health uses a real minimal Responses API request rather than model retrieval. GPT-5 currently rejects an output limit of one with `integer_below_min_value`, so the probe uses the supported floor of 16 tokens, minimal reasoning, and `store: false`. Failures are mapped to sanitized diagnostics and logged using metadata only; keys, prompts, and raw provider responses are never logged.

The implementation follows the official [Responses create reference](https://developers.openai.com/api/reference/resources/responses/methods/create).
