import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  ["Overview", "/vayon/calendar"],
  ["Day", "/vayon/calendar/day"],
  ["Week", "/vayon/calendar/week"],
  ["Month", "/vayon/calendar/month"],
  ["Agenda", "/vayon/calendar/agenda"],
  ["Meetings", "/vayon/calendar/meetings"],
  ["Site visits", "/vayon/calendar/site-visits"],
  ["Tasks", "/vayon/calendar/tasks"],
  ["Reminders", "/vayon/calendar/reminders"],
] as const;

export function CalendarShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Calendar workspace"
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
      >
        {navigation.map(([label, href]) => (
          <Link
            className="shrink-0 rounded-full border border-vds-border bg-vds-surface px-4 py-2 text-sm text-vds-muted transition hover:text-vds-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-vds-focus"
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
