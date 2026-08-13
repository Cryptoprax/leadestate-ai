import type { LearningRecord, Reflection } from "../domain/contracts";
import type { LearningEngine } from "../contracts/ports";
export class ProviderNeutralLearningEngine implements LearningEngine {
  async collect(reflection: Reflection): Promise<readonly LearningRecord[]> { if (!reflection.actualResult) return []; return [{ id: crypto.randomUUID(), type: "observation", subject: reflection.actionId, content: reflection.actualResult, source: "reflection", confidence: { score: 0, level: "none", rationale: "Awaiting human review." }, evidence: [], status: "candidate", createdAt: reflection.reflectedAt }] }
}

