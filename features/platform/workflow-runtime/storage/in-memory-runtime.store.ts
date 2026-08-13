import type { RuntimeStore } from "../contracts/ports";
import type {
  ApprovalRecord,
  ExecutionCheckpoint,
  ExecutionHistoryEntry,
  ExecutionSession,
} from "../domain/contracts";

export class InMemoryRuntimeStore implements RuntimeStore {
  private sessions = new Map<string, ExecutionSession>();
  private entries: ExecutionHistoryEntry[] = [];
  private checkpoints = new Map<string, ExecutionCheckpoint>();
  private approvals = new Map<string, ApprovalRecord>();

  save(session: ExecutionSession) {
    this.sessions.set(session.id, structuredClone(session));
  }

  get(id: string) {
    const value = this.sessions.get(id);
    return value && structuredClone(value);
  }

  list() {
    return Object.freeze(
      [...this.sessions.values()].map((value) => structuredClone(value)),
    );
  }

  appendHistory(entry: ExecutionHistoryEntry) {
    this.entries.push(structuredClone(entry));
  }

  history(sessionId: string) {
    return Object.freeze(
      this.entries
        .filter((item) => item.sessionId === sessionId)
        .map((item) => structuredClone(item)),
    );
  }

  checkpoint(value: ExecutionCheckpoint) {
    this.checkpoints.set(value.sessionId, structuredClone(value));
  }

  latestCheckpoint(sessionId: string) {
    const value = this.checkpoints.get(sessionId);
    return value && structuredClone(value);
  }

  saveApproval(value: ApprovalRecord) {
    this.approvals.set(
      `${value.sessionId}:${value.stepId}`,
      structuredClone(value),
    );
  }

  approval(sessionId: string, stepId: string) {
    const value = this.approvals.get(`${sessionId}:${stepId}`);
    return value && structuredClone(value);
  }
}
