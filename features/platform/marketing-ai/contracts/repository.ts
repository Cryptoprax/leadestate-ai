import type{MarketingChannelInsight,MarketingObservability,MarketingRecommendation,MarketingSourceInsight}from"../types";
export interface MarketingEvidence{readonly leadSources:readonly MarketingSourceInsight[];readonly channels:readonly MarketingChannelInsight[];readonly recommendations:readonly MarketingRecommendation[];readonly timeline:readonly{id:string;title:string;occurredAt:string}[];readonly subscription:{status:string;plan:string|null};readonly observability:MarketingObservability;}
export type MarketingAIEvidence=MarketingEvidence;
export interface MarketingAIRepositoryContract{evidence():Promise<MarketingEvidence>}
