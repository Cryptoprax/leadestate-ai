import {
  auroraBusinessActivity,
  auroraContacts,
  auroraEmployees,
} from "@/features/vayon/demo-workspace";
import type { CommunicationsRepository } from "../contracts/repository";
import type {
  Campaign,
  Channel,
  ConversationRow,
  ConversationTimelineItem,
} from "../domain/models";
const channel = (value: string): Channel =>
  value === "phone-call"
    ? "phone"
    : value === "internal-note"
      ? "internal-note"
      : (value as Channel);
export class AuroraCommunicationsRepository implements CommunicationsRepository {
  readonly provider = "aurora" as const;
  async conversations() {
    return auroraBusinessActivity.communications
      .slice(-80)
      .reverse()
      .map((item): ConversationRow => ({
        id: item.id,
        subject: item.subject,
        customer:
          auroraContacts.find((value) => value.id === item.contactId)?.name ??
          item.contactId,
        leadId: item.leadId,
        crmRecord: `lead:${item.leadId}`,
        channel: channel(item.channel),
        assignedHuman:
          auroraEmployees.find((value) => value.id === item.employeeId)?.name ??
          item.employeeId,
        assignedAI: "CRM AI",
        priority: "normal",
        status: "open",
        unreadCount: item.direction === "inbound" ? 1 : 0,
        pinned: false,
        archived: false,
        dealId: item.dealId,
        opportunityId: item.dealId,
        tags: item.direction === "inbound" ? ["customer"] : ["follow-up"],
        aiDraftPending: item.direction === "inbound",
        closed: false,
        linkedTasks: [],
        lastActivityAt: item.occurredAt,
      }));
  }
  async timeline() {
    return auroraBusinessActivity.communications
      .slice(-160)
      .map((item): ConversationTimelineItem => ({
        id: item.id,
        conversationId: item.id,
        kind:
          item.channel === "phone-call"
            ? "call"
            : item.channel === "internal-note"
              ? "note"
              : "message",
        channel: channel(item.channel),
        state: item.direction === "outbound" ? "sent" : "read",
        title: item.subject,
        body: item.preview,
        direction: item.direction,
        occurredAt: item.occurredAt,
      }));
  }
  async campaigns() {
    return auroraBusinessActivity.campaigns
      .slice(-30)
      .reverse()
      .map((item): Campaign => ({
        id: item.id,
        name: item.name,
        status:
          item.status === "active"
            ? "running"
            : item.status === "planned" || item.status === "paused"
              ? "scheduled"
              : item.status,
        audience: item.targetAudience,
        progress:
          item.status === "completed"
            ? "Completed"
            : "Awaiting connected delivery data",
        estimatedReach: "Awaiting connected delivery data",
        approvalStatus:
          item.status === "draft"
            ? "Approval required"
            : "Demo architecture state",
      }));
  }
  async notifications() {
    return [];
  }
  async attachments() {
    return [
      { id: "attachment-aurora-1", conversationId: auroraBusinessActivity.communications.at(-1)?.id ?? "demo", name: "Aurora Heights brochure.pdf", kind: "brochure" as const, contentType: "application/pdf", sizeBytes: 2480000, permission: "conversation-members" as const },
      { id: "attachment-aurora-2", conversationId: auroraBusinessActivity.communications.at(-2)?.id ?? "demo", name: "Tower B floor plan.pdf", kind: "floor-plan" as const, contentType: "application/pdf", sizeBytes: 932000, permission: "conversation-members" as const },
    ];
  }
  async notes() {
    return [{ id: "note-aurora-1", conversationId: auroraBusinessActivity.communications.at(-1)?.id ?? "demo", body: "Customer prefers a weekend site visit and a north-facing residence.", author: "Priya Shah", pinned: true, mentions: ["Arjun Rao"], attachmentIds: [], createdAt: "2026-08-22T09:30:00.000Z" }];
  }
}
