# Workflow Engine Architecture

The Workflow & Approval Engine coordinates proposals without autonomous external execution.

```text
Repository → Service → Workflow Engine → Approval Engine → Execution Engine → Adapter
```

Every supported action references an enabled approval policy. Approval decisions require a human approver, reason, and timestamp; self-approval is forbidden. Approved requests can only be prepared by the deterministic adapter, which returns `executable: false`.

Every request, decision, rejection, cancellation, expiration, and transition appends an audit entry. Durable storage must eventually be tenant-scoped, append-only for audit data, idempotent, and protected by RLS.
