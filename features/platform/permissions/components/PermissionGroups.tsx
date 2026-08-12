import { KeyRound } from "lucide-react";

import { FilterBar } from "../../identity/components/FilterBar";
import { SearchInput } from "../../identity/components/SearchInput";
import { StatusBadge } from "../../identity/components/StatusBadge";
import { permissionFilters, permissions } from "../config/permissions";
import type { Permission } from "../types/permission";

const categoryOrder: Permission["category"][] = [
  "Applications",
  "Users",
  "CRM",
  "Properties",
  "AI",
  "Marketing",
  "Billing",
  "Security",
  "Developer",
  "Marketplace",
];

export function PermissionGroups() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center">
        <SearchInput
          label="Search permissions"
          placeholder="Search permissions..."
          className="w-full sm:w-80"
        />
        <FilterBar filters={permissionFilters} />
      </div>
      <div className="divide-y divide-white/[0.07]">
        {categoryOrder.map((category) => {
          const categoryPermissions = permissions.filter(
            (permission) => permission.category === category,
          );

          return (
            <section
              key={category}
              className="grid gap-4 px-4 py-5 lg:grid-cols-[13rem_1fr] lg:px-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-slate-600">
                    <KeyRound className="size-3.5" aria-hidden="true" />
                  </span>
                  <h2 className="text-sm font-semibold text-slate-300">
                    {category}
                  </h2>
                </div>
                <p className="mt-2 text-[10px] text-slate-700">
                  {categoryPermissions.length} permission
                  {categoryPermissions.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="space-y-2">
                {categoryPermissions.map((permission) => (
                  <article
                    key={permission.id}
                    className="grid gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 transition hover:border-white/[0.1] sm:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xs font-semibold text-slate-200">
                          {permission.name}
                        </h3>
                        <code className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-cyan-300/70">
                          {permission.key}
                        </code>
                      </div>
                      <p className="mt-1.5 text-xs leading-5 text-slate-600">
                        {permission.description}
                      </p>
                    </div>
                    <StatusBadge label={permission.scope} tone="neutral" />
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
