import { Activity } from "lucide-react";

import type { ActivityEvent } from "../types/activity";

export function TimelineItem({ event }: { event: ActivityEvent }) {
  return (
    <li className="relative grid gap-3 pb-7 pl-12 sm:grid-cols-[1fr_auto] sm:gap-6">
      <span className="absolute left-[1.15rem] top-10 h-[calc(100%-1.5rem)] w-px bg-white/[0.07] last:hidden" />
      <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0b1119] text-cyan-300">
        <Activity className="size-3.5" aria-hidden="true" />
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-200">{event.title}</h3>
          <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-slate-600">
            {event.category}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-5 text-slate-600">
          {event.description}
        </p>
        <p className="mt-2 text-[10px] text-slate-700">
          {event.actor} · {event.organization}
        </p>
      </div>
      <time className="text-[10px] text-slate-700">
        {event.date} · {event.time}
      </time>
    </li>
  );
}
