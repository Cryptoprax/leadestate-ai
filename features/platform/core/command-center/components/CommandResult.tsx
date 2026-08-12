import { ArrowUpRight, Command as CommandIcon } from "lucide-react";

import type { Command } from "../types/command";

export function CommandResult({ command }: { command: Command }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600 group-hover:text-cyan-300">
        <CommandIcon className="size-3.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-300">
          {command.title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-700">
          {command.description}
        </span>
      </span>
      {command.shortcut ? (
        <kbd className="rounded-md border border-white/[0.08] px-2 py-1 font-sans text-[9px] text-slate-700">
          {command.shortcut}
        </kbd>
      ) : null}
      <ArrowUpRight
        className="size-3 text-slate-800 group-hover:text-slate-500"
        aria-hidden="true"
      />
    </button>
  );
}
