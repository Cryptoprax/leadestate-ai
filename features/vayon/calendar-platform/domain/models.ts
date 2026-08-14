export type ScheduleEventType =
  | "meeting"
  | "site-visit"
  | "follow-up"
  | "phone-call"
  | "reminder"
  | "internal-task"
  | "deadline"
  | "ai-recommendation";

export type ScheduleStatus =
  "pending" | "scheduled" | "in-progress" | "completed" | "cancelled";
export type SchedulePriority = "low" | "medium" | "high" | "critical";

export interface ScheduleEvent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly type: ScheduleEventType;
  readonly status: ScheduleStatus;
  readonly priority: SchedulePriority;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly durationMinutes: number;
  readonly location?: string;
  readonly customer?: string;
  readonly property?: string;
  readonly deal?: string;
  readonly assignedHuman?: string;
  readonly assignedAI?: string;
  readonly workflow?: string;
  readonly approval: "required" | "pending" | "approved" | "rejected";
  readonly timeline?: string;
  readonly conversation?: string;
  readonly notification?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface MeetingWorkspace {
  readonly event: ScheduleEvent;
  readonly customerSummary: string;
  readonly propertySummary: string;
  readonly dealSummary: string;
  readonly agenda: readonly string[];
  readonly attachments: readonly string[];
  readonly notes: string;
  readonly relatedCommunications: readonly string[];
  readonly workflowStatus: string;
  readonly reminderStatus: string;
}

export interface SiteVisitDetail {
  readonly event: ScheduleEvent;
  readonly address: string;
  readonly buyer: string;
  readonly agent: string;
  readonly checklist: readonly string[];
  readonly travelNotes: string;
  readonly documents: readonly string[];
}

export interface ScheduleReminder {
  readonly id: string;
  readonly eventId: string;
  readonly kind:
    "meeting" | "task" | "follow-up" | "site-visit" | "deal" | "workflow";
  readonly dueAt: string;
  readonly status: "queued" | "triggered" | "dismissed";
  readonly title: string;
}

export interface ScheduleConflict {
  readonly id: string;
  readonly firstEventId: string;
  readonly secondEventId: string;
  readonly reason: string;
  readonly severity: "warning" | "critical";
}

export interface ScheduleNotification {
  readonly id: string;
  readonly kind:
    | "upcoming-meeting"
    | "task-due"
    | "missed-meeting"
    | "reminder-triggered"
    | "conflict-detected";
  readonly title: string;
  readonly eventId: string;
}

export interface CalendarSnapshot {
  readonly events: readonly ScheduleEvent[];
  readonly reminders: readonly ScheduleReminder[];
  readonly conflicts: readonly ScheduleConflict[];
  readonly notifications: readonly ScheduleNotification[];
  readonly source: "supabase" | "aurora";
}

export interface SchedulingSuggestion {
  readonly kind:
    "schedule" | "conflict" | "travel" | "summary" | "follow-up" | "priority";
  readonly recommendation: string;
  readonly rationale: string;
  readonly deterministic: true;
  readonly executionAllowed: false;
}
