"use client";

import {
  CircleHelp,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export interface ProfileDropdownProps {
  onClose: () => void;
}

const menuItems = [
  { label: "Profile", icon: UserRound },
  { label: "Account settings", icon: Settings },
  { label: "Security", icon: ShieldCheck },
  { label: "Help & shortcuts", icon: CircleHelp },
];

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  return (
    <div
      className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
      role="menu"
      aria-label="User menu"
    >
      <div className="border-b border-white/[0.07] p-4">
        <p className="text-sm font-semibold text-white">Platform Operator</p>
        <p className="mt-0.5 text-xs text-slate-500">operator@atlasos.com</p>
      </div>
      <div className="p-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              role="menuitem"
            >
              <Icon className="size-4 text-slate-500" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="border-t border-white/[0.07] p-1.5">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70"
          role="menuitem"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
