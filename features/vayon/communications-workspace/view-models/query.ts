import { defaultInboxQuery } from "../services/communications.service";
import type { Channel, InboxQuery } from "../domain/models";
export function toInboxQuery(
  input: Record<string, string | string[] | undefined>,
): InboxQuery {
  const value = (key: string) =>
      typeof input[key] === "string" ? (input[key] as string) : undefined,
    page = Number(value("page")),
    pageSize = Number(value("pageSize")),
    sort = value("sort"),
    channel = value("channel");
  return {
    search: value("search"),
    channel: [
      "whatsapp",
      "email",
      "sms",
      "phone",
      "internal-note",
      "system-notification",
    ].includes(channel ?? "")
      ? (channel as Channel)
      : undefined,
    status: value("status"),
    unreadOnly: value("unread") === "true",
    assignedOnly: value("assigned") === "true",
    aiDraftPendingOnly: value("aiDraftPending") === "true",
    highPriorityOnly: value("highPriority") === "true",
    closedOnly: value("closed") === "true",
    archivedOnly: value("archived") === "true",
    sort:
      sort === "oldest" || sort === "unread" ? sort : defaultInboxQuery.sort,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: [10, 25, 50].includes(pageSize) ? pageSize : 25,
  };
}
