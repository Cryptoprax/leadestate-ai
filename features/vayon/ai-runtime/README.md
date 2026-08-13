# AI Runtime

Sprint 17 adds a provider-independent recommendation runtime behind the Sprint 15 `AIService`. OpenAI uses the official JavaScript SDK and Responses API Structured Outputs. No provider is invoked during tests.

The runtime builds tenant-scoped CRM context, hashes it for response caching, validates every output with Zod, persists telemetry, creates a recommendation and pending approval atomically, and never mutates CRM. Embeddings and streaming are explicit unsupported placeholders.

Configuration: `OPENAI_API_KEY` is required only when invoked. `AI_PROVIDER` defaults to `openai`, `OPENAI_MODEL` defaults to `gpt-5.6-sol`, and optional per-million-token cost variables are `OPENAI_INPUT_COST_PER_MILLION` and `OPENAI_OUTPUT_COST_PER_MILLION`. Secrets are never persisted or logged.
