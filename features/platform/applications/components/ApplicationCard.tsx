import { CheckCircle2, PackageOpen } from "lucide-react";

import type { PlatformApplication } from "../types/application";

import { ApplicationLauncher } from "./ApplicationLauncher";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

export interface ApplicationCardProps {
  application: PlatformApplication;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article className="group relative flex min-h-72 flex-col overflow-hidden rounded-3xl border border-vds-border/[0.08] bg-vds-surface/[0.025] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-vds-border/[0.14] hover:bg-vds-surface/[0.04] sm:p-6">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${application.theme.gradient} opacity-[0.07] blur-3xl transition group-hover:opacity-[0.12]`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${application.theme.gradient} text-sm font-bold tracking-[-0.04em] text-vds-foreground shadow-xl ${application.theme.glow}`}
          aria-hidden="true"
        >
          {application.logo}
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="relative mt-5 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-vds-foreground">
            {application.name}
          </h2>
          <span className="rounded-md bg-vds-surface/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-vds-subtle">
            {application.category}
          </span>
        </div>
        <p className="mt-2.5 text-sm leading-6 text-vds-muted">
          {application.description}
        </p>
      </div>

      <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-vds-border/[0.07] pt-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-vds-subtle">
              Installation
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-vds-muted">
              {application.installed ? (
                <CheckCircle2
                  className="size-3 text-vds-success"
                  aria-hidden="true"
                />
              ) : (
                <PackageOpen
                  className="size-3 text-vds-subtle"
                  aria-hidden="true"
                />
              )}
              {application.installed ? "Installed" : "Available"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-vds-subtle">
              Version
            </p>
            <p className="mt-1 font-mono text-xs text-vds-muted">
              v{application.version}
            </p>
          </div>
        </div>
        <ApplicationLauncher application={application} />
      </div>
    </article>
  );
}
