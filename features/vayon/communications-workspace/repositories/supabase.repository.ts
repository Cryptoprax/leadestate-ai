import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CommunicationsRepository } from "../contracts/repository";
import type {
  Channel,
  ConversationRow,
  ConversationTimelineItem,
  MessageState,
  CommunicationAttachment,
  InternalNote,
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
        "id,subject,related_type,related_id,status,unread_count,last_activity_at,metadata",
      )
      .eq("organization_id", this.organizationId)
      .eq("workspace_id", this.workspaceId)
      .is("deleted_at", null)
      .order("last_activity_at", { ascending: false });
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row): ConversationRow => {
      const metadata = (row.metadata ?? {}) as Row;
      return {
      id: String(row.id),
      subject: String(row.subject),
      customer: String(metadata.customer_name ?? "Customer identity unavailable"),
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
      opportunityId: typeof metadata.opportunity_id === "string" ? metadata.opportunity_id : undefined,
      projectId: typeof metadata.project_id === "string" ? metadata.project_id : undefined,
      tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : [],
      aiDraftPending: metadata.ai_draft_pending === true,
      closed: row.status === "resolved",
      linkedTasks: [],
      lastActivityAt: String(row.last_activity_at),
    };});
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
  async attachments(): Promise<readonly CommunicationAttachment[]> {
    const { data, error } = await this.client.from("communication_attachments")
      .select("id,thread_id,name,kind,content_type,size_bytes,storage_path")
      .eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId)
      .order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row) => ({ id: String(row.id), conversationId: String(row.thread_id), name: String(row.name), kind: String(row.kind) as CommunicationAttachment["kind"], contentType: String(row.content_type), sizeBytes: Number(row.size_bytes), storagePath: row.storage_path ? String(row.storage_path) : undefined, permission: "conversation-members" }));
  }
  async notes(): Promise<readonly InternalNote[]> {
    const { data, error } = await this.client.from("communication_notes")
      .select("id,thread_id,body,created_by,created_at,pinned,mentions,attachment_ids")
      .eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId)
      .is("deleted_at", null).order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row) => ({ id: String(row.id), conversationId: String(row.thread_id), body: String(row.body), author: String(row.created_by), pinned: row.pinned === true, mentions: Array.isArray(row.mentions) ? row.mentions.map(String) : [], attachmentIds: Array.isArray(row.attachment_ids) ? row.attachment_ids.map(String) : [], createdAt: String(row.created_at) }));
  }
}
