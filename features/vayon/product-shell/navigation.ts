import { Activity, Bot, Brain, BriefcaseBusiness, Building2, CalendarDays, CircleDollarSign, Code2, ContactRound, FileCode2, FileText, Gauge, Handshake, Home, Inbox, Landmark, LayoutTemplate, Megaphone, MessageCircleMore, Network, Phone, RadioTower, Settings, Sparkles, SquareKanban, Target, Users, UsersRound, Workflow } from "lucide-react";
import type { ShellNavigationGroup } from "./types";

export const shellNavigation: readonly ShellNavigationGroup[] = [
  { id: "home", label: "Home", icon: Home, items: [{ label: "Executive Home", href: "/vayon/home", icon: Home }] },
  { id: "crm", label: "CRM", icon: Building2, items: [
    { label: "Properties", href: "/vayon/properties", icon: Building2 }, { label: "Leads", href: "/vayon/leads", icon: Target }, { label: "Deals", href: "/vayon/deals", icon: Handshake },
    { label: "Contacts", href: "/vayon/objects", icon: ContactRound, description: "Universal Objects" }, { label: "Companies", href: "/vayon/objects", icon: Landmark, description: "Universal Objects" },
  ] },
  { id: "operations", label: "Operations", icon: CalendarDays, items: [{ label: "Calendar", href: "/vayon/calendar", icon: CalendarDays }, { label: "Tasks", href: "/vayon/tasks", icon: SquareKanban }, { label: "Timeline", href: "/vayon/timeline", icon: Activity }] },
  { id: "growth", label: "Growth", icon: Megaphone, items: [{ label: "Growth Hub", href: "/vayon/growth", icon: Megaphone }, { label: "Campaigns", href: "/vayon/growth", icon: BriefcaseBusiness }, { label: "Landing Pages", icon: LayoutTemplate, disabled: true, description: "Coming soon" }, { label: "Referrals", icon: UsersRound, disabled: true, description: "Coming soon" }] },
  { id: "communications", label: "Communications", icon: MessageCircleMore, items: [{ label: "Inbox", href: "/vayon/communications", icon: Inbox }, { label: "Meetings", href: "/vayon/meetings", icon: Users }, { label: "Calls", href: "/vayon/communications", icon: Phone }] },
  { id: "ai", label: "AI", icon: Sparkles, items: [{ label: "Workforce", href: "/vayon/workforce", icon: Bot }, { label: "Assistant", icon: Sparkles, disabled: true, description: "Disabled" }] },
  { id: "platform", label: "Platform", icon: Settings, items: [{ label: "Team", href: "/vayon/team", icon: UsersRound }, { label: "Settings", href: "/vayon/settings/appearance", icon: Settings }, { label: "Integrations", href: "/vayon/settings/integrations", icon: Network }, { label: "Billing", href: "/vayon/settings/billing", icon: CircleDollarSign }] },
  { id: "developer", label: "Developer", icon: Code2, developer: true, items: [
    { label: "Brain", href: "/vayon/brain", icon: Brain }, { label: "Runtime", href: "/vayon/runtime", icon: RadioTower }, { label: "Cognitive", href: "/vayon/cognitive", icon: Workflow }, { label: "Context", href: "/vayon/context", icon: Network },
    { label: "Intelligence Dashboard", href: "/vayon/intelligence", icon: Gauge }, { label: "Timeline Dashboard", href: "/vayon/timeline", icon: Activity }, { label: "Architecture", href: "/vayon/objects", icon: FileCode2 }, { label: "Documents", href: "/vayon/storage", icon: FileText },
  ] },
];

export const breadcrumbGroups = new Map(shellNavigation.flatMap(group => group.items.filter(item => item.href).map(item => [item.href!, group.label])));
