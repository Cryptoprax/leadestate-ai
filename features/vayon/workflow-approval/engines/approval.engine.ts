import { randomUUID } from "node:crypto";
import type { GovernanceRepository } from "../contracts/ports";
import type {
  ApprovalPolicy,
  ApprovalRequest,
  ExecutionRequest,
} from "../domain/models";
export class ApprovalEngine {
  constructor(
    private repository: GovernanceRepository,
    private policy: ApprovalPolicy,
  ) {}
  request(execution: ExecutionRequest, actorId: string, aiEmployee?: string) {
    if (
      !this.policy.enabled ||
      !this.policy.actionTypes.includes(execution.actionType)
    )
      throw new Error("No approval policy covers this action.");
    const value: ApprovalRequest = {
      id: execution.approvalId,
      executionId: execution.id,
      requestedBy: actorId,
      aiEmployee,
      decision: "pending",
      requestedAt: new Date().toISOString(),
    };
    this.repository.saveApproval(value);
    this.audit(value.id, "approval.requested", actorId);
    return value;
  }
  decide(
    id: string,
    decision: "approved" | "rejected",
    approver: string,
    reason: string,
  ) {
    const current = this.repository.approval(id);
    if (!current || current.decision !== "pending")
      throw new Error("Approval is not pending.");
    if (!this.policy.selfApprovalAllowed && current.requestedBy === approver)
      throw new Error("Approval policy forbids self approval.");
    if (!reason.trim()) throw new Error("Approval decisions require a reason.");
    const next = {
      ...current,
      humanApprover: approver,
      decision,
      reason,
      decidedAt: new Date().toISOString(),
    } as const;
    this.repository.saveApproval(next);
    this.audit(id, `approval.${decision}`, approver, { reason });
    return next;
  }
  private audit(
    subjectId: string,
    event: string,
    actorId: string,
    metadata: Readonly<Record<string, unknown>> = {},
  ) {
    this.repository.appendAudit({
      id: randomUUID(),
      subjectType: "approval",
      subjectId,
      event,
      actorId,
      occurredAt: new Date().toISOString(),
      metadata,
    });
  }
}
