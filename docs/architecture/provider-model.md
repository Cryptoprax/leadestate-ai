# Provider Model

Vayon provider boundaries isolate vendor behavior from business modules.

The AI provider contract exposes identity, version, task execution, summarization, recommendation, and health. AI employees depend on this contract rather than on a model vendor. Execution adapters are a separate boundary for business actions and must not be confused with AI providers.

```text
AIProvider: reasoning and advisory output
ExecutionAdapter: governed preparation or future external action
Integration provider: authorization, transport, and vendor lifecycle
```

Future providers require registration, capability declaration, health reporting, tenant feature flags, credential isolation, observability, rate-limit handling, and explicit disablement by default.
