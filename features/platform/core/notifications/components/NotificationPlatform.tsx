"use client";

import { useState } from "react";

import {
  notifications,
  notificationTabs,
} from "../config/notifications";
import type { NotificationCategory } from "../types/notification";
import { NotificationCard } from "./NotificationCard";

export function NotificationPlatform() {
  const [activeTab, setActiveTab] =
    useState<NotificationCategory>("Platform");
  const visibleNotifications = notifications.filter(
    (notification) => notification.category === activeTab,
  );

  return (
    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
      <div
        className="flex gap-1 overflow-x-auto border-b border-white/[0.07] p-2 [scrollbar-width:none]"
        role="tablist"
        aria-label="Notification categories"
      >
        {notificationTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
              activeTab === tab
                ? "bg-white/[0.08] text-white"
                : "text-slate-600 hover:bg-white/[0.03] hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-3 p-3 sm:p-4" role="tabpanel">
        {visibleNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}
