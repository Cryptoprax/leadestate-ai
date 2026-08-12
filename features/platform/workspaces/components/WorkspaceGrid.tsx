import { AppWindow, UsersRound } from "lucide-react";

import { ActionMenu } from "../../identity/components/ActionMenu";
import { FilterBar } from "../../identity/components/FilterBar";
import { SearchInput } from "../../identity/components/SearchInput";
import { StatusBadge, type StatusTone } from "../../identity/components/StatusBadge";
import { workspaceFilters, workspaces } from "../config/workspaces";
import type { WorkspaceStatus } from "../types/workspace";

const statusTones: Record<WorkspaceStatus, StatusTone> = {
  Operational: "positive",
  Setup: "info",
  Maintenance: "warning",
};

export function WorkspaceGrid() {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 sm:flex-row sm:items-center">
        <SearchInput
          label="Search workspaces"
          placeholder="Search workspaces..."
          className="w-full sm:w-80"
        />
        <FilterBar filters={workspaceFilters} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {workspaces.map((workspace) => (
          <article
            key={workspace.id}
            className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  {workspace.name}
                </p>
                <p className="mt-1 truncate text-xs text-slate-600">
                  {workspace.organization}
                </p>
              </div>
              <ActionMenu label={workspace.name} />
            </div>
            <div className="mt-6 flex items-center gap-5 border-y border-white/[0.06] py-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <UsersRound className="size-3.5 text-slate-700" aria-hidden="true" />
                {workspace.userCount} users
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <AppWindow className="size-3.5 text-slate-700" aria-hidden="true" />
                {workspace.applications.length} applications
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {workspace.applications.map((application) => (
                <span
                  key={application}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[9px] text-slate-600"
                >
                  {application}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <StatusBadge
                label={workspace.status}
                tone={statusTones[workspace.status]}
              />
              <span className="text-[10px] font-medium text-slate-700">
                {workspace.environment}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
