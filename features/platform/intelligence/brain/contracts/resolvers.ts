import type { AnalyticsQuery, AnalyticsResult } from "../../analytics/contracts";
import type { KnowledgeRecord, Prediction, PredictionType, Recommendation, RecommendationType } from "../../domain/types";
import type { PlatformEvent } from "../../events/contracts";
import type { MemoryQuery, MemoryRecord } from "../../memory/contracts";
import type { UniversalObjectRef } from "@/features/platform/universal-objects/domain/models";
import type { BrainContext, BrainIdentityContext, BrainRequest } from "../domain/contracts";

export interface ContextSeed { identity: BrainIdentityContext; objects?: readonly UniversalObjectRef[]; featureFlags?: Readonly<Record<string, boolean>>; plugins?: readonly string[] }
export interface ContextResolver { resolve(request: BrainRequest): Promise<ContextSeed> }
export interface MemoryResolver { resolve(query: MemoryQuery): Promise<readonly MemoryRecord[]> }
export interface KnowledgeResolver { resolve(targets: readonly UniversalObjectRef[]): Promise<readonly KnowledgeRecord[]> }
export interface EventResolver { resolve(request: BrainRequest): Promise<readonly PlatformEvent[]> }
export interface PermissionDecision { allowed: boolean; permissions: readonly string[]; reasons: readonly string[] }
export interface PermissionResolver { resolve(identity: BrainIdentityContext, targets: readonly UniversalObjectRef[]): Promise<PermissionDecision> }
export interface RecommendationResolver { resolve(types: readonly RecommendationType[], target?: UniversalObjectRef): Promise<readonly Recommendation[]> }
export interface PredictionResolver { resolve(types: readonly PredictionType[], target?: UniversalObjectRef): Promise<readonly Prediction[]> }
export interface AnalyticsResolver { resolve(query?: AnalyticsQuery): Promise<AnalyticsResult | undefined> }
export interface BrainContextAssembler { assemble(request: BrainRequest): Promise<BrainContext> }

