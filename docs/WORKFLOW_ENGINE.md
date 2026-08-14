# Vayon Workflow & Approval Engine

## Architecture

The governance layer is additive to the existing workflow designer and local runtime.

```text
Repository → Governance Service → Workflow Engine → Approval Engine → Execution Engine → Adapter
                                      ↓                 ↓                 ↓
                                  audit log          audit log         audit log
```

The in-memory repository provides architecture-safe local storage without database or schema changes. Domain values are cloned at repository boundaries. A future durable repository can implement the same port with tenant isolation and RLS.

## Workflow lifecycle

A workflow contains ordered steps, conditions, inputs, outputs, an owner, status, version, and approval policy references. Creating an execution request validates the workflow and step, stores a `requested` execution, requests approval, and records both transitions.

## Approval lifecycle

Every supported action is covered by the mandatory human-approval policy. Requests record the requester and optional AI employee. Decisions record the human approver, decision, required reason, and timestamp. Self-approval is forbidden. Pending approvals can become approved, rejected, expired, or cancelled through governed lifecycle methods.

## Execution lifecycle

Execution requests support requested, approved, rejected, expired, executed, and cancelled contract states. This release never transitions a request to `executed`. Approval permits only deterministic preparation. `ExecutionAdapter.external` is fixed to `false`, and preparation returns `executable: false`.

Supported action contracts are WhatsApp messages, email drafts, meeting scheduling, lead assignment, deal updates, document generation, campaign launch, and task creation.

## AI boundary

AI Workforce may propose recommendations, drafts, and execution requests. It cannot approve its own request, dispatch an adapter, or invoke an external provider. No AI Workforce source was modified by this release.

## Audit history

Approval requests, decisions, execution requests, cancellations, expirations, and workflow-related transitions append immutable audit entries with subject, event, actor, time, and metadata. Future persistence should use an append-only tenant-scoped audit store.

## Future adapters

WhatsApp, Gmail, Google Calendar, Twilio, and Stripe may implement the adapter port in future releases. Registration must remain disabled until credentials, tenant policy, permission checks, idempotency, human approval, observability, and provider-specific safety controls are independently certified.
