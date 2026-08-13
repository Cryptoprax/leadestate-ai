"use client";
import { Button } from "@/features/platform/design-system";

import { Ellipsis, Eye, Pencil, Settings2 } from "lucide-react";
import { useState } from "react";

export interface ActionMenuProps {
  label: string;
}

const actions = [
  { label: "View details", icon: Eye },
  { label: "Edit configuration", icon: Pencil },
  { label: "Manage", icon: Settings2 },
];

export function ActionMenu({ label }: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="control"
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex size-8 items-center justify-center rounded-lg text-vds-subtle transition hover:bg-vds-surface/[0.06] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
        aria-label={`Actions for ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Ellipsis className="size-4" aria-hidden="true" />
      </Button>
      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.3rem)] z-30 w-48 rounded-xl border border-vds-border/[0.08] bg-[var(--vds-color-surface)]/98 p-1.5 shadow-2xl shadow-vds-shadow backdrop-blur-xl"
          role="menu"
        >
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button variant="control"
                key={action.label}
                type="button"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-vds-muted transition hover:bg-vds-surface/[0.05] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
                role="menuitem"
              >
                <Icon className="size-3.5 text-vds-subtle" aria-hidden="true" />
                {action.label}
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
