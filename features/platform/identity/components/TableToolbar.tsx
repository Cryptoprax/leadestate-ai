import { Download, Layers3, Plus } from "lucide-react";

import { FilterBar, type ToolbarFilter } from "./FilterBar";
import { SearchInput } from "./SearchInput";

export interface TableToolbarProps {
  searchLabel: string;
  searchPlaceholder: string;
  filters: ToolbarFilter[];
  primaryAction: string;
  exportLabel?: string;
  bulkActionLabel?: string;
}

export function TableToolbar({
  searchLabel,
  searchPlaceholder,
  filters,
  primaryAction,
  exportLabel = "Export",
  bulkActionLabel = "Bulk actions",
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/[0.07] p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          label={searchLabel}
          placeholder={searchPlaceholder}
          className="w-full sm:w-72"
        />
        <FilterBar filters={filters} />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] px-3 text-xs font-medium text-slate-500 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        >
          <Layers3 className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{bulkActionLabel}</span>
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] px-3 text-xs font-medium text-slate-500 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        >
          <Download className="size-3.5" aria-hidden="true" />
          {exportLabel}
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-cyan-300 px-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d14]"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          {primaryAction}
        </button>
      </div>
    </div>
  );
}
