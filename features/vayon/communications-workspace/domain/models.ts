export type Channel =
  | "whatsapp"
  | "email"
  | "sms"
  | "phone"
  | "internal-note"
  | "system-notification";
export type MessageState =
  | "draft"
  | "pending-approval"
  | "scheduled"
  | "prepared"
  | "sent"
  | "delivered"
  | "read"
  | "archived";
export type TimelineKind =
  | "message"
  | "call"
  | "note"
  | "meeting"
  | "ai-recommendation"
  | "workflow-event"
  | "crm-event"
  | "provider-event";
export interface ConversationRow {
  readonly id: string;
  readonly subject: string;
  readonly customer: string;
  readonly leadId?: string;
  readonly crmRecord?: string;
  readonly channel: Channel;
  readonly assignedHuman: string;
  readonly assignedAI: string;
  readonly priority: "low" | "normal" | "high" | "urgent";
  readonly status: string;
  readonly unreadCount: number;
  readonly pinned: boolean;
  readonly archived: boolean;
  readonly dealId?: string;
  readonly propertyId?: string;
  readonly opportunityId?: string;
  readonly projectId?: string;
  readonly workflowId?: string;
  readonly tags: readonly string[];
  readonly aiDraftPending: boolean;
  readonly closed: boolean;
  readonly linkedTasks: readonly string[];
  readonly lastActivityAt: string;
}
export interface CommunicationAttachment {
  readonly id: string;
  readonly conversationId: string;
  readonly name: string;
  readonly kind: "image" | "pdf" | "brochure" | "floor-plan" | "contract" | "video-placeholder";
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly storagePath?: string;
  readonly permission: "conversation-members";
}
export interface InternalNote {
  readonly id: string;
  readonly conversationId: string;
  readonly body: string;
  readonly author: string;
  readonly pinned: boolean;
  readonly mentions: readonly string[];
  readonly attachmentIds: readonly string[];
  readonly createdAt: string;
}
export interface CommunicationProviderCapability {
  readonly channel: Channel;
  readonly provider: "whatsapp-cloud" | "gmail" | "outlook" | "microsoft-365" | "sms" | "voice";
  readonly mode: "architecture-ready";
  readonly inbound: boolean;
  readonly drafts: boolean;
  readonly liveDelivery: false;
  readonly health: "not-connected";
}
export interface ConversationTimelineItem {
  readonly id: string;
  readonly conversationId: string;
  readonly kind: TimelineKind;
  readonly channel: Channel;
  readonly state: MessageState;
  readonly title: string;
  readonly body: string;
  readonly direction: "inbound" | "outbound" | "internal";
  readonly occurredAt: string;
}
export interface ConversationDetail {
  readonly conversation: ConversationRow;
  readonly timeline: readonly ConversationTimelineItem[];
  readonly attachments: readonly CommunicationAttachment[];
  readonly notes: readonly InternalNote[];
  readonly crm: {
    readonly customerSummary: string;
    readonly leadScore: string;
    readonly currentDeals: string;
    readonly properties: string;
    readonly recentActivity: string;
    readonly upcomingMeetings: string;
  };
  readonly ai: {
    readonly assignedEmployee: string;
    readonly lastRecommendation: string;
    readonly confidence: string;
    readonly reviewTime: string;
    readonly memorySnapshot: string;
  };
  readonly intelligence: {
    readonly summary: string;
    readonly suggestedReply: string;
    readonly suggestedFollowUp: string;
    readonly sentiment: "positive" | "neutral" | "negative" | "unavailable";
    readonly risk: string;
    readonly nextAction: string;
    readonly generatedBy: "deterministic-rules";
    readonly recommendationOnly: true;
    readonly actionItems: readonly string[];
    readonly urgency: "low" | "normal" | "high";
  };
}
export interface CommunicationTemplate {
  readonly id: string;
  readonly category:
    | "Welcome"
    | "Follow-up"
    | "Site Visit"
    | "Offer"
    | "Negotiation"
    | "Appointment"
    | "Payment Reminder"
    | "Documents";
  readonly name: string;
  readonly channel: Channel;
  readonly body: string;
  readonly readOnly: true;
}
export interface Campaign {
  readonly id: string;
  readonly name: string;
  readonly status:
    "draft" | "scheduled" | "running" | "completed" | "cancelled";
  readonly audience: string;
  readonly progress: string;
  readonly estimatedReach: string;
  readonly approvalStatus: string;
}
export interface HubNotification {
  readonly id: string;
  readonly type:
    | "Workflow Approved"
    | "Workflow Rejected"
    | "Approval Pending"
    | "Meeting Reminder"
    | "Task Assigned"
    | "Provider Offline"
    | "Conversation Waiting"
    | "AI Recommendation";
  readonly title: string;
  readonly href: string;
  readonly occurredAt: string;
}
export interface InboxQuery {
  readonly search?: string;
  readonly channel?: Channel;
  readonly status?: string;
  readonly unreadOnly?: boolean;
  readonly assignedOnly?: boolean;
  readonly aiDraftPendingOnly?: boolean;
  readonly highPriorityOnly?: boolean;
  readonly closedOnly?: boolean;
  readonly archivedOnly?: boolean;
  readonly sort: "recent" | "oldest" | "unread";
  readonly page: number;
  readonly pageSize: number;
}
export interface CommunicationsSnapshot {
  readonly conversations: readonly ConversationRow[];
  readonly timeline: readonly ConversationTimelineItem[];
  readonly templates: readonly CommunicationTemplate[];
  readonly campaigns: readonly Campaign[];
  readonly notifications: readonly HubNotification[];
  readonly attachments: readonly CommunicationAttachment[];
  readonly notes: readonly InternalNote[];
  readonly providers: readonly CommunicationProviderCapability[];
  readonly reports: readonly { readonly label: string; readonly value: string }[];
  readonly observability: readonly {
    readonly label: string;
    readonly value: string;
    readonly available: boolean;
  }[];
}
