export type GovernedActionType =
  | "whatsapp.message"
  | "email.draft"
  | "meeting.schedule"
  | "lead.assign"
  | "deal.update"
  | "document.generate"
  | "campaign.launch"
  | "task.create";
export type WorkflowStatus = "draft" | "active" | "paused" | "archived";
export type ApprovalDecision =
  "pending" | "approved" | "rejected" | "expired" | "cancelled";
export type ExecutionStatus =
  "requested" | "approved" | "rejected" | "expired" | "executed" | "cancelled";
export interface WorkflowStep {
  readonly id: string;
  readonly name: string;
  readonly actionType: GovernedActionType;
  readonly conditions: readonly string[];
  readonly inputs: Readonly<Record<string, unknown>>;
  readonly outputs: readonly string[];
  readonly approvalPolicyId: string;
}
export interface GovernedWorkflow {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly owner: string;
  readonly status: WorkflowStatus;
  readonly steps: readonly WorkflowStep[];
  readonly version: number;
  readonly createdAt: string;
}
export interface ApprovalPolicy {
  readonly id: string;
  readonly actionTypes: readonly GovernedActionType[];
  readonly requiredApproverRole: string;
  readonly selfApprovalAllowed: false;
  readonly expiresAfterMinutes: number;
  readonly enabled: true;
}
export interface ApprovalRequest {
  readonly id: string;
  readonly executionId: string;
  readonly requestedBy: string;
  readonly aiEmployee?: string;
  readonly humanApprover?: string;
  readonly decision: ApprovalDecision;
  readonly reason?: string;
  readonly requestedAt: string;
  readonly decidedAt?: string;
}
export interface ExecutionRequest {
  readonly id: string;
  readonly workflowId: string;
  readonly stepId: string;
  readonly actionType: GovernedActionType;
  readonly requestedBy: string;
  readonly status: ExecutionStatus;
  readonly approvalPolicyId: string;
  readonly approvalId: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly requestedAt: string;
  readonly updatedAt: string;
}
export interface AuditEntry {
  readonly id: string;
  readonly subjectType: "workflow" | "approval" | "execution";
  readonly subjectId: string;
  readonly event: string;
  readonly actorId: string;
  readonly occurredAt: string;
  readonly metadata: Readonly<Record<string, unknown>>;
}
