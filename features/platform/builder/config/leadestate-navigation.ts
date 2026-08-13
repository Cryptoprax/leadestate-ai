import type { NavigationItem } from "../types";

export const leadEstateNavigation: readonly NavigationItem[] = [
  { id: "leadestate-dashboard", label: "Dashboard", href: "/leadestate", icon: "D", surface: "sidebar", order: 0, visible: true, permission: { anyOf: ["crm.records.manage", "applications.launch"] } },
  { id: "leadestate-properties", label: "Properties", href: "/leadestate/properties", icon: "P", surface: "sidebar", order: 1, visible: true, moduleId: "properties", permission: { anyOf: ["properties.read", "properties.publish"] } },
  { id: "leadestate-leads", label: "Leads", href: "/leadestate/leads", icon: "L", surface: "sidebar", order: 2, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-deals", label: "Deals", href: "/leadestate/deals", icon: "S", surface: "sidebar", order: 3, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-operations", label: "Operations", href: "/leadestate/operations", icon: "O", surface: "sidebar", order: 4, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-calendar", label: "Calendar", href: "/leadestate/calendar", icon: "C", surface: "sidebar", order: 5, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-tasks", label: "Tasks", href: "/leadestate/tasks", icon: "K", surface: "sidebar", order: 6, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-communications", label: "Communications", href: "/leadestate/communications", icon: "M", surface: "sidebar", order: 7, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-ai", label: "AI Workforce", href: "/leadestate/ai", icon: "A", surface: "sidebar", order: 8, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-objects", label: "Universal Objects", href: "/leadestate/objects", icon: "U", surface: "sidebar", order: 9, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-intelligence", label: "Intelligence", href: "/leadestate/intelligence", icon: "I", surface: "sidebar", order: 10, visible: true, moduleId: "crm", permission: { anyOf: ["crm.read", "crm.records.manage"] } },
  { id: "leadestate-configuration", label: "Configuration", href: "/leadestate/settings/configuration", icon: "C", surface: "sidebar", order: 11, visible: true, permission: { anyOf: ["organizations.manage", "users.manage"] } },
  { id: "leadestate-billing", label: "Billing", href: "/leadestate/settings/billing", icon: "B", surface: "sidebar", order: 11, visible: true, permission: { anyOf: ["organizations.manage", "users.manage"] } },
  { id: "leadestate-team", label: "Team", href: "/leadestate/team", icon: "T", surface: "sidebar", order: 12, visible: true, permission: { anyOf: ["users.read", "users.manage"] } },
];
