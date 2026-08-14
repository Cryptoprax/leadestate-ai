import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { CalendarRepository } from "../contracts/repository";
import type {
  CalendarSnapshot,
  MeetingWorkspace,
  ScheduleEvent,
  ScheduleNotification,
  SchedulingSuggestion,
  SiteVisitDetail,
} from "../domain/models";
import { AuroraCalendarRepository } from "../repositories/aurora.repository";
import { SupabaseCalendarRepository } from "../repositories/supabase.repository";

export const schedulingGovernance = {
  stages: ["Draft", "Approval Engine", "Execution Request", "Timeline"],
  externalSchedulingAllowed: false,
  approvalRequired: true,
} as const;

export class CalendarPlatformService {
  constructor(private readonly repository: CalendarRepository) {}
  static async production() {
    const context = await operationsContext();
    return new CalendarPlatformService(
      new SupabaseCalendarRepository(
        context.client,
        context.organizationId,
        context.workspaceId,
      ),
    );
  }
  static demo() {
    return new CalendarPlatformService(new AuroraCalendarRepository());
  }
  async snapshot(): Promise<CalendarSnapshot> {
    const events = await this.repository.events();
    const [reminders, conflicts] = await Promise.all([
      this.repository.reminders(),
      this.repository.conflicts(events),
    ]);
    return {
      events,
      reminders,
      conflicts,
      notifications: notifications(events, reminders.length, conflicts),
      source: this.repository.provider,
    };
  }
  async meeting(id: string): Promise<MeetingWorkspace | null> {
    const event = (await this.repository.events()).find(
      (item) => item.id === id && item.type === "meeting",
    );
    if (!event) return null;
    return {
      event,
      customerSummary: event.customer ?? "Customer context unavailable.",
      propertySummary: event.property ?? "Property context unavailable.",
      dealSummary: event.deal ?? "Deal context unavailable.",
      agenda: [],
      attachments: [],
      notes: "No meeting notes recorded.",
      relatedCommunications: event.conversation ? [event.conversation] : [],
      workflowStatus: event.workflow ?? "No linked workflow.",
      reminderStatus: event.notification ?? "No linked reminder.",
    };
  }
  async siteVisit(id: string): Promise<SiteVisitDetail | null> {
    const event = (await this.repository.events()).find(
      (item) => item.id === id && item.type === "site-visit",
    );
    return event
      ? {
          event,
          address: event.location ?? "Address unavailable.",
          buyer: event.customer ?? "Buyer unavailable.",
          agent: event.assignedHuman ?? "Agent unassigned.",
          checklist: [],
          travelNotes: "No travel notes recorded.",
          documents: [],
        }
      : null;
  }
  assistance(event: ScheduleEvent): readonly SchedulingSuggestion[] {
    return [
      {
        kind: "schedule",
        recommendation: "Review the proposed time before approval.",
        rationale: `The event currently starts at ${event.startsAt}.`,
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "travel",
        recommendation: event.location
          ? "Prepare travel details before the event."
          : "Add a location before travel preparation.",
        rationale: event.location
          ? "A location is attached."
          : "No location is attached.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "follow-up",
        recommendation: "Prepare a governed follow-up draft after completion.",
        rationale: "Follow-ups require human approval and remain unsent.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "priority",
        recommendation:
          event.priority === "critical"
            ? "Place this item at the top of the review queue."
            : "Retain the current review order.",
        rationale: `Current priority is ${event.priority}.`,
        deterministic: true,
        executionAllowed: false,
      },
    ];
  }
}

function notifications(
  events: readonly ScheduleEvent[],
  reminderCount: number,
  conflicts: CalendarSnapshot["conflicts"],
): ScheduleNotification[] {
  const result: ScheduleNotification[] = conflicts.map((item) => ({
    id: `notification-${item.id}`,
    kind: "conflict-detected",
    title: item.reason,
    eventId: item.firstEventId,
  }));
  if (reminderCount > 0 && events[0])
    result.push({
      id: "notification-reminder-queue",
      kind: "reminder-triggered",
      title: `${reminderCount} deterministic reminders are queued.`,
      eventId: events[0].id,
    });
  return result;
}
