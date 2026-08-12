"use client";

import {
  Blocks,
  Building2,
  Command,
  FileText,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Recent Items" | "Organizations" | "Users" | "Pages" | "Modules" | "Commands";
  icon: typeof Command;
  shortcut?: string;
}

const commandItems: CommandItem[] = [
  {
    id: "recent-mission-control",
    title: "Mission Control",
    subtitle: "Executive workspace",
    category: "Recent Items",
    icon: Command,
  },
  {
    id: "org-directory",
    title: "Organization directory",
    subtitle: "Browse platform organizations",
    category: "Organizations",
    icon: Building2,
  },
  {
    id: "users-directory",
    title: "User directory",
    subtitle: "Search identities and memberships",
    category: "Users",
    icon: UsersRound,
  },
  {
    id: "marketing-pages",
    title: "Marketing pages",
    subtitle: "Open managed page definitions",
    category: "Pages",
    icon: FileText,
  },
  {
    id: "module-catalog",
    title: "Module catalog",
    subtitle: "Review installed platform modules",
    category: "Modules",
    icon: Blocks,
  },
  {
    id: "command-new-workspace",
    title: "Switch workspace",
    subtitle: "Change active product context",
    category: "Commands",
    icon: Command,
    shortcut: "G W",
  },
];

const categoryOrder: CommandItem["category"][] = [
  "Recent Items",
  "Organizations",
  "Users",
  "Pages",
  "Modules",
  "Commands",
];

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commandItems;

    return commandItems.filter((item) =>
      `${item.title} ${item.subtitle} ${item.category}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/65 px-4 pt-[10vh] backdrop-blur-md sm:pt-[14vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b111a]/95 shadow-[0_32px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5">
          <Search className="size-5 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
            }}
            className="h-16 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-600"
            placeholder="Search AtlasOS..."
            aria-label="Search AtlasOS"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:hidden"
            aria-label="Close command palette"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          <kbd className="hidden rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 font-sans text-[10px] text-slate-500 sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[min(62vh,34rem)] overflow-y-auto p-2 [scrollbar-color:rgba(148,163,184,0.18)_transparent] [scrollbar-width:thin]">
          {categoryOrder.map((category) => {
            const items = filteredItems.filter(
              (item) => item.category === category,
            );
            if (items.length === 0) return null;

            return (
              <div key={category} className="py-2">
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {category}
                </p>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={onClose}
                      className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-slate-500 group-hover:text-cyan-300">
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-200">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-slate-600">
                          {item.subtitle}
                        </span>
                      </span>
                      {item.shortcut ? (
                        <kbd className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 font-sans text-[10px] text-slate-600">
                          {item.shortcut}
                        </kbd>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {filteredItems.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-sm font-medium text-slate-300">
                No AtlasOS results
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Try a workspace, module, page, or command.
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3 text-[10px] text-slate-600">
          <span>Navigate with ↑ ↓ · Select with Enter</span>
          <span>AtlasOS Command</span>
        </div>
      </section>
    </div>
  );
}
