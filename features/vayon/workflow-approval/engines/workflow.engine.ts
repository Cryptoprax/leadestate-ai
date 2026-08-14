import { randomUUID } from "node:crypto";
import type { GovernanceRepository } from "../contracts/ports";
import type { ExecutionRequest, GovernedActionType } from "../domain/models";
import { ApprovalEngine } from "./approval.engine";
export class WorkflowEngine {
  constructor(
    private repository: GovernanceRepository,
    private approvals: ApprovalEngine,
  ) {}
  request(
    workflowId: string,
    stepId: string,
    actionType: GovernedActionType,
    actorId: string,
    payload: Readonly<Record<string, unknown>> = {},
    aiEmployee?: string,
  ) {
    const workflow = this.repository.workflow(workflowId),
      step = workflow?.steps.find((value) => value.id === stepId);
    if (!workflow || !step || step.actionType !== actionType)
      throw new Error("Workflow step is invalid.");
    const now = new Date().toISOString(),
      id = randomUUID(),
      approvalId = randomUUID(),
      request: ExecutionRequest = {
        id,
        workflowId,
        stepId,
        actionType,
        requestedBy: actorId,
        status: "requested",
        approvalPolicyId: step.approvalPolicyId,
        approvalId,
        payload,
        requestedAt: now,
        updatedAt: now,
      };
    this.repository.saveExecution(request);
    this.repository.appendAudit({
      id: randomUUID(),
      subjectType: "execution",
      subjectId: id,
      event: "execution.requested",
      actorId,
      occurredAt: now,
      metadata: { workflowId, stepId, actionType },
    });
    this.approvals.request(request, actorId, aiEmployee);
    return request;
  }
}
