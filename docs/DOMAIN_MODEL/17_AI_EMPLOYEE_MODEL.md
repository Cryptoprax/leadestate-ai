# AI Employee Model

AIEmployee is a governed digital-worker configuration: role, enabled capabilities, model policy, knowledge bases, budget, safety, approval policy, locale, and status. It is never an identity with unrestricted authority.

AIEmployee 1→* AICapability; *↔* KnowledgeBase; 1→* Recommendation/Execution/Evaluation. Recommendations contain structured output, confidence, evidence, versions, and approval state. Verified facts cannot be overwritten by inference.

Status: disabled, idle, running, waiting_for_approval, failed, suspended. All tool use is capability-scoped; write intent requires policy and approval. Provider/model is an adapter concern.
