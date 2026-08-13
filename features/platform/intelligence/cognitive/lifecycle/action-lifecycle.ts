import type { ActionLifecycleRecord, ApprovalRequest, CognitiveAction, PolicyResult } from "../domain/contracts";
import type { ActionLifecycle } from "../contracts/ports";
export const actionLifecycleStages = ["observe", "understand", "plan", "evaluate", "policy-check", "approval-check", "execute-placeholder", "verify", "explain", "learn", "store-memory", "audit", "rollback-placeholder"] as const;
export class SafeActionLifecycle implements ActionLifecycle {
  async prepare(action: CognitiveAction, policy: PolicyResult, approval?: ApprovalRequest): Promise<ActionLifecycleRecord> { const blocked = !policy.allowed || approval?.status === "pending"; return { action: { ...action, status: blocked ? "blocked" : "draft" }, stage: "execute-placeholder", completedStages: ["observe", "understand", "plan", "evaluate", "policy-check", "approval-check"], policyResult: policy, approval, executionAvailable: false, rollbackAvailable: false, errors: blocked ? [approval?.status === "pending" ? "Human approval is pending." : "Policy evaluation denied the action."] : ["Execution is unavailable in the architecture release."] } }
}

