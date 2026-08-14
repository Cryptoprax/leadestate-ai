import type {
  ApprovalRequest,
  AuditEntry,
  ExecutionRequest,
  GovernedWorkflow,
} from "../domain/models";
export interface GovernanceRepository {
  workflows(): readonly GovernedWorkflow[];
  workflow(id: string): GovernedWorkflow | undefined;
  approvals(): readonly ApprovalRequest[];
  approval(id: string): ApprovalRequest | undefined;
  executions(): readonly ExecutionRequest[];
  saveApproval(value: ApprovalRequest): void;
  saveExecution(value: ExecutionRequest): void;
  appendAudit(value: AuditEntry): void;
  audit(subjectId?: string): readonly AuditEntry[];
}
export interface ExecutionAdapter {
  readonly id: string;
  readonly external: false;
  supports(action: string): boolean;
  prepare(
    request: ExecutionRequest,
  ): Promise<{
    readonly status: "prepared";
    readonly executable: false;
    readonly adapterId: string;
  }>;
}
