import "server-only";
import type { ApprovalPolicy } from "../domain/models";
import { DeterministicExecutionAdapter } from "../adapters/deterministic.adapter";
import { ApprovalEngine } from "../engines/approval.engine";
import { ExecutionEngine } from "../engines/execution.engine";
import { WorkflowEngine } from "../engines/workflow.engine";
import { InMemoryGovernanceRepository } from "../repositories/in-memory.repository";
const policy: ApprovalPolicy = {
  id: "policy-human-approval",
  actionTypes: [
    "whatsapp.message",
    "email.draft",
    "meeting.schedule",
    "lead.assign",
    "deal.update",
    "document.generate",
    "campaign.launch",
    "task.create",
  ],
  requiredApproverRole: "workspace-approver",
  selfApprovalAllowed: false,
  expiresAfterMinutes: 1440,
  enabled: true,
};
const repository = new InMemoryGovernanceRepository(),
  approvals = new ApprovalEngine(repository, policy),
  workflows = new WorkflowEngine(repository, approvals),
  adapter = new DeterministicExecutionAdapter(),
  executions = new ExecutionEngine(repository, approvals, adapter);
export class GovernanceService {
  readonly workflowEngine = workflows;
  readonly approvalEngine = approvals;
  readonly executionAdapter = adapter;
  readonly executionEngine = executions;
  dashboard() {
    return {
      workflows: repository.workflows(),
      approvals: repository.approvals(),
      executions: repository.executions(),
      audit: repository.audit(),
    };
  }
  workflow(id: string) {
    return { workflow: repository.workflow(id), audit: repository.audit(id) };
  }
  approval(id: string) {
    return { approval: repository.approval(id), audit: repository.audit(id) };
  }
}
