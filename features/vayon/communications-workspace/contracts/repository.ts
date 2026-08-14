import type {
  Campaign,
  ConversationRow,
  ConversationTimelineItem,
  HubNotification,
} from "../domain/models";
export interface CommunicationsRepository {
  readonly provider: "supabase" | "aurora";
  conversations(): Promise<readonly ConversationRow[]>;
  timeline(): Promise<readonly ConversationTimelineItem[]>;
  campaigns(): Promise<readonly Campaign[]>;
  notifications(): Promise<readonly HubNotification[]>;
}
