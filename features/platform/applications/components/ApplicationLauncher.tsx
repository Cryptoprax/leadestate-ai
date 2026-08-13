"use client";
import { Button } from "@/features/platform/design-system";

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
    <Button variant="control"
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus ${
        application.installed
          ? "border-vds-border bg-vds-surface/[0.07] text-vds-foreground hover:border-vds-border-strong hover:bg-vds-surface/[0.11]"
          : "border-vds-accent-border bg-vds-primary/[0.08] text-vds-primary hover:bg-vds-primary/[0.13]"
      } ${compact ? "size-8" : "h-10 px-4 text-xs"}`}
      aria-label={`${label} ${application.name}`}
    >
      {!compact ? label : null}
      <Icon className="size-3.5" aria-hidden="true" />
    </Button>
  );
}
