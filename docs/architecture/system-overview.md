# Vayon OS System Overview

Vayon OS is a multi-tenant enterprise operating system organized around authenticated workspace context, provider-neutral services, immutable platform contracts, and customer-facing modules.

```text
Product Shell
  ├─ CRM and business modules
  ├─ Universal Objects and Context
  ├─ Business Timeline
  ├─ Intelligence, Brain, and Cognitive Engine
  ├─ AI Workforce
  └─ Workflow, Approval, and Execution Governance
```

Server Components acquire tenant context through existing authenticated services. Repositories enforce organization and workspace boundaries. Provider integrations remain behind contracts and must not leak credentials or vendor-specific types into business modules.

The platform separates recommendations from execution. AI may summarize, recommend, draft, and request work. Human policy approval is required before an execution adapter can prepare a request. No currently registered governance adapter can autonomously execute an external action.
