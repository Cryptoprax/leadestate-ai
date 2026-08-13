import { Activity } from "lucide-react";

import type { ActivityEvent } from "../types/activity";

export function TimelineItem({ event }: { event: ActivityEvent }) {
  return (
    <li className="relative grid gap-3 pb-7 pl-12 sm:grid-cols-[1fr_auto] sm:gap-6">
      <span className="absolute left-[1.15rem] top-10 h-[calc(100%-1.5rem)] w-px bg-vds-surface/[0.07] last:hidden" />
      <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-xl border border-vds-border/[0.08] bg-[var(--vds-color-surface)] text-vds-primary">
        <Activity className="size-3.5" aria-hidden="true" />
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-vds-secondary">{event.title}</h3>
          <span className="rounded-md bg-vds-surface/[0.04] px-1.5 py-0.5 text-[9px] text-vds-subtle">
            {event.category}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-5 text-vds-subtle">
          {event.description}
        </p>
        <p className="mt-2 text-[10px] text-vds-subtle">
          {event.actor} · {event.organization}
        </p>
      </div>
      <time className="text-[10px] text-vds-subtle">
        {event.date} · {event.time}
      </time>
    </li>
  );
}
