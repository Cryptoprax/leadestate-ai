import type { GovernanceRepository } from "../contracts/ports";
import type {
  ApprovalRequest,
  AuditEntry,
  ExecutionRequest,
  GovernedWorkflow,
} from "../domain/models";
const workflows: readonly GovernedWorkflow[] = [
  {
    id: "governed-crm-actions",
    name: "Governed CRM Actions",
    description:
      "Architecture template demonstrating mandatory approval for every supported action.",
    owner: "Workspace administrators",
    status: "draft",
    version: 1,
    createdAt: "2026-08-14T00:00:00.000Z",
    steps: [
      "whatsapp.message",
      "email.draft",
      "meeting.schedule",
      "lead.assign",
      "deal.update",
      "document.generate",
      "campaign.launch",
      "task.create",
    ].map((actionType, index) => ({
      id: `step-${index + 1}`,
      name: actionType.split(".").join(" "),
      actionType: actionType as GovernedWorkflow["steps"][number]["actionType"],
      conditions: ["Approved workspace policy must resolve"],
      inputs: {},
      outputs: ["execution proposal"],
      approvalPolicyId: "policy-human-approval",
    })),
  },
];
export class InMemoryGovernanceRepository implements GovernanceRepository {
  private approvalValues = new Map<string, ApprovalRequest>();
  private executionValues = new Map<string, ExecutionRequest>();
  private auditValues: AuditEntry[] = [];
  workflows() {
    return workflows.map((value) => structuredClone(value));
  }
  workflow(id: string) {
    const value = workflows.find((item) => item.id === id);
    return value && structuredClone(value);
  }
  approvals() {
    return [...this.approvalValues.values()].map((value) =>
      structuredClone(value),
    );
  }
  approval(id: string) {
    const value = this.approvalValues.get(id);
    return value && structuredClone(value);
  }
  executions() {
    return [...this.executionValues.values()].map((value) =>
      structuredClone(value),
    );
  }
  saveApproval(value: ApprovalRequest) {
    this.approvalValues.set(value.id, structuredClone(value));
  }
  saveExecution(value: ExecutionRequest) {
    this.executionValues.set(value.id, structuredClone(value));
  }
  appendAudit(value: AuditEntry) {
    this.auditValues.push(structuredClone(value));
  }
  audit(subjectId?: string) {
    return this.auditValues
      .filter((value) => !subjectId || value.subjectId === subjectId)
      .map((value) => structuredClone(value));
  }
}
