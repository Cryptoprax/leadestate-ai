"use client";

import {
  Bell,
  Command,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { missionControlNavigation } from "../config/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProfileDropdown } from "./ProfileDropdown";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export interface TopbarProps {
  onCommandOpen: () => void;
  onNotificationsOpen: () => void;
  onMobileMenuOpen: () => void;
}

export function Topbar({
  onCommandOpen,
  onNotificationsOpen,
  onMobileMenuOpen,
}: TopbarProps) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [lightModePreview, setLightModePreview] = useState(false);
  const currentNavigationItem = missionControlNavigation.find(
    (item) => item.route === pathname,
  );

  return (
    <header className="relative z-30 shrink-0 border-b border-white/[0.07] bg-[#080d14]/80 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <div className="hidden xl:block">
          <Breadcrumbs
            items={[
              { label: "Mission Control", href: "/platform" },
              { label: currentNavigationItem?.title ?? "Platform" },
            ]}
          />
        </div>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <button
            type="button"
            onClick={onCommandOpen}
            className="flex h-10 w-full max-w-md items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 text-left text-sm text-slate-600 transition hover:border-white/[0.14] hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            aria-label="Open global search"
          >
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">Search AtlasOS...</span>
            <kbd className="rounded-md border border-white/[0.08] bg-black/20 px-1.5 py-0.5 font-sans text-[10px] text-slate-600">
              Ctrl K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block xl:hidden">
            <WorkspaceSwitcher compact />
          </div>
          <div className="hidden xl:block">
            <WorkspaceSwitcher />
          </div>

          <button
            type="button"
            onClick={onCommandOpen}
            className="flex size-10 items-center justify-center rounded-xl border border-transparent text-slate-500 transition hover:border-white/[0.07] hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 md:hidden"
            aria-label="Open command palette"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onCommandOpen}
            className="hidden h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 text-xs font-medium text-slate-500 transition hover:bg-white/[0.055] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" aria-hidden="true" />
            <span className="hidden 2xl:inline">Command</span>
          </button>

          <button
            type="button"
            onClick={() => setLightModePreview((current) => !current)}
            className="hidden size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:flex"
            aria-label="Toggle theme preview"
            aria-pressed={lightModePreview}
            title="Theme toggle (preview only)"
          >
            {lightModePreview ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onNotificationsOpen}
            className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            aria-label="Open notifications"
          >
            <Bell className="size-4" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-cyan-300 ring-2 ring-[#080d14]" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-500 text-xs font-bold text-slate-950 shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              aria-label="Open user menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              PO
            </button>
            {profileOpen ? (
              <ProfileDropdown onClose={() => setProfileOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
