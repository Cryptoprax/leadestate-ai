import type {
  Campaign,
  ConversationRow,
  ConversationTimelineItem,
  HubNotification,
  CommunicationAttachment,
  InternalNote,
} from "../domain/models";
export interface CommunicationsRepository {
  readonly provider: "supabase" | "aurora";
  conversations(): Promise<readonly ConversationRow[]>;
  timeline(): Promise<readonly ConversationTimelineItem[]>;
  campaigns(): Promise<readonly Campaign[]>;
  notifications(): Promise<readonly HubNotification[]>;
  attachments(): Promise<readonly CommunicationAttachment[]>;
  notes(): Promise<readonly InternalNote[]>;
}
export interface CommunicationsConnectorProvider {
  readonly provider: "whatsapp-cloud" | "gmail" | "outlook" | "microsoft-365" | "sms" | "voice";
  capabilities(): Readonly<{ inbound: boolean; drafts: boolean; liveDelivery: false }>;
  prepareDraft(input: Readonly<{ conversationId: string; body: string }>): Readonly<{ state: "draft"; approvalRequired: true }>;
}
