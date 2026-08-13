import type { BrainResponse, BrainSession, BrainTrace } from "../domain/contracts";
import type { BrainResponseStore, BrainSessionStore, BrainTraceStore } from "./contracts";
export class InMemoryBrainStore implements BrainSessionStore, BrainTraceStore, BrainResponseStore {
  private readonly sessions = new Map<string, BrainSession>(); private readonly traces: BrainTrace[] = []; private readonly responses = new Map<string, BrainResponse>();
  async save(value: BrainSession | BrainResponse) { if ("requestId" in value) this.responses.set(value.requestId, value); else this.sessions.set(value.id, value) }
  async get(id: string) { return this.sessions.get(id) }
  async append(trace: BrainTrace) { this.traces.push(trace) }
  async list(correlationId?: string) { return correlationId ? this.traces.filter(item => item.correlationId === correlationId) : [...this.traces] }
  async getResponse(requestId: string) { return this.responses.get(requestId) }
}

