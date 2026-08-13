"use client";
import { Button } from "@/features/platform/design-system";

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
    accent: "from-vds-primary to-vds-info",
  },
  {
    id: "vayon",
    name: "Vayon OS",
    detail: "Product",
    accent: "from-vds-accent to-vds-accent",
  },
  {
    id: "future",
    name: "Future Products",
    detail: "Portfolio",
    accent: "from-vds-warning to-vds-warning",
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
      <Button variant="control"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex items-center rounded-xl border border-vds-border/[0.08] bg-vds-surface/[0.04] text-left transition hover:border-vds-border/[0.14] hover:bg-vds-surface/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus ${
          compact ? "size-10 justify-center" : "h-10 min-w-0 gap-2.5 px-2.5"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current workspace: ${activeWorkspace.name}`}
      >
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${activeWorkspace.accent} text-vds-foreground shadow-lg`}
        >
          <Layers3 className="size-3.5" aria-hidden="true" />
        </span>
        {!compact ? (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-vds-foreground">
                {activeWorkspace.name}
              </span>
              <span className="block truncate text-[10px] text-vds-muted">
                {activeWorkspace.detail}
              </span>
            </span>
            <ChevronsUpDown
              className="size-3.5 shrink-0 text-vds-muted"
              aria-hidden="true"
            />
          </>
        ) : null}
      </Button>

      {isOpen ? (
        <div
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-vds-border bg-[var(--vds-color-surface)]/95 p-1.5 shadow-2xl shadow-vds-shadow backdrop-blur-2xl"
          role="listbox"
          aria-label="Select workspace"
        >
          <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-vds-subtle">
            Workspaces
          </p>
          {workspaces.map((workspace) => (
            <Button variant="control"
              key={workspace.id}
              type="button"
              role="option"
              aria-selected={workspace.id === activeId}
              onClick={() => {
                setActiveId(workspace.id);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-vds-surface/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
            >
              <span
                className={`size-8 rounded-lg bg-gradient-to-br ${workspace.accent}`}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-vds-secondary">
                  {workspace.name}
                </span>
                <span className="block text-xs text-vds-muted">
                  {workspace.detail}
                </span>
              </span>
              {workspace.id === activeId ? (
                <Check className="size-4 text-vds-primary" aria-hidden="true" />
              ) : null}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
