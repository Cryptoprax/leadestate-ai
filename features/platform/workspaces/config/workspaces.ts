import type { Workspace } from "../types/workspace";

export const workspaces: Workspace[] = [
  {
    id: "workspace-vayon-global",
    name: "Vayon Global",
    organization: "Northstar Holdings",
    userCount: 86,
    applications: ["Vayon OS", "Analytics", "AI Studio"],
    status: "Operational",
    environment: "Production",
  },
  {
    id: "workspace-sales-operations",
    name: "Sales Operations",
    organization: "Northstar Holdings",
    userCount: 42,
    applications: ["Vayon OS", "Marketing Studio"],
    status: "Operational",
    environment: "Production",
  },
  {
    id: "workspace-uk-operations",
    name: "UK Operations",
    organization: "Meridian Group",
    userCount: 58,
    applications: ["Vayon OS", "Support Desk", "Analytics"],
    status: "Operational",
    environment: "Production",
  },
  {
    id: "workspace-apac-launch",
    name: "APAC Launch",
    organization: "Aurora Ventures",
    userCount: 19,
    applications: ["Builder Studio", "Marketing Studio"],
    status: "Setup",
    environment: "Staging",
  },
  {
    id: "workspace-ai-evaluation",
    name: "AI Evaluation Lab",
    organization: "Northstar Holdings",
    userCount: 11,
    applications: ["AI Studio", "Developer Center"],
    status: "Maintenance",
    environment: "Development",
  },
  {
    id: "workspace-research",
    name: "Research Lab",
    organization: "Atlas Research",
    userCount: 12,
    applications: ["Analytics", "Developer Center"],
    status: "Setup",
    environment: "Development",
  },
];

export const workspaceFilters = [
  {
    id: "workspace-status",
    label: "Status",
    options: [
      { label: "Operational", value: "operational" },
      { label: "Setup", value: "setup" },
      { label: "Maintenance", value: "maintenance" },
    ],
  },
  {
    id: "workspace-environment",
    label: "Environment",
    options: [
      { label: "Production", value: "production" },
      { label: "Staging", value: "staging" },
      { label: "Development", value: "development" },
    ],
  },
];
