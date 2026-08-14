import type {
  ScheduleConflict,
  ScheduleEvent,
  ScheduleReminder,
} from "../domain/models";

export interface CalendarRepository {
  readonly provider: "supabase" | "aurora";
  events(): Promise<readonly ScheduleEvent[]>;
  reminders(): Promise<readonly ScheduleReminder[]>;
  conflicts(
    events: readonly ScheduleEvent[],
  ): Promise<readonly ScheduleConflict[]>;
}

export interface SchedulingGovernance {
  readonly stages: readonly [
    "Draft",
    "Approval Engine",
    "Execution Request",
    "Timeline",
  ];
  readonly externalSchedulingAllowed: false;
  readonly approvalRequired: true;
}
