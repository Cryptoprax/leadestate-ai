import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { CommunicationsRepository } from "../contracts/repository";
import type {
  CommunicationTemplate,
  ConversationDetail,
  InboxQuery,
} from "../domain/models";
import { AuroraCommunicationsRepository } from "../repositories/aurora.repository";
import { SupabaseCommunicationsRepository } from "../repositories/supabase.repository";
import { communicationConnectors } from "../providers/connector.provider";
const categories = [
  "Welcome",
  "Follow-up",
  "Site Visit",
  "Offer",
  "Negotiation",
  "Appointment",
  "Payment Reminder",
  "Documents",
] as const;
const templates: readonly CommunicationTemplate[] = categories.map(
  (category, index) => ({
    id: `template-${index + 1}`,
    category,
    name: `${category} template`,
    channel: index % 3 === 0 ? "whatsapp" : index % 3 === 1 ? "email" : "sms",
    body: `${category} communication draft. Review customer context and obtain approval before preparation.`,
    readOnly: true,
  }),
);
export class CommunicationsWorkspaceService {
  constructor(private repository: CommunicationsRepository) {}
  static async production() {
    const c = await operationsContext();
    return new CommunicationsWorkspaceService(
      new SupabaseCommunicationsRepository(
        c.client,
        c.organizationId,
        c.workspaceId,
      ),
    );
  }
  static demo() {
    return new CommunicationsWorkspaceService(
      new AuroraCommunicationsRepository(),
    );
  }
  async snapshot() {
    const [conversations, timeline, campaigns, notifications, attachments, notes] =
      await Promise.all([
        this.repository.conversations(),
        this.repository.timeline(),
        this.repository.campaigns(),
        this.repository.notifications(),
        this.repository.attachments(),
        this.repository.notes(),
      ]);
    const pendingDrafts = timeline.filter((x) => x.state === "draft").length,
      unread = conversations.reduce(
        (count, item) => count + item.unreadCount,
        0,
      );
    const open = conversations.filter((item) => !item.closed && !item.archived).length,
      resolvedToday = conversations.filter((item) => item.closed && item.lastActivityAt.slice(0, 10) === new Date().toISOString().slice(0, 10)).length,
      channelCounts = new Map<string, number>();
    conversations.forEach((item) => channelCounts.set(item.channel, (channelCounts.get(item.channel) ?? 0) + 1));
    return {
      conversations,
      timeline,
      templates,
      campaigns,
      notifications,
      attachments,
      notes,
      providers: communicationConnectors.map((connector) => ({
        channel: connector.provider === "whatsapp-cloud" ? "whatsapp" as const : connector.provider === "gmail" || connector.provider === "outlook" || connector.provider === "microsoft-365" ? "email" as const : connector.provider === "voice" ? "phone" as const : "sms" as const,
        provider: connector.provider,
        mode: "architecture-ready" as const,
        ...connector.capabilities(),
        health: "not-connected" as const,
      })),
      reports: [
        { label: "Messages by channel", value: [...channelCounts].map(([key, value]) => `${key}: ${value}`).join(" · ") || "No messages" },
        { label: "Average response time", value: "Unavailable until provider timestamps are connected" },
        { label: "Agent productivity", value: `${new Set(conversations.map((item) => item.assignedHuman).filter((item) => item !== "Unassigned")).size} assigned agents` },
        { label: "Conversation volume", value: String(conversations.length) },
        { label: "Resolution rate", value: conversations.length ? `${Math.round((conversations.filter((item) => item.closed).length / conversations.length) * 100)}%` : "Unavailable" },
        { label: "AI draft usage", value: `${conversations.filter((item) => item.aiDraftPending).length} pending` },
      ],
      observability: [
        { label: "Open Conversations", value: String(open), available: true },
        {
          label: "Pending Drafts",
          value: String(pendingDrafts),
          available: true,
        },
        {
          label: "Resolved Today",
          value: String(resolvedToday),
          available: true,
        },
        {
          label: "Unread",
          value: String(unread),
          available: true,
        },
        {
          label: "Response Time",
          value: "Awaiting data",
          available: false,
        },
        {
          label: "Pending AI Drafts",
          value: String(conversations.filter((item) => item.aiDraftPending).length),
          available: true,
        },
        {
          label: "Conversations by Channel",
          value: String(channelCounts.size),
          available: true,
        },
        {
          label: "Agent Workload",
          value: `${open} open`,
          available: true,
        },
      ],
    };
  }
  async inbox(query: InboxQuery) {
    const snapshot = await this.snapshot(),
      term = query.search?.trim().toLowerCase();
    let items = snapshot.conversations.filter(
      (item) =>
        (!term ||
          [item.subject, item.customer, item.crmRecord ?? ""].some((value) =>
            value.toLowerCase().includes(term),
          )) &&
        (!query.channel || item.channel === query.channel) &&
        (!query.status || item.status === query.status) &&
        (!query.unreadOnly || item.unreadCount > 0) &&
        (!query.assignedOnly || item.assignedHuman !== "Unassigned") &&
        (!query.aiDraftPendingOnly || item.aiDraftPending) &&
        (!query.highPriorityOnly || item.priority === "high" || item.priority === "urgent") &&
        (!query.closedOnly || item.closed) &&
        (!query.archivedOnly || item.archived),
    );
    items = [...items].sort((a, b) =>
      query.sort === "oldest"
        ? a.lastActivityAt.localeCompare(b.lastActivityAt)
        : query.sort === "unread"
          ? b.unreadCount - a.unreadCount
          : b.lastActivityAt.localeCompare(a.lastActivityAt),
    );
    const start = (query.page - 1) * query.pageSize;
    return {
      items: items.slice(start, start + query.pageSize),
      count: items.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }
  async conversation(id: string): Promise<ConversationDetail | null> {
    const snapshot = await this.snapshot(),
      conversation = snapshot.conversations.find((item) => item.id === id);
    if (!conversation) return null;
    const timeline = snapshot.timeline.filter(
        (item) => item.conversationId === id,
      ),
      last = timeline.at(-1);
    return {
      conversation,
      timeline,
      attachments: snapshot.attachments.filter((item) => item.conversationId === id),
      notes: snapshot.notes.filter((item) => item.conversationId === id),
      crm: {
        customerSummary: conversation.crmRecord
          ? `Linked to ${conversation.crmRecord}. Open CRM for authoritative context.`
          : "CRM context unavailable.",
        leadScore: "Available in linked CRM record",
        currentDeals: conversation.dealId ?? "No linked deal",
        properties: conversation.propertyId ?? "No linked property",
        recentActivity: last?.title ?? "No recent activity",
        upcomingMeetings: "Awaiting connected calendar data",
      },
      ai: {
        assignedEmployee: conversation.assignedAI,
        lastRecommendation: conversation.unreadCount
          ? "Review the unread conversation and prepare a governed reply."
          : "No recommendation required.",
        confidence: conversation.unreadCount
          ? "Deterministic · high"
          : "Deterministic · normal",
        reviewTime: "Human review required",
        memorySnapshot: "Uses supplied conversation context only.",
      },
      intelligence: {
        summary: timeline.length
          ? `${timeline.length} recorded interaction${timeline.length === 1 ? "" : "s"} in this conversation.`
          : "No timeline interactions are available.",
        suggestedReply:
          "Review the latest message and use an approved template.",
        suggestedFollowUp: conversation.unreadCount
          ? "Prioritize human review."
          : "No immediate follow-up inferred.",
        sentiment: "unavailable",
        risk:
          conversation.unreadCount > 2
            ? "Multiple unread interactions require attention."
            : "No deterministic risk detected.",
        nextAction:
          "Create a draft, submit it for approval, then request deterministic provider preparation.",
        generatedBy: "deterministic-rules",
        recommendationOnly: true,
        actionItems: conversation.unreadCount ? ["Review unread messages", "Confirm the next customer commitment"] : [],
        urgency: conversation.priority === "urgent" || conversation.unreadCount > 2 ? "high" : conversation.unreadCount ? "normal" : "low",
      },
    };
  }
}
export const defaultInboxQuery: InboxQuery = {
  sort: "recent",
  page: 1,
  pageSize: 25,
};
