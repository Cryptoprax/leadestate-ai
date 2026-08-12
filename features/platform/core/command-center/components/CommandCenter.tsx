"use client";

import { useMemo, useState } from "react";

import { SectionHeader } from "../../components/SectionHeader";
import { commandGroups, commands } from "../config/commands";
import { CommandInput } from "./CommandInput";
import { CommandResult } from "./CommandResult";

export function CommandCenter() {
  const [query, setQuery] = useState("");
  const visibleCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) =>
      `${command.title} ${command.description} ${command.group}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <section
      className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0a1018]/95 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      aria-label="AtlasOS Command Center"
    >
      <div className="border-b border-white/[0.08]">
        <CommandInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="grid max-h-[62vh] gap-3 overflow-y-auto p-3 [scrollbar-color:rgba(148,163,184,0.16)_transparent] [scrollbar-width:thin] sm:grid-cols-2">
        {commandGroups.map((group) => {
          const groupCommands = visibleCommands.filter(
            (command) => command.group === group,
          );
          if (groupCommands.length === 0) return null;
          return (
            <section
              key={group}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-2"
            >
              <div className="px-2 py-2">
                <SectionHeader title={group} count={groupCommands.length} />
              </div>
              {groupCommands.map((command) => (
                <CommandResult key={command.id} command={command} />
              ))}
            </section>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3 text-[10px] text-slate-700">
        <span>Navigate with ↑ ↓ · Select with Enter</span>
        <span>Ctrl + K</span>
      </div>
    </section>
  );
}
