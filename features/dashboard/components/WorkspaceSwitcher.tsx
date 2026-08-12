"use client";

import { Check, ChevronsUpDown, Layers3 } from "lucide-react";
import { useState } from "react";

interface Workspace {
  id: string;
  name: string;
  detail: string;
  accent: string;
}

const workspaces: Workspace[] = [
  {
    id: "atlas",
    name: "AtlasOS",
    detail: "Platform",
    accent: "from-cyan-300 to-blue-500",
  },
  {
    id: "leadestate",
    name: "LeadEstate AI",
    detail: "Product",
    accent: "from-violet-300 to-fuchsia-500",
  },
  {
    id: "future",
    name: "Future Products",
    detail: "Portfolio",
    accent: "from-amber-300 to-orange-500",
  },
];

export interface WorkspaceSwitcherProps {
  compact?: boolean;
}

export function WorkspaceSwitcher({
  compact = false,
}: WorkspaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("atlas");
  const activeWorkspace =
    workspaces.find((workspace) => workspace.id === activeId) ?? workspaces[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-left transition hover:border-white/[0.14] hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
          compact ? "size-10 justify-center" : "h-10 min-w-0 gap-2.5 px-2.5"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current workspace: ${activeWorkspace.name}`}
      >
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${activeWorkspace.accent} text-slate-950 shadow-lg`}
        >
          <Layers3 className="size-3.5" aria-hidden="true" />
        </span>
        {!compact ? (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-slate-100">
                {activeWorkspace.name}
              </span>
              <span className="block truncate text-[10px] text-slate-500">
                {activeWorkspace.detail}
              </span>
            </span>
            <ChevronsUpDown
              className="size-3.5 shrink-0 text-slate-500"
              aria-hidden="true"
            />
          </>
        ) : null}
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          role="listbox"
          aria-label="Select workspace"
        >
          <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Workspaces
          </p>
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              type="button"
              role="option"
              aria-selected={workspace.id === activeId}
              onClick={() => {
                setActiveId(workspace.id);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <span
                className={`size-8 rounded-lg bg-gradient-to-br ${workspace.accent}`}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-slate-200">
                  {workspace.name}
                </span>
                <span className="block text-xs text-slate-500">
                  {workspace.detail}
                </span>
              </span>
              {workspace.id === activeId ? (
                <Check className="size-4 text-cyan-300" aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
