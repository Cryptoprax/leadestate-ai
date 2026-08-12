"use client";

import {
  Activity,
  AppWindow,
  Bell,
  Building2,
  ChevronLeft,
  Code2,
  Fingerprint,
  Gauge,
  History,
  KeyRound,
  Palette,
  PanelLeftClose,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  Search,
  Store,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import {
  missionControlNavigation,
  type NavigationIconName,
} from "@/features/dashboard/config/navigation";

import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

const navigationIcons: Record<NavigationIconName, LucideIcon> = {
  platform: Gauge,
  applications: AppWindow,
  identity: Fingerprint,
  organizations: Building2,
  workspaces: PanelsTopLeft,
  users: UsersRound,
  roles: ShieldCheck,
  permissions: KeyRound,
  notifications: Bell,
  activity: Activity,
  search: Search,
  themes: Palette,
  audit: History,
  marketplace: Store,
  developer: Code2,
  settings: Settings,
};

export interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  activeRoute?: string;
  onCollapse: () => void;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  activeRoute = "/platform",
  onCollapse,
  onMobileClose,
}: SidebarProps) {
  const items = missionControlNavigation.filter((item) => item.enabled);

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-label="Close navigation"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex border-r border-white/[0.07] bg-[#080d14]/95 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-[width,transform] duration-300 lg:relative lg:z-20 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-20" : "w-72"}`}
        aria-label="Mission Control navigation"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className={`flex h-16 shrink-0 items-center border-b border-white/[0.07] ${
              collapsed ? "justify-center px-3" : "justify-between px-4"
            }`}
          >
            <Link
              href="/platform"
              className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              aria-label="AtlasOS Mission Control"
            >
              <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-200/30 bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                A
              </span>
              {!collapsed ? (
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold tracking-tight text-white">
                    AtlasOS
                  </span>
                  <span className="block truncate text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
                    Mission Control
                  </span>
                </span>
              ) : null}
            </Link>
            {!collapsed ? (
              <button
                type="button"
                onClick={onMobileClose}
                className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
                aria-label="Close navigation"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="shrink-0 p-3">
            <WorkspaceSwitcher compact={collapsed} />
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 [scrollbar-color:rgba(148,163,184,0.18)_transparent] [scrollbar-width:thin]">
            <p
              className={`mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 ${
                collapsed ? "sr-only" : ""
              }`}
            >
              Platform
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const Icon = navigationIcons[item.iconName];
                const isActive = item.route === activeRoute;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.route}
                      title={collapsed ? item.title : undefined}
                      onClick={onMobileClose}
                      className={`group flex h-9 items-center rounded-xl text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                        collapsed ? "justify-center px-2" : "gap-3 px-3"
                      } ${
                        isActive
                          ? "bg-cyan-300/[0.09] text-cyan-100 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.08)]"
                          : "text-slate-500 hover:bg-white/[0.045] hover:text-slate-200"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon
                        className={`size-4 shrink-0 ${
                          isActive
                            ? "text-cyan-300"
                            : "text-slate-600 group-hover:text-slate-400"
                        }`}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      {!collapsed ? (
                        <>
                          <span className="min-w-0 flex-1 truncate">
                            {item.title}
                          </span>
                          {item.badge ? (
                            <span
                              className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${
                                item.badge === "Live"
                                  ? "bg-emerald-400/10 text-emerald-300"
                                  : "bg-white/[0.06] text-slate-500"
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-white/[0.07] p-3">
            <button
              type="button"
              onClick={onCollapse}
              className={`hidden h-9 w-full items-center rounded-xl text-sm text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 lg:flex ${
                collapsed ? "justify-center" : "gap-3 px-3"
              }`}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
            >
              {collapsed ? (
                <ChevronLeft
                  className="size-4 rotate-180"
                  aria-hidden="true"
                />
              ) : (
                <>
                  <PanelLeftClose className="size-4" aria-hidden="true" />
                  Collapse sidebar
                </>
              )}
            </button>
          </div>
        </div>

        <div
          className="group absolute inset-y-0 -right-1 hidden w-2 cursor-col-resize items-center justify-center lg:flex"
          title="Resize sidebar"
          aria-hidden="true"
        >
          <span className="h-12 w-px rounded-full bg-white/0 transition group-hover:bg-cyan-300/40" />
        </div>
      </aside>
    </>
  );
}
