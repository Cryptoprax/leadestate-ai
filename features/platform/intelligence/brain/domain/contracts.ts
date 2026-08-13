import type { AnalyticsResult } from "../../analytics/contracts";
import type { KnowledgeRecord, Prediction, Recommendation } from "../../domain/types";
import type { PlatformEvent } from "../../events/contracts";
import type { MemoryRecord } from "../../memory/contracts";
import type { UniversalObjectRef } from "@/features/platform/universal-objects/domain/models";

export type BrainPriority = "low" | "normal" | "high" | "critical";
export type BrainStatus = "idle" | "assembling" | "ready" | "blocked" | "failed";
export type BrainIntent = "understand" | "summarize" | "recommend" | "predict" | "plan" | "explain";
export type BrainCapability = "context" | "memory" | "knowledge" | "events" | "permissions" | "recommendations" | "predictions" | "analytics" | "explainability";

export interface BrainReference { id: string; kind: "object" | "memory" | "knowledge" | "event" | "recommendation" | "prediction"; label: string; source: string }
export interface BrainCitation extends BrainReference { excerpt?: string }
export interface BrainConfidence { score: number; level: "none" | "low" | "medium" | "high"; rationale: string }
export interface BrainObservation { id: string; statement: string; source: string; references: readonly BrainReference[] }
export interface BrainReason { id: string; statement: string; evidence: readonly BrainReference[]; limitations: readonly string[] }
export interface BrainAction { id: string; type: string; label: string; target?: UniversalObjectRef; requiresApproval: boolean; status: "proposed" | "approved" | "rejected" | "unavailable" }
export interface BrainGoal { id: string; description: string; status: "proposed" | "active" | "complete" | "blocked" }
export interface BrainPlan { id: string; goal: BrainGoal; steps: readonly BrainAction[] }
export interface BrainDecision { id: string; outcome: string; reasons: readonly BrainReason[]; actions: readonly BrainAction[]; confidence: BrainConfidence; requiresHumanApproval: boolean }
export interface BrainExplanation { why: string; evidence: readonly BrainReference[]; dataSources: readonly string[]; objectsUsed: readonly UniversalObjectRef[]; memoryUsed: readonly string[]; knowledgeUsed: readonly string[]; recommendationsUsed: readonly string[]; predictionsUsed: readonly string[]; limitations: readonly string[] }
export interface BrainResult { status: BrainStatus; summary: string; data: Readonly<Record<string, unknown>>; actions: readonly BrainAction[] }

export interface BrainIdentityContext { userId?: string; workspaceId?: string; organizationId?: string; roleIds: readonly string[]; permissions: readonly string[]; ownership?: Readonly<Record<string, string>> }
export interface BrainRegionalContext { locale: string; timezone: string; currency: string; language: string; now: string }
export interface BrainNavigationContext { route?: string; screen?: string; openRecord?: UniversalObjectRef; currentTask?: UniversalObjectRef }
export interface BrainContext {
  identity: BrainIdentityContext;
  regional: BrainRegionalContext;
  navigation: BrainNavigationContext;
  objects: readonly UniversalObjectRef[];
  knowledge: readonly KnowledgeRecord[];
  memory: readonly MemoryRecord[];
  events: readonly PlatformEvent[];
  recommendations: readonly Recommendation[];
  predictions: readonly Prediction[];
  analytics?: AnalyticsResult;
  featureFlags: Readonly<Record<string, boolean>>;
  plugins: readonly string[];
}

export interface BrainRequest { id: string; correlationId: string; intent: BrainIntent; input: string; priority: BrainPriority; context: Partial<BrainContext>; target?: UniversalObjectRef; capabilities?: readonly BrainCapability[]; metadata?: Readonly<Record<string, unknown>> }
export interface BrainResponse { requestId: string; correlationId: string; sessionId: string; result: BrainResult; decision: BrainDecision; explanation: BrainExplanation; context: BrainContext; trace: BrainTrace; citations: readonly BrainCitation[] }
export interface BrainSession { id: string; correlationId: string; startedAt: string; status: BrainStatus; requestIds: readonly string[]; state: BrainState }
export interface BrainState { stage: BrainPipelineStage; completedStages: readonly BrainPipelineStage[]; observations: readonly BrainObservation[]; errors: readonly string[] }
export type BrainPipelineStage = "observe" | "understand" | "collect-context" | "resolve-memory" | "resolve-knowledge" | "resolve-events" | "resolve-permissions" | "resolve-recommendations" | "resolve-predictions" | "build-context" | "build-prompt" | "generate-decision" | "generate-explanation" | "generate-result";
export interface BrainTraceStep { stage: BrainPipelineStage; status: "complete" | "skipped" | "failed"; startedAt: string; completedAt: string; sources: readonly string[]; durationMs?: number; futureTokenUsage?: number; futureCost?: number }
export interface BrainTrace { id: string; correlationId: string; startedAt: string; completedAt: string; status: BrainStatus; steps: readonly BrainTraceStep[]; contextSources: readonly string[] }
export interface BrainPipeline { run(request: BrainRequest): Promise<BrainResponse> }

