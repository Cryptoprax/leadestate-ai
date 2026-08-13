import type { WorkforceStorage } from "../contracts/ports";
import type { AdvisorType, ConversationMessage, RecommendationTimelineEntry } from "../domain/contracts";
export class InMemoryWorkforceStorage implements WorkforceStorage {
  private conversation: ConversationMessage[] = []; private recommendations: RecommendationTimelineEntry[] = [];
  messages(advisor: AdvisorType) { return this.conversation.filter(item => item.advisor === advisor) }
  appendMessage(message: ConversationMessage) { this.conversation = [...this.conversation, message] }
  timeline(advisor: AdvisorType) { return this.recommendations.filter(item => item.advisor === advisor) }
  appendRecommendation(entry: RecommendationTimelineEntry) { this.recommendations = [...this.recommendations, entry] }
}

