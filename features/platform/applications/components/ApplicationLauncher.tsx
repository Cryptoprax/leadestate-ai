"use client";

import { ArrowUpRight, Download } from "lucide-react";

import type { PlatformApplication } from "../types/application";

export interface ApplicationLauncherProps {
  application: PlatformApplication;
  compact?: boolean;
}

export function ApplicationLauncher({
  application,
  compact = false,
}: ApplicationLauncherProps) {
  const label = application.installed ? "Launch" : "Install";
  const Icon = application.installed ? ArrowUpRight : Download;

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
        application.installed
          ? "border-white/10 bg-white/[0.07] text-white hover:border-white/20 hover:bg-white/[0.11]"
          : "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200 hover:bg-cyan-300/[0.13]"
      } ${compact ? "size-8" : "h-10 px-4 text-xs"}`}
      aria-label={`${label} ${application.name}`}
    >
      {!compact ? label : null}
      <Icon className="size-3.5" aria-hidden="true" />
    </button>
  );
}
