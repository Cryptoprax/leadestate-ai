"use client";

import {
  Bot,
  Building2,
  CreditCard,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const tabs = ["Platform", "Organizations", "Security", "Billing", "AI"] as const;
type NotificationTab = (typeof tabs)[number];

const tabDetails: Record<
  NotificationTab,
  { title: string; description: string; icon: typeof Bot; tone: string }
> = {
  Platform: {
    title: "Platform services operational",
    description: "All core systems are reporting normal health.",
    icon: Sparkles,
    tone: "text-cyan-300 bg-cyan-300/10",
  },
  Organizations: {
    title: "Organization review ready",
    description: "A workspace configuration is ready for review.",
    icon: Building2,
    tone: "text-violet-300 bg-violet-300/10",
  },
  Security: {
    title: "Security posture updated",
    description: "The latest access review has completed.",
    icon: ShieldCheck,
    tone: "text-emerald-300 bg-emerald-300/10",
  },
  Billing: {
    title: "Billing cycle prepared",
    description: "Subscription summaries are available.",
    icon: CreditCard,
    tone: "text-amber-300 bg-amber-300/10",
  },
  AI: {
    title: "AI systems within budget",
    description: "Usage and quality controls are operating normally.",
    icon: Bot,
    tone: "text-fuchsia-300 bg-fuchsia-300/10",
  },
};

export interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationCenter({
  open,
  onClose,
}: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState<NotificationTab>("Platform");
  const detail = tabDetails[activeTab];
  const Icon = detail.icon;

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close notification center"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Notification center"
        className="fixed inset-y-2 right-2 z-50 flex w-[calc(100%-1rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a1018]/96 shadow-[0_32px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:inset-y-3 sm:right-3"
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Platform activity and attention
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            aria-label="Close notification center"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex gap-1 overflow-x-auto border-b border-white/[0.07] px-3 py-2 [scrollbar-width:none]"
          role="tablist"
          aria-label="Notification categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                activeTab === tab
                  ? "bg-white/[0.08] text-white"
                  : "text-slate-600 hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-3" role="tabpanel">
          <button
            type="button"
            className="flex w-full gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition hover:border-white/[0.12] hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${detail.tone}`}
            >
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-200">
                  {detail.title}
                </span>
                <span className="size-1.5 shrink-0 rounded-full bg-cyan-300" />
              </span>
              <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                {detail.description}
              </span>
              <span className="mt-3 block text-[10px] text-slate-700">
                A moment ago
              </span>
            </span>
          </button>
        </div>

        <div className="border-t border-white/[0.07] p-3">
          <button
            type="button"
            className="h-10 w-full rounded-xl text-xs font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            Mark all as read
          </button>
        </div>
      </section>
    </>
  );
}
