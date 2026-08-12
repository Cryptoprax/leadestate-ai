import { ArrowUpRight, Settings2 } from "lucide-react";

import type { SettingsOption } from "../types/settings";

export function SettingsCard({ option }: { option: SettingsOption }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] p-3 text-left transition hover:border-white/[0.11] hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-600 group-hover:text-cyan-300">
        <Settings2 className="size-3.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-300">
          {option.label}
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-slate-700">
          {option.description}
        </span>
      </span>
      <span className="text-[10px] text-slate-500">{option.value}</span>
      <ArrowUpRight className="size-3 text-slate-800" aria-hidden="true" />
    </button>
  );
}
