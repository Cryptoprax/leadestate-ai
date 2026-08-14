import { randomUUID } from "node:crypto";
import type {
  ExecutionAdapter,
  GovernanceRepository,
} from "../contracts/ports";
import type { ExecutionRequest } from "../domain/models";
import { ApprovalEngine } from "./approval.engine";
export class ExecutionEngine {
  constructor(
    private repository: GovernanceRepository,
    private approvals: ApprovalEngine,
    private adapter: ExecutionAdapter,
  ) {}
  async decide(
    requestId: string,
    decision: "approved" | "rejected",
    approver: string,
    reason: string,
  ) {
    const current = this.repository
      .executions()
      .find((value) => value.id === requestId);
    if (!current) throw new Error("Execution request not found.");
    this.approvals.decide(current.approvalId, decision, approver, reason);
    const next: ExecutionRequest = {
      ...current,
      status: decision,
      updatedAt: new Date().toISOString(),
    };
    this.repository.saveExecution(next);
    this.audit(next, `execution.${decision}`, approver, { reason });
    if (decision === "approved") await this.adapter.prepare(next);
    return next;
  }
  cancel(requestId: string, actorId: string) {
    const current = this.repository
      .executions()
      .find((value) => value.id === requestId);
    if (!current || !["requested", "approved"].includes(current.status))
      throw new Error("Execution cannot be cancelled.");
    const next: ExecutionRequest = {
      ...current,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };
    this.repository.saveExecution(next);
    this.audit(next, "execution.cancelled", actorId);
    return next;
  }
  expire(requestId: string) {
    const current = this.repository
      .executions()
      .find((value) => value.id === requestId);
    if (!current || current.status !== "requested")
      throw new Error("Execution cannot expire.");
    const next: ExecutionRequest = {
      ...current,
      status: "expired",
      updatedAt: new Date().toISOString(),
    };
    this.repository.saveExecution(next);
    this.audit(next, "execution.expired", "system");
    return next;
  }
  private audit(
    request: ExecutionRequest,
    event: string,
    actorId: string,
    metadata: Readonly<Record<string, unknown>> = {},
  ) {
    this.repository.appendAudit({
      id: randomUUID(),
      subjectType: "execution",
      subjectId: request.id,
      event,
      actorId,
      occurredAt: new Date().toISOString(),
      metadata,
    });
  }
}
