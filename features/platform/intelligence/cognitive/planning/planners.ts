import type { BrainConfidence } from "../../brain/domain/contracts";
import type { CognitiveGoal, CognitivePlan, DecisionPlan, PlannedTask } from "../domain/contracts";
import type { DecisionPlanner, TaskPlanner } from "../contracts/ports";
const unavailable: BrainConfidence = { score: 0, level: "none", rationale: "No planning provider is connected." };
export class ArchitectureTaskPlanner implements TaskPlanner {
  constructor(private readonly id: () => string = () => crypto.randomUUID(), private readonly now: () => Date = () => new Date()) {}
  async plan(objective: string, goals: readonly CognitiveGoal[]): Promise<CognitivePlan> { const tasks: PlannedTask[] = goals.map((goal, order) => ({ id: this.id(), title: goal.title, objective: goal.description, order, dependencyIds: goal.dependencyIds, mode: "sequential", risks: [], confidence: unavailable, requiresHumanApproval: true, retryPolicy: "unavailable", rollback: "unavailable", status: "draft" })); return { id: this.id(), objective, goalId: goals[0]?.id, tasks, constraints: ["Execution is unavailable in the architecture release."], createdAt: this.now().toISOString(), status: "draft" } }
}
export class ArchitectureDecisionPlanner implements DecisionPlanner {
  constructor(private readonly id: () => string = () => crypto.randomUUID()) {}
  async evaluate(plan: CognitivePlan): Promise<DecisionPlan> { return { id: this.id(), decisionTree: [{ id: this.id(), label: "Human review required", type: "outcome", childIds: [], evidence: [] }], alternatives: [], constraints: plan.constraints, dependencies: plan.tasks.flatMap(task => task.dependencyIds), risks: plan.tasks.flatMap(task => task.risks), priorityMatrix: plan.tasks.map((task, rank) => ({ itemId: task.id, urgency: 0, impact: 0, effort: task.estimatedMinutes ?? 0, rank })), simulationStatus: "unavailable" } }
}

