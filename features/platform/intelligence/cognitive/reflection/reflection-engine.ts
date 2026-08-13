import type { ActionLifecycleRecord, Reflection } from "../domain/contracts";
import type { ReflectionEngine } from "../contracts/ports";
export class ArchitectureReflectionEngine implements ReflectionEngine {
  constructor(private readonly id: () => string = () => crypto.randomUUID(), private readonly now: () => Date = () => new Date()) {}
  async reflect(record: ActionLifecycleRecord, expectedResult: string, actualResult?: string): Promise<Reflection> { return { id: this.id(), actionId: record.action.id, expectedResult, actualResult, gap: actualResult === undefined ? "No action was executed; comparison is unavailable." : expectedResult === actualResult ? undefined : "Expected and actual results differ.", lessons: [], improvements: [], confidenceAdjustment: 0, feedbackStatus: "unavailable", reflectedAt: this.now().toISOString() } }
}

