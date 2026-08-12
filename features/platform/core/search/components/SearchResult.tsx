import { ArrowUpRight, Search } from "lucide-react";

import type { SearchResult as SearchResultContract } from "../types/search";

export function SearchResult({
  result,
}: {
  result: SearchResultContract;
}) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600 group-hover:text-cyan-300">
        <Search className="size-3.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-300">
          {result.title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-700">
          {result.description}
        </span>
      </span>
      <span className="hidden text-[9px] text-slate-700 sm:block">
        {result.metadata}
      </span>
      <ArrowUpRight
        className="size-3.5 text-slate-800 group-hover:text-slate-500"
        aria-hidden="true"
      />
    </button>
  );
}
