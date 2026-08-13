# Workflow Runtime Guide

1. Enable `FEATURE_WORKFLOW_RUNTIME` only for an approved workspace.
2. Validate and publish an immutable plan with `workflow.publish` permission.
3. Register only reviewed action handlers in `WorkflowActionDispatcher`.
4. Queue manual or scheduled execution with `workflow.execute` permission.
5. Review sessions in `/vayon/workflows/runtime`.
6. Resolve waiting approvals using a separate authorized actor where policy requires it.
7. Resume paused, waiting, or remediated failed sessions from their last checkpoint.
8. Use correlation IDs to connect runtime traces, provider telemetry, audit history, and canonical Timeline events.

Never place secrets in workflow variables, action inputs, history metadata, or observability attributes. Provider handlers must use shared Mail, Calendar, operation, notification, document-reference, and Timeline ports. Unknown provider actions fail closed.

The current store is an in-memory reference adapter. Do not claim distributed or durable execution until a database-backed store, queue, leases, idempotency ledger, scheduler, and operational runbook are deployed.
