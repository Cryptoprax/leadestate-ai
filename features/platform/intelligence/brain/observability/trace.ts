import type { BrainPipelineStage, BrainStatus, BrainTrace, BrainTraceStep } from "../domain/contracts";

export interface BrainClock { now(): Date }
export interface BrainIdGenerator { create(): string }
export class SystemBrainClock implements BrainClock { now() { return new Date() } }
export class CryptoBrainIdGenerator implements BrainIdGenerator { create() { return crypto.randomUUID() } }
export class BrainTraceRecorder {
  private readonly startedAt: string;
  private readonly steps: BrainTraceStep[] = [];
  constructor(private readonly correlationId: string, private readonly clock: BrainClock = new SystemBrainClock(), private readonly ids: BrainIdGenerator = new CryptoBrainIdGenerator()) { this.startedAt = clock.now().toISOString() }
  record(stage: BrainPipelineStage, status: BrainTraceStep["status"], sources: readonly string[] = []) { const startedAt = this.clock.now().toISOString(); this.steps.push({ stage, status, startedAt, completedAt: this.clock.now().toISOString(), sources }) }
  finish(status: BrainStatus): BrainTrace { return { id: this.ids.create(), correlationId: this.correlationId, startedAt: this.startedAt, completedAt: this.clock.now().toISOString(), status, steps: this.steps, contextSources: [...new Set(this.steps.flatMap(step => step.sources))] } }
}

