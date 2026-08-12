"use client";

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
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        aria-label={`Actions for ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Ellipsis className="size-4" aria-hidden="true" />
      </button>
      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.3rem)] z-30 w-48 rounded-xl border border-white/[0.08] bg-[#0b1119]/98 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
          role="menu"
        >
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                role="menuitem"
              >
                <Icon className="size-3.5 text-slate-600" aria-hidden="true" />
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
