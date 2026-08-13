import type { BrainExplanation } from "../../brain/domain/contracts";
import type { CognitiveAction, CognitiveGoal, CognitiveRequest, CognitiveResponse } from "../domain/contracts";
import type { ActionLifecycle, ApprovalFramework, BusinessRuleResolver, CognitiveEngine, CognitiveExplainer, ContextGraphBuilder, GoalEngine, LearningEngine, PolicyEngine, ReflectionEngine, TaskPlanner } from "../contracts/ports";

export interface CognitiveEngineDependencies { graph: ContextGraphBuilder; goals: GoalEngine; planner: TaskPlanner; policies: PolicyEngine; approvals: ApprovalFramework; lifecycle: ActionLifecycle; reflection: ReflectionEngine; learning: LearningEngine; rules: BusinessRuleResolver; explainer: CognitiveExplainer; goalSource?: (request: CognitiveRequest) => Promise<readonly CognitiveGoal[]>; policySource?: (request: CognitiveRequest) => Promise<Parameters<PolicyEngine["evaluate"]>[0]["policies"]> }
export class VayonCognitiveEngine implements CognitiveEngine {
  constructor(private readonly dependencies: CognitiveEngineDependencies, private readonly id: () => string = () => crypto.randomUUID()) {}
  async reason(request: CognitiveRequest): Promise<CognitiveResponse> {
    const graph = this.dependencies.graph.build(request.context), goals = await (this.dependencies.goalSource?.(request) ?? Promise.resolve([])), evaluatedGoals = await Promise.all(goals.map(goal => this.dependencies.goals.evaluate(goal))), rules = await this.dependencies.rules.resolve(request.context), plan = await this.dependencies.planner.plan(request.objective, evaluatedGoals);
    const action: CognitiveAction = { id: this.id(), type: "architecture-placeholder", title: request.objective, payload: {}, priority: request.priority, status: "draft", requiresApproval: true };
    const policies = await (this.dependencies.policySource?.(request) ?? Promise.resolve([])), policy = await this.dependencies.policies.evaluate({ action, context: request.context, policies }), approval = await this.dependencies.approvals.prepare(action, policy), lifecycle = await this.dependencies.lifecycle.prepare(action, policy, approval), reflection = await this.dependencies.reflection.reflect(lifecycle, request.objective), learning = await this.dependencies.learning.collect(reflection), explanation = this.dependencies.explainer.explain(lifecycle, request.context);
    return { requestId: request.id, correlationId: request.correlationId, context: { brain: request.context, graph, goals: evaluatedGoals, policies, rules }, plan, policy, approval, lifecycle, reflection, learning, explanation, status: "architecture-preview" };
  }
}
export class ArchitectureCognitiveExplainer implements CognitiveExplainer {
  explain(record: Parameters<CognitiveExplainer["explain"]>[0], context: Parameters<CognitiveExplainer["explain"]>[1]): BrainExplanation { return { why: record.policyResult?.explanation ?? "No policy evaluation was available.", evidence: [], dataSources: ["vayon-brain-context", "deterministic-policy-engine"], objectsUsed: context.objects, memoryUsed: context.memory.map(item => item.id), knowledgeUsed: context.knowledge.map(item => item.id), recommendationsUsed: context.recommendations.map(item => item.id), predictionsUsed: context.predictions.map(item => item.id), limitations: ["Architecture preview only.", "Execution, rollback, simulation, feedback, ML, and AI providers are unavailable."] } }
}

