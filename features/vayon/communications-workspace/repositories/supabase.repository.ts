import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CommunicationsRepository } from "../contracts/repository";
import type {
  Channel,
  ConversationRow,
  ConversationTimelineItem,
  MessageState,
} from "../domain/models";
type Row = Record<string, unknown>;
const channel = (value: unknown): Channel =>
  value === "whatsapp" ||
  value === "email" ||
  value === "sms" ||
  value === "phone" ||
  value === "internal_note"
    ? (String(value).replace("_", "-") as Channel)
    : "system-notification";
const state = (value: unknown): MessageState =>
  ["draft", "scheduled", "sent", "delivered", "read", "archived"].includes(
    String(value),
  )
    ? (String(value) as MessageState)
    : String(value) === "pending_approval"
      ? "pending-approval"
      : "prepared";
export class SupabaseCommunicationsRepository implements CommunicationsRepository {
  readonly provider = "supabase" as const;
  constructor(
    private client: SupabaseClient,
    private organizationId: string,
    private workspaceId: string,
  ) {}
  async conversations() {
    const { data, error } = await this.client
      .from("communication_threads")
      .select(
        "id,subject,related_type,related_id,status,unread_count,last_activity_at",
      )
      .eq("organization_id", this.organizationId)
      .eq("workspace_id", this.workspaceId)
      .is("deleted_at", null)
      .order("last_activity_at", { ascending: false });
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row): ConversationRow => ({
      id: String(row.id),
      subject: String(row.subject),
      customer: "Customer identity unavailable",
      leadId: row.related_type === "lead" ? String(row.related_id) : undefined,
      crmRecord: row.related_id
        ? `${row.related_type}:${row.related_id}`
        : undefined,
      channel: "system-notification",
      assignedHuman: "Unassigned",
      assignedAI: "Unassigned",
      priority: "normal",
      status: String(row.status),
      unreadCount: Number(row.unread_count ?? 0),
      pinned: false,
      archived: row.status === "archived",
      linkedTasks: [],
      lastActivityAt: String(row.last_activity_at),
    }));
  }
  async timeline() {
    const { data, error } = await this.client
      .from("communications")
      .select("id,thread_id,channel,direction,status,body,occurred_at")
      .eq("organization_id", this.organizationId)
      .eq("workspace_id", this.workspaceId)
      .is("deleted_at", null)
      .order("occurred_at", { ascending: true })
      .limit(500);
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row): ConversationTimelineItem => ({
      id: String(row.id),
      conversationId: String(row.thread_id),
      kind:
        row.channel === "phone"
          ? "call"
          : row.channel === "internal_note"
            ? "note"
            : "message",
      channel: channel(row.channel),
      state: state(row.status),
      title: `${String(row.channel).replaceAll("_", " ")} ${row.direction}`,
      body: String(row.body),
      direction:
        row.direction === "inbound" || row.direction === "outbound"
          ? row.direction
          : "internal",
      occurredAt: String(row.occurred_at),
    }));
  }
  async campaigns() {
    return [];
  }
  async notifications() {
    return [];
  }
}
