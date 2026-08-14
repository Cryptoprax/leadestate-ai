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
    const [conversations, timeline, campaigns, notifications] =
      await Promise.all([
        this.repository.conversations(),
        this.repository.timeline(),
        this.repository.campaigns(),
        this.repository.notifications(),
      ]);
    const pendingDrafts = timeline.filter((x) => x.state === "draft").length,
      pendingApprovals = timeline.filter(
        (x) => x.state === "pending-approval",
      ).length,
      unread = conversations.reduce(
        (count, item) => count + item.unreadCount,
        0,
      );
    return {
      conversations,
      timeline,
      templates,
      campaigns,
      notifications,
      observability: [
        { label: "Inbox Health", value: "Deterministic", available: true },
        {
          label: "Pending Drafts",
          value: String(pendingDrafts),
          available: true,
        },
        {
          label: "Pending Approvals",
          value: String(pendingApprovals),
          available: true,
        },
        {
          label: "Unread Conversations",
          value: String(unread),
          available: true,
        },
        {
          label: "Average Response Time",
          value: "Awaiting data",
          available: false,
        },
        {
          label: "Queue Length",
          value: String(pendingDrafts + pendingApprovals),
          available: true,
        },
        {
          label: "Provider Health",
          value: "No live providers",
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
        (!query.unreadOnly || item.unreadCount > 0),
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
      },
    };
  }
}
export const defaultInboxQuery: InboxQuery = {
  sort: "recent",
  page: 1,
  pageSize: 25,
};
