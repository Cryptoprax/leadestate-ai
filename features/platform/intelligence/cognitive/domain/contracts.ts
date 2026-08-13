import type { BrainConfidence, BrainContext, BrainExplanation, BrainReference } from "../../brain/domain/contracts";
import type { UniversalObjectRef } from "@/features/platform/universal-objects/domain/models";

export type CognitivePriority = "low" | "normal" | "high" | "critical";
export type CognitiveStatus = "draft" | "active" | "blocked" | "completed" | "failed" | "cancelled";

export type ContextNodeType = "organization" | "workspace" | "user" | "contact" | "company" | "property" | "lead" | "deal" | "task" | "activity" | "document" | "calendar-event" | "knowledge" | "memory" | "recommendation" | "prediction" | "event" | "analytics";
export type RelationshipDirection = "directed" | "bidirectional";
export interface ContextGraphNode { id: string; type: ContextNodeType; label: string; reference?: UniversalObjectRef; metadata: Readonly<Record<string, unknown>> }
export interface ContextGraphEdge { id: string; sourceId: string; targetId: string; relationship: string; direction: RelationshipDirection; weight: number; confidence: BrainConfidence; evidence: readonly BrainReference[] }
export interface ContextGraph { id: string; nodes: readonly ContextGraphNode[]; edges: readonly ContextGraphEdge[]; version: number; generatedAt: string }
export interface ContextGraphQuery { startNodeIds: readonly string[]; relationshipTypes?: readonly string[]; direction?: "incoming" | "outgoing" | "both"; maxDepth?: number; minimumConfidence?: number }
export interface ContextGraphTraversal { visitedNodes: readonly ContextGraphNode[]; traversedEdges: readonly ContextGraphEdge[]; paths: readonly (readonly string[])[] }

export type GoalType = "business" | "personal" | "team" | "ai" | "workflow";
export interface SuccessCriterion { id: string; description: string; target?: number; unit?: string; satisfied: boolean }
export interface FailureCriterion { id: string; description: string; triggered: boolean }
export interface CognitiveGoal { id: string; type: GoalType; title: string; description: string; target?: UniversalObjectRef; priority: CognitivePriority; deadline?: string; dependencyIds: readonly string[]; successCriteria: readonly SuccessCriterion[]; failureCriteria: readonly FailureCriterion[]; progress: number; status: CognitiveStatus; completedAt?: string }
export interface BusinessObjective { id: string; key: "increase-revenue" | "reduce-response-time" | "increase-conversions" | "improve-customer-satisfaction" | "reduce-churn" | "increase-occupancy" | "reduce-manual-work" | "increase-agent-productivity" | string; title: string; description: string; goalIds: readonly string[]; priority: CognitivePriority; status: CognitiveStatus; metadata: Readonly<Record<string, unknown>> }

export type PlanExecutionMode = "parallel" | "sequential";
export interface PlanRisk { id: string; description: string; likelihood: number; impact: number; mitigation?: string }
export interface PlannedTask { id: string; title: string; objective: string; order: number; dependencyIds: readonly string[]; mode: PlanExecutionMode; estimatedMinutes?: number; risks: readonly PlanRisk[]; confidence: BrainConfidence; requiresHumanApproval: boolean; retryPolicy: "unavailable"; rollback: "unavailable"; status: CognitiveStatus }
export interface CognitivePlan { id: string; objective: string; goalId?: string; tasks: readonly PlannedTask[]; constraints: readonly string[]; createdAt: string; status: CognitiveStatus }

export type PolicyType = "business" | "compliance" | "security" | "approval" | "financial" | "legal" | "workspace" | "custom";
export interface CognitivePolicy { id: string; type: PolicyType; name: string; description: string; priority: CognitivePriority; scope: { organizationId?: string; workspaceId?: string }; conditions: readonly PolicyCondition[]; effect: "allow" | "deny" | "require-approval"; active: boolean; version: number }
export interface PolicyCondition { field: string; operator: "equals" | "not-equals" | "includes" | "greater-than" | "less-than" | "exists"; value?: unknown }
export interface PolicyEvaluationRequest { action: CognitiveAction; context: BrainContext; policies: readonly CognitivePolicy[] }
export interface PolicyResult { allowed: boolean; matchedPolicyIds: readonly string[]; requiredApprovalTypes: readonly ApprovalType[]; reasons: readonly string[]; explanation: string }

