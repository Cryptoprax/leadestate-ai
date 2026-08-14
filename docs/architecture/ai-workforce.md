# AI Workforce Architecture

```text
AI Workforce → AI Employee → AI Provider → future model/runtime
```

`AIEmployee` owns role identity and delegates task evaluation to its assigned `AIProvider`. `AIEmployeeRegistry` records explicit employee-to-provider assignments, allowing different employees to use different providers without changing CRM, dashboards, task contracts, or Workforce UI.

The current provider is deterministic. Future OpenAI, Claude, Gemini, Azure OpenAI, or local model adapters must implement the same provider contract. Provider assignment alone grants no execution permission. Workforce outputs remain recommendations, drafts, summaries, or execution requests.

Tasks are validated against the employee identity before delegation, preventing accidental cross-employee dispatch. Provider health and version remain independently observable.
