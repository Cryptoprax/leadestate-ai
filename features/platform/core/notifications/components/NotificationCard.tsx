import { ArrowUpRight, BellRing } from "lucide-react";

import { StatusBadge } from "../../../identity/components/StatusBadge";
import type {
  Notification,
  NotificationPriority,
} from "../types/notification";

const priorityTones: Record<
  NotificationPriority,
  "negative" | "warning" | "info" | "neutral"
> = {
  Critical: "negative",
  High: "warning",
  Normal: "info",
  Low: "neutral",
};

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <article className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-white/[0.12] hover:bg-white/[0.04]">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/[0.08] text-cyan-300">
        <BellRing className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {notification.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {notification.description}
            </p>
          </div>
          <StatusBadge
            label={notification.priority}
            tone={priorityTones[notification.priority]}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-700">
            <span>{notification.source}</span>
            <span>·</span>
            <span>{notification.time}</span>
            <span>·</span>
            <span>{notification.status}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-cyan-300/80 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            {notification.action}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
