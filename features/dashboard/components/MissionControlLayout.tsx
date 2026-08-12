"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CommandPalette } from "./CommandPalette";
import { NotificationCenter } from "./NotificationCenter";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { Topbar } from "./Topbar";

export interface MissionControlLayoutProps {
  children: ReactNode;
}

export function MissionControlLayout({
  children,
}: MissionControlLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
        setNotificationCenterOpen(false);
        setMobileNavigationOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, []);

  return (
    <div className="flex h-dvh min-h-[36rem] overflow-hidden bg-[#060a10] text-slate-100 selection:bg-cyan-300/20">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileNavigationOpen}
        activeRoute={pathname}
        onCollapse={() => setSidebarCollapsed((current) => !current)}
        onMobileClose={() => setMobileNavigationOpen(false)}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_-20%,rgba(34,211,238,0.08),transparent_55%)]"
          aria-hidden="true"
        />
        <Topbar
          onCommandOpen={() => setCommandPaletteOpen(true)}
          onNotificationsOpen={() => setNotificationCenterOpen(true)}
          onMobileMenuOpen={() => setMobileNavigationOpen(true)}
        />
        <main className="relative min-h-0 flex-1 overflow-y-auto [scrollbar-color:rgba(148,163,184,0.18)_transparent] [scrollbar-width:thin]">
          {children}
        </main>
        <StatusBar />
      </div>

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <NotificationCenter
        open={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
      />
    </div>
  );
}
