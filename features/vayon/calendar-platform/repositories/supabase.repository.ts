import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CalendarRepository } from "../contracts/repository";
import type {
  ScheduleConflict,
  ScheduleEvent,
  SchedulePriority,
  ScheduleReminder,
  ScheduleStatus,
} from "../domain/models";

const status = (value: string): ScheduleStatus =>
  value === "completed" || value === "cancelled" || value === "scheduled"
    ? value
    : value === "in_progress"
      ? "in-progress"
      : "pending";
const priority = (value?: string | null): SchedulePriority =>
  value === "critical" || value === "high" || value === "medium"
    ? value
    : "low";
const duration = (start: string, end: string) =>
  Math.max(0, Math.round((Date.parse(end) - Date.parse(start)) / 60_000));

export class SupabaseCalendarRepository implements CalendarRepository {
  readonly provider = "supabase" as const;
  constructor(
    private readonly client: SupabaseClient,
    private readonly organizationId: string,
    private readonly workspaceId: string,
  ) {}
  async events(): Promise<readonly ScheduleEvent[]> {
    const [meetings, tasks, visits] = await Promise.all([
      this.client
        .from("meetings")
        .select(
          "id,title,meeting_type,starts_at,ends_at,status,related_type,related_id,created_at,updated_at",
        )
        .eq("organization_id", this.organizationId)
        .eq("workspace_id", this.workspaceId)
        .is("deleted_at", null),
      this.client
        .from("tasks")
        .select(
          "id,title,description,status,priority,due_at,related_type,related_id,created_at,updated_at",
        )
        .eq("organization_id", this.organizationId)
        .eq("workspace_id", this.workspaceId)
        .is("deleted_at", null),
      this.client
        .from("site_visits")
        .select(
          "id,property_id,lead_id,assigned_agent_id,starts_at,status,notes,created_at,updated_at",
        )
        .eq("organization_id", this.organizationId)
        .eq("workspace_id", this.workspaceId)
        .is("deleted_at", null),
    ]);
    for (const result of [meetings, tasks, visits])
      if (result.error) throw result.error;
    const now = new Date().toISOString();
    return [
      ...(meetings.data ?? []).map((row): ScheduleEvent => ({
        id: row.id,
        title: row.title,
        type: "meeting",
        status: status(row.status),
        priority: "medium",
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        durationMinutes: duration(row.starts_at, row.ends_at),
        deal: row.related_type === "deal" ? row.related_id : undefined,
        approval: "required",
        createdAt: row.created_at ?? now,
        updatedAt: row.updated_at ?? row.created_at ?? now,
      })),
      ...(tasks.data ?? []).map((row): ScheduleEvent => ({
        id: row.id,
        title: row.title,
        description: row.description ?? undefined,
        type: "internal-task",
        status: status(row.status),
        priority: priority(row.priority),
        startsAt: row.due_at,
        endsAt: row.due_at,
        durationMinutes: 0,
        deal: row.related_type === "deal" ? row.related_id : undefined,
        approval: "required",
        createdAt: row.created_at ?? now,
        updatedAt: row.updated_at ?? row.created_at ?? now,
      })),
      ...(visits.data ?? []).map((row): ScheduleEvent => ({
        id: row.id,
        title: "Property site visit",
        description: row.notes ?? undefined,
        type: "site-visit",
        status: status(row.status),
        priority: "high",
        startsAt: row.starts_at,
        endsAt: new Date(Date.parse(row.starts_at) + 60 * 60_000).toISOString(),
        durationMinutes: 60,
        property: row.property_id,
        customer: row.lead_id ?? undefined,
        assignedHuman: row.assigned_agent_id ?? undefined,
        approval: "required",
        createdAt: row.created_at ?? now,
        updatedAt: row.updated_at ?? row.created_at ?? now,
      })),
    ].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }
  async reminders(): Promise<readonly ScheduleReminder[]> {
    return [];
  }
  async conflicts(
    events: readonly ScheduleEvent[],
  ): Promise<readonly ScheduleConflict[]> {
    return detectConflicts(events);
  }
}

export function detectConflicts(
  events: readonly ScheduleEvent[],
): ScheduleConflict[] {
  const scheduled = events
    .filter((event) => event.status !== "cancelled")
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const result: ScheduleConflict[] = [];
  for (let index = 1; index < scheduled.length; index += 1) {
    const previous = scheduled[index - 1]!,
      current = scheduled[index]!;
    if (
      Date.parse(current.startsAt) < Date.parse(previous.endsAt) &&
      (!previous.assignedHuman ||
        previous.assignedHuman === current.assignedHuman)
    )
      result.push({
        id: `conflict-${previous.id}-${current.id}`,
        firstEventId: previous.id,
        secondEventId: current.id,
        reason: "Assigned schedule windows overlap.",
        severity: "warning",
      });
  }
  return result;
}
