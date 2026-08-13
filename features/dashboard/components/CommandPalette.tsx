"use client";
import { Button } from "@/features/platform/design-system";

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
      className="fixed inset-0 z-[100] flex items-start justify-center bg-vds-overlay px-4 pt-[10vh] backdrop-blur-md sm:pt-[14vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-vds-border bg-[var(--vds-color-surface)]/95 shadow-[0_32px_100px_var(--vds-overlay)] backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3 border-b border-vds-border/[0.08] px-5">
          <Search className="size-5 shrink-0 text-vds-muted" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
            }}
            className="h-16 min-w-0 flex-1 bg-transparent text-base text-vds-foreground outline-none placeholder:text-vds-subtle"
            placeholder="Search AtlasOS..."
            aria-label="Search AtlasOS"
          />
          <Button variant="control"
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-vds-muted transition hover:bg-vds-surface/[0.06] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus sm:hidden"
            aria-label="Close command palette"
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
          <kbd className="hidden rounded-md border border-vds-border bg-vds-surface/[0.05] px-2 py-1 font-sans text-[10px] text-vds-muted sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[min(62vh,34rem)] overflow-y-auto p-2 [scrollbar-color:var(--vds-color-border)_transparent] [scrollbar-width:thin]">
          {categoryOrder.map((category) => {
            const items = filteredItems.filter(
              (item) => item.category === category,
            );
            if (items.length === 0) return null;

            return (
              <div key={category} className="py-2">
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-vds-subtle">
                  {category}
                </p>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button variant="control"
                      key={item.id}
                      type="button"
                      onClick={onClose}
                      className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-vds-surface/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-vds-border/[0.07] bg-vds-surface/[0.035] text-vds-muted group-hover:text-vds-primary">
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-vds-secondary">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-vds-subtle">
                          {item.subtitle}
                        </span>
                      </span>
                      {item.shortcut ? (
                        <kbd className="rounded-md border border-vds-border/[0.08] bg-vds-surface/[0.035] px-2 py-1 font-sans text-[10px] text-vds-subtle">
                          {item.shortcut}
                        </kbd>
                      ) : null}
                    </Button>
                  );
                })}
              </div>
            );
          })}

          {filteredItems.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-sm font-medium text-vds-secondary">
                No AtlasOS results
              </p>
              <p className="mt-1 text-xs text-vds-subtle">
                Try a workspace, module, page, or command.
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-vds-border/[0.07] px-5 py-3 text-[10px] text-vds-subtle">
          <span>Navigate with ↑ ↓ · Select with Enter</span>
          <span>AtlasOS Command</span>
        </div>
      </section>
    </div>
  );
}
