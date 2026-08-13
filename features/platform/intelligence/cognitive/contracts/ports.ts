import type { BrainContext, BrainExplanation } from "../../brain/domain/contracts";
import type { ActionLifecycleRecord, ApprovalRequest, BusinessRule, CognitiveAction, CognitiveGoal, CognitivePlan, CognitiveRequest, CognitiveResponse, ContextGraph, ContextGraphQuery, ContextGraphTraversal, DecisionPlan, LearningRecord, PolicyEvaluationRequest, PolicyResult, Reflection } from "../domain/contracts";

export interface ContextGraphBuilder { build(context: BrainContext): ContextGraph }
export interface ContextGraphTraverser { traverse(graph: ContextGraph, query: ContextGraphQuery): ContextGraphTraversal }
export interface ContextGraphStore { save(graph: ContextGraph): Promise<void>; get(id: string): Promise<ContextGraph | undefined> }
export interface GoalEngine { create(goal: CognitiveGoal): Promise<CognitiveGoal>; evaluate(goal: CognitiveGoal): Promise<CognitiveGoal> }
export interface TaskPlanner { plan(objective: string, goals: readonly CognitiveGoal[]): Promise<CognitivePlan> }
export interface DecisionPlanner { evaluate(plan: CognitivePlan): Promise<DecisionPlan> }
export interface PolicyEngine { evaluate(request: PolicyEvaluationRequest): Promise<PolicyResult> }
export interface ApprovalFramework { prepare(action: CognitiveAction, result: PolicyResult): Promise<ApprovalRequest | undefined> }
export interface ActionLifecycle { prepare(action: CognitiveAction, policy: PolicyResult, approval?: ApprovalRequest): Promise<ActionLifecycleRecord> }
export interface ReflectionEngine { reflect(record: ActionLifecycleRecord, expectedResult: string, actualResult?: string): Promise<Reflection> }
export interface LearningEngine { collect(reflection: Reflection): Promise<readonly LearningRecord[]> }
export interface BusinessRuleResolver { resolve(context: BrainContext): Promise<readonly BusinessRule[]> }
export interface CognitiveExplainer { explain(record: ActionLifecycleRecord, context: BrainContext): BrainExplanation }
export interface CognitiveEngine { reason(request: CognitiveRequest): Promise<CognitiveResponse> }
