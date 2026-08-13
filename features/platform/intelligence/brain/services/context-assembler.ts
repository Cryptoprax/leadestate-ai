import type { MemoryScope } from "../../memory/contracts";
import type { PredictionType, RecommendationType } from "../../domain/types";
import type { BrainContext, BrainRequest } from "../domain/contracts";
import type { AnalyticsResolver, BrainContextAssembler as ContextAssemblerContract, ContextResolver, EventResolver, KnowledgeResolver, MemoryResolver, PermissionResolver, PredictionResolver, RecommendationResolver } from "../contracts/resolvers";

const memoryScopes: readonly MemoryScope[] = ["conversation", "user", "company", "property", "lead", "deal", "task", "knowledge", "session"];
const recommendationTypes: readonly RecommendationType[] = ["next-best-action", "cross-sell", "upsell", "follow-up", "property-match", "lead-match", "risk-alert", "productivity"];
const predictionTypes: readonly PredictionType[] = ["close-probability", "lead-quality", "property-demand", "revenue-forecast", "activity-forecast", "customer-churn", "marketing-performance", "completion-estimate"];

export interface ContextAssemblerDependencies { context: ContextResolver; memory: MemoryResolver; knowledge: KnowledgeResolver; events: EventResolver; permissions: PermissionResolver; recommendations: RecommendationResolver; predictions: PredictionResolver; analytics: AnalyticsResolver; clock?: () => Date }
export class DefaultBrainContextAssembler implements ContextAssemblerContract {
  constructor(private readonly dependencies: ContextAssemblerDependencies) {}
  async assemble(request: BrainRequest): Promise<BrainContext> {
    const seed = await this.dependencies.context.resolve(request);
    const objects = request.context.objects ?? seed.objects ?? (request.target ? [request.target] : []);
    const permission = await this.dependencies.permissions.resolve(seed.identity, objects);
    const [memory, knowledge, events, recommendations, predictions, analytics] = await Promise.all([
      this.dependencies.memory.resolve({ scope: memoryScopes, owner: request.target, limit: 50 }),
      this.dependencies.knowledge.resolve(objects), this.dependencies.events.resolve(request),
      permission.allowed ? this.dependencies.recommendations.resolve(recommendationTypes, request.target) : Promise.resolve([]),
      permission.allowed ? this.dependencies.predictions.resolve(predictionTypes, request.target) : Promise.resolve([]), this.dependencies.analytics.resolve(),
    ]);
    const locale = request.context.regional?.locale ?? "en";
    return { identity: { ...seed.identity, permissions: permission.allowed ? permission.permissions : [] }, regional: { locale, timezone: request.context.regional?.timezone ?? "UTC", currency: request.context.regional?.currency ?? "USD", language: request.context.regional?.language ?? locale, now: (this.dependencies.clock?.() ?? new Date()).toISOString() }, navigation: request.context.navigation ?? {}, objects, knowledge, memory, events, recommendations, predictions, analytics, featureFlags: request.context.featureFlags ?? seed.featureFlags ?? {}, plugins: request.context.plugins ?? seed.plugins ?? [] };
  }
}
