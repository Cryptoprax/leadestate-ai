import type { WorkspaceDefinition, WorkspaceTab } from "@/features/vayon/workspace-engine/types";
import { standardWorkspaceActions } from "./workspace-actions";
import { standardWorkspaceTabs } from "./workspace-tabs";
import { workspaceWidgetCatalog } from "./workspace-widgets";

const dealTabs: readonly WorkspaceTab[] = [
  "overview", "customer", "property", "timeline", "messages", "calls", "follow-ups", "tasks", "meetings",
  "site-visits", "offers", "payments", "commission", "documents",
  "analytics", "ai-assistant", "settings",
].map((id, order) => ({
  id,
  label: id.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "),
  order,
  visible: true,
  lazy: order > 3,
}));

const aiEmployeeTabs: readonly WorkspaceTab[] = ["overview", "knowledge", "recommendations", "tasks", "history", "capabilities", "settings"].map((id, order) => ({ id, label: id[0].toUpperCase() + id.slice(1), order, visible: true, lazy: order > 2 }));

export const workspaceRegistry: readonly WorkspaceDefinition[] = [
  { id: "property-workspace", entityType: "property", title: "Property Workspace", icon: "P", tabs: standardWorkspaceTabs, actions: standardWorkspaceActions, permissions: ["properties.read"], widgets: workspaceWidgetCatalog.property, relationships: ["leads", "offers", "deals", "owner", "documents"] },
  { id: "lead-workspace", entityType: "lead", title: "Lead Workspace", icon: "L", tabs: standardWorkspaceTabs, actions: standardWorkspaceActions, permissions: ["crm.read"], widgets: workspaceWidgetCatalog.lead, relationships: ["properties", "meetings", "tasks", "offers", "documents"] },
  { id: "deal-workspace", entityType: "deal", title: "Deal Workspace", icon: "D", tabs: dealTabs, actions: standardWorkspaceActions, permissions: ["deals.read"], widgets: workspaceWidgetCatalog.deal, relationships: ["lead", "contact", "property", "offers", "payments", "commission", "documents"] },
  { id: "ai-employee-workspace", entityType: "ai-employee", title: "AI Employee Workspace", icon: "A", tabs: aiEmployeeTabs, actions: standardWorkspaceActions, permissions: ["crm.read"], widgets: workspaceWidgetCatalog.aiEmployee, relationships: ["knowledge", "recommendations", "tasks", "approvals"] },
];