export type ApprovalType = "auto" | "manager" | "owner" | "legal" | "finance" | "executive";
export interface ApprovalStep { id: string; type: ApprovalType; order: number; approverId?: string; delegatedTo?: string; status: "pending" | "approved" | "rejected" | "expired" | "escalated"; expiresAt?: string; decidedAt?: string; reason?: string }
export interface ApprovalRequest { id: string; actionId: string; steps: readonly ApprovalStep[]; currentStep: number; escalationTarget?: string; auditId?: string; status: "pending" | "approved" | "rejected" | "expired"; createdAt: string }

export type ActionLifecycleStage = "observe" | "understand" | "plan" | "evaluate" | "policy-check" | "approval-check" | "execute-placeholder" | "verify" | "explain" | "learn" | "store-memory" | "audit" | "rollback-placeholder";
export interface CognitiveAction { id: string; type: string; title: string; goalId?: string; target?: UniversalObjectRef; payload: Readonly<Record<string, unknown>>; priority: CognitivePriority; status: CognitiveStatus; requiresApproval: boolean }
export interface ActionLifecycleRecord { action: CognitiveAction; stage: ActionLifecycleStage; completedStages: readonly ActionLifecycleStage[]; policyResult?: PolicyResult; approval?: ApprovalRequest; explanation?: BrainExplanation; executionAvailable: false; rollbackAvailable: false; errors: readonly string[] }

export interface DecisionAlternative { id: string; title: string; plan: CognitivePlan; benefits: readonly string[]; tradeoffs: readonly string[]; risks: readonly PlanRisk[]; score: number }
export interface PriorityMatrixEntry { itemId: string; urgency: number; impact: number; effort: number; rank: number }
export interface DecisionPlan { id: string; decisionTree: readonly DecisionTreeNode[]; alternatives: readonly DecisionAlternative[]; constraints: readonly string[]; dependencies: readonly string[]; risks: readonly PlanRisk[]; priorityMatrix: readonly PriorityMatrixEntry[]; simulationStatus: "unavailable" }
export interface DecisionTreeNode { id: string; label: string; type: "question" | "option" | "outcome"; childIds: readonly string[]; evidence: readonly BrainReference[] }

export interface Reflection { id: string; actionId: string; expectedResult: string; actualResult?: string; gap?: string; lessons: readonly string[]; improvements: readonly string[]; confidenceAdjustment: number; feedbackStatus: "unavailable" | "recorded"; reflectedAt: string }
export type LearningType = "observation" | "feedback" | "correction" | "preference" | "success" | "failure" | "human-feedback" | "future-reinforcement";
export interface LearningRecord { id: string; type: LearningType; subject: string; content: string; source: string; confidence: BrainConfidence; evidence: readonly BrainReference[]; status: "candidate" | "reviewed" | "rejected"; createdAt: string }

export interface BusinessRule { id: string; name: string; scope: "organization" | "workspace"; scopeId: string; conditions: readonly PolicyCondition[]; outcome: Readonly<Record<string, unknown>>; exceptionIds: readonly string[]; overriddenRuleId?: string; inheritedFrom?: string; priority: number; active: boolean; version: number }
export interface CognitiveDecisionContext { brain: BrainContext; graph: ContextGraph; goals: readonly CognitiveGoal[]; policies: readonly CognitivePolicy[]; rules: readonly BusinessRule[] }
export interface CognitiveRequest { id: string; correlationId: string; objective: string; context: BrainContext; priority: CognitivePriority }
export interface CognitiveResponse { requestId: string; correlationId: string; context: CognitiveDecisionContext; plan: CognitivePlan; policy: PolicyResult; approval?: ApprovalRequest; lifecycle: ActionLifecycleRecord; reflection?: Reflection; learning: readonly LearningRecord[]; explanation: BrainExplanation; status: "architecture-preview" }

