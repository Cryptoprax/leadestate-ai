"use client";
import { Button } from "@/features/platform/design-system";

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
    <header className="relative z-30 shrink-0 border-b border-vds-border/[0.07] bg-[var(--vds-color-background)]/80 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <Button variant="control"
          type="button"
          onClick={onMobileMenuOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-vds-muted transition hover:bg-vds-surface/[0.06] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>

        <div className="hidden xl:block">
          <Breadcrumbs
            items={[
              { label: "Mission Control", href: "/platform" },
              { label: currentNavigationItem?.title ?? "Platform" },
            ]}
          />
        </div>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <Button variant="control"
            type="button"
            onClick={onCommandOpen}
            className="flex h-10 w-full max-w-md items-center gap-3 rounded-xl border border-vds-border/[0.08] bg-vds-surface/[0.035] px-3.5 text-left text-sm text-vds-subtle transition hover:border-vds-border/[0.14] hover:bg-vds-surface/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
            aria-label="Open global search"
          >
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">Search AtlasOS...</span>
            <kbd className="rounded-md border border-vds-border/[0.08] bg-vds-input px-1.5 py-0.5 font-sans text-[10px] text-vds-subtle">
              Ctrl K
            </kbd>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block xl:hidden">
            <WorkspaceSwitcher compact />
          </div>
          <div className="hidden xl:block">
            <WorkspaceSwitcher />
          </div>

          <Button variant="control"
            type="button"
            onClick={onCommandOpen}
            className="flex size-10 items-center justify-center rounded-xl border border-transparent text-vds-muted transition hover:border-vds-border/[0.07] hover:bg-vds-surface/[0.05] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus md:hidden"
            aria-label="Open command palette"
          >
            <Search className="size-4" aria-hidden="true" />
          </Button>

          <Button variant="control"
            type="button"
            onClick={onCommandOpen}
            className="hidden h-10 items-center gap-2 rounded-xl border border-vds-border/[0.07] bg-vds-surface/[0.03] px-3 text-xs font-medium text-vds-muted transition hover:bg-vds-surface/[0.055] hover:text-vds-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus sm:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" aria-hidden="true" />
            <span className="hidden 2xl:inline">Command</span>
          </Button>

          <Button variant="control"
            type="button"
            onClick={() => setLightModePreview((current) => !current)}
            className="hidden size-10 items-center justify-center rounded-xl text-vds-muted transition hover:bg-vds-surface/[0.05] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus sm:flex"
            aria-label="Toggle theme preview"
            aria-pressed={lightModePreview}
            title="Theme toggle (preview only)"
          >
            {lightModePreview ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>

          <Button variant="control"
            type="button"
            onClick={onNotificationsOpen}
            className="relative flex size-10 items-center justify-center rounded-xl text-vds-muted transition hover:bg-vds-surface/[0.05] hover:text-vds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
            aria-label="Open notifications"
          >
            <Bell className="size-4" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-vds-primary ring-2 ring-[var(--vds-color-background)]" />
          </Button>

          <div className="relative">
            <Button variant="control"
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-vds-secondary to-vds-subtle text-xs font-bold text-vds-foreground shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vds-focus"
              aria-label="Open user menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              PO
            </Button>
            {profileOpen ? (
              <ProfileDropdown onClose={() => setProfileOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
