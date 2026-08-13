import type { AnalyticsProvider, AnalyticsQuery } from "../../analytics/contracts";
import type { KnowledgeStore } from "../../knowledge/contracts";
import type { MemoryQuery, MemoryRetriever } from "../../memory/contracts";
import type { PredictionEngine } from "../../predictions/contracts";
import type { RecommendationEngine } from "../../recommendations/contracts";
import type { EventBus } from "../../events/contracts";
import type { BrainRequest, BrainIdentityContext } from "../domain/contracts";
import type { AnalyticsResolver, ContextResolver, ContextSeed, EventResolver, KnowledgeResolver, MemoryResolver, PermissionDecision, PermissionResolver, PredictionResolver, RecommendationResolver } from "../contracts/resolvers";

export class StaticContextResolver implements ContextResolver { constructor(private readonly seed: ContextSeed) {} async resolve() { return this.seed } }
export class StoreMemoryResolver implements MemoryResolver { constructor(private readonly retriever: MemoryRetriever) {} resolve(query: MemoryQuery) { return this.retriever.retrieve(query) } }
export class StoreKnowledgeResolver implements KnowledgeResolver { constructor(private readonly store: KnowledgeStore) {} async resolve(targets: BrainRequest["context"]["objects"] = []) { const keys = new Set(targets.map(target => `${target.type}:${target.id}`)); return this.store.list().filter(item => keys.has(`${item.target.type}:${item.target.id}`)) } }
export class BusEventResolver implements EventResolver { constructor(private readonly bus: EventBus) {} async resolve(request: BrainRequest) { return this.bus.history(request.correlationId) } }
export class AllowListPermissionResolver implements PermissionResolver {
  async resolve(identity: BrainIdentityContext): Promise<PermissionDecision> {
    const scoped = Boolean(identity.workspaceId && identity.organizationId && identity.userId);
    return { allowed: scoped, permissions: identity.permissions, reasons: scoped ? [] : ["User, workspace, and organization context are required."] };
  }
}
export class EngineRecommendationResolver implements RecommendationResolver { constructor(private readonly engine: RecommendationEngine) {} async resolve(types: Parameters<RecommendationResolver["resolve"]>[0], target?: Parameters<RecommendationResolver["resolve"]>[1]) { if (!target) return []; return (await Promise.all(types.map(type => this.engine.recommend(type, target)))).flat() } }
export class EnginePredictionResolver implements PredictionResolver { constructor(private readonly engine: PredictionEngine) {} async resolve(types: Parameters<PredictionResolver["resolve"]>[0], target?: Parameters<PredictionResolver["resolve"]>[1]) { return Promise.all(types.map(type => this.engine.predict(type, target))) } }
export class ProviderAnalyticsResolver implements AnalyticsResolver { constructor(private readonly provider: AnalyticsProvider) {} async resolve(query?: AnalyticsQuery) { return query ? this.provider.query(query) : undefined } }

