import type { CalendarSnapshot, ScheduleEvent } from "../domain/models";

export type CalendarView = "day" | "week" | "month" | "agenda";

export interface CalendarViewModel {
  readonly events: readonly ScheduleEvent[];
  readonly title: string;
  readonly emptyMessage: string;
}

export function toCalendarView(
  snapshot: CalendarSnapshot,
  view: CalendarView,
  now = new Date(),
): CalendarViewModel {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  if (view === "day") end.setDate(end.getDate() + 1);
  else if (view === "week") end.setDate(end.getDate() + 7);
  else if (view === "month") end.setMonth(end.getMonth() + 1);
  const events =
    view === "agenda"
      ? snapshot.events
      : snapshot.events.filter((event) => {
          const time = Date.parse(event.startsAt);
          return time >= start.getTime() && time < end.getTime();
        });
  return {
    events,
    title:
      view === "agenda"
        ? "Scheduling agenda"
        : `${view[0]!.toUpperCase()}${view.slice(1)} schedule`,
    emptyMessage: `No ${view} items are available.`,
  };
}

export function schedulingAnalytics(
  snapshot: CalendarSnapshot,
  now = new Date(),
) {
  const today = now.toISOString().slice(0, 10),
    tasks = snapshot.events.filter(
      (item) => item.type === "internal-task" || item.type === "follow-up",
    ),
    completed = tasks.filter((item) => item.status === "completed").length,
    meetings = snapshot.events.filter((item) => item.type === "meeting");
  return [
    [
      "Meetings Today",
      meetings.filter((item) => item.startsAt.startsWith(today)).length,
    ],
    [
      "Site Visits",
      snapshot.events.filter((item) => item.type === "site-visit").length,
    ],
    [
      "Completion Rate",
      tasks.length
        ? `${Math.round((completed / tasks.length) * 100)}%`
        : "Awaiting data",
    ],
    ["Tasks Due", tasks.filter((item) => item.status !== "completed").length],
    [
      "Upcoming Work",
      snapshot.events.filter(
        (item) => Date.parse(item.startsAt) >= now.getTime(),
      ).length,
    ],
    [
      "Average Meeting Duration",
      meetings.length
        ? `${Math.round(meetings.reduce((sum, item) => sum + item.durationMinutes, 0) / meetings.length)} min`
        : "Awaiting data",
    ],
  ] as const;
}
