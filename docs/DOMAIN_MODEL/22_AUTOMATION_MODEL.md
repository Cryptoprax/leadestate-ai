# Automation Model

Workflow is a versioned graph of event/configuration triggers, conditions, capability steps, approvals, branches, retries, deadlines, and termination. Published versions are immutable.

WorkflowExecution records correlation, state, current step, decisions, approvals, outputs, and failures. Automation never grants authority: every step is constrained by tenant, RBAC, consent, budget, kill switches, idempotency, and capability policy. Compensations are explicit future steps, not implicit rollback.
