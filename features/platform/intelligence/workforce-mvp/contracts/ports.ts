import type { BrainGateway } from "../../brain/gateway/brain-gateway";
import type { CognitiveEngine } from "../../cognitive/contracts/ports";
import type { AdvisorRequest, AdvisorResponse, AdvisorType, ConversationMessage, RecommendationTimelineEntry } from "../domain/contracts";
export interface AdvisorDependencies { brain: BrainGateway; cognitive: CognitiveEngine }
export interface WorkforceAdvisor { readonly type: AdvisorType; advise(request: AdvisorRequest): Promise<AdvisorResponse> }
export interface AdvisorRegistry { resolve(type: AdvisorType): WorkforceAdvisor; list(): readonly WorkforceAdvisor[] }
export interface WorkforceStorage { messages(advisor: AdvisorType): readonly ConversationMessage[]; appendMessage(message: ConversationMessage): void; timeline(advisor: AdvisorType): readonly RecommendationTimelineEntry[]; appendRecommendation(entry: RecommendationTimelineEntry): void }

