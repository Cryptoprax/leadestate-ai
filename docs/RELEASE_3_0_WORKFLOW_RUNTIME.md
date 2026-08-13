# Release 3.0 — Workflow Runtime & Automation Execution

## Executive summary

Release 3.0 activates deterministic execution for explicitly approved workflow actions. The runtime is provider-neutral, permission-gated, approval-aware, resumable from checkpoints, cancellable, retryable, observable, and append-only auditable. No action can run without a registered handler.

## Runtime architecture

`features/platform/workflow-runtime` separates domain state, ports, storage, dispatch, execution, publishing, variables, approvals, triggers, observability, and dashboard. The engine accepts immutable published runtime plans rather than changing the existing designer or planning contracts.

Execution states cover queued, running, waiting, paused, completed, cancelled, failed, timed out, and skipped. In-memory storage provides the reference implementation; production multi-process durability requires a later schema and queue release.

## Execution and resumption

The engine enforces workspace, organization, actor, feature, and permission context before queuing. It executes dependency-ordered steps, records checkpoints after successful steps, and skips completed outputs during resume. Cancellation is idempotent. Timeouts and terminal failures preserve the last checkpoint.

Retry uses bounded exponential backoff and explicit retryable error codes. Unapproved and unknown actions fail closed with `ACTION_NOT_APPROVED`.

## Approvals

Approval-required steps enter waiting state before dispatch. Decisions support approved, rejected, escalated, and timed-out contracts. Rejection cancels the session. Self-approval is denied unless the execution context contains the approval permission required by policy.

## Dispatcher and providers

Handlers exist for task, meeting, notification ports, provider-neutral Mail and Calendar contracts, canonical Timeline proposal submission, and document references. External providers are injected through their shared contracts. Workflow handlers never call Google or Microsoft endpoints directly.

## Variables

The resolver combines workflow context, CRM object snapshots supplied by callers, provider responses, prior step outputs, and execution metadata. Missing references fail deterministically before dispatch. Secrets must never enter the variable map.

## Audit and observability

History records started, step started/completed, approvals, retries, failures, timeouts, cancellation, resumption, and completion with duration and attempt metadata. Entries are append-only through the runtime store port. Metrics contain action names, timings, retries, and provider latency—not payloads, tokens, or secrets.

## Timeline boundary

The Timeline handler accepts a `TimelineProposalSubmitter`. Production wiring must implement that port with the existing canonical factory, validator, and `BusinessTimelineService`. Direct Timeline table or store access is prohibited.

## Security

`FEATURE_WORKFLOW_RUNTIME` defaults off. Publishing and execution require distinct permissions. Approval policy, workspace identity, cancellation authorization, handler allowlisting, bounded retries, and fail-closed dispatch are mandatory.

## Known limitations

The reference store and dashboard are process-local and intentionally start empty. There is no durable queue, distributed lease, database persistence, scheduler worker, event-trigger subscription, cross-process resume, dead-letter queue, or production provider wiring in this release package. Those require approved infrastructure and schema work. External execution success was not fabricated.
