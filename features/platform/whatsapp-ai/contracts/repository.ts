import type{WhatsAppAIRecommendation,WhatsAppConversationIntelligence,WhatsAppAIObservability}from"../types";
export interface WhatsAppAIEvidence{readonly conversations:readonly WhatsAppConversationIntelligence[];readonly recommendations:readonly WhatsAppAIRecommendation[];readonly timeline:readonly{id:string;title:string;occurredAt:string}[];readonly responseMinutes:readonly number[];readonly observability:WhatsAppAIObservability;}
export interface WhatsAppAIRepositoryContract{evidence():Promise<WhatsAppAIEvidence>}
