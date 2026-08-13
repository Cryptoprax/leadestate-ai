import type { CognitiveGoal } from "../domain/contracts";
import type { GoalEngine } from "../contracts/ports";
export class InMemoryGoalEngine implements GoalEngine {
  private readonly goals = new Map<string, CognitiveGoal>();
  async create(goal: CognitiveGoal) { this.goals.set(goal.id, goal); return goal }
  async evaluate(goal: CognitiveGoal) { const failed = goal.failureCriteria.some(item => item.triggered), complete = goal.successCriteria.length > 0 && goal.successCriteria.every(item => item.satisfied); const evaluated = { ...goal, progress: complete ? 1 : goal.progress, status: failed ? "failed" as const : complete ? "completed" as const : goal.status, completedAt: complete ? goal.completedAt ?? new Date().toISOString() : goal.completedAt }; this.goals.set(goal.id, evaluated); return evaluated }
}

