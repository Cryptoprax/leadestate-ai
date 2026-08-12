import type { Role } from "../types/role";

export const roles: Role[] = [
  {
    id: "role-platform-admin",
    name: "Platform Admin",
    description: "Operates platform services and governed organization controls.",
    userCount: 8,
    permissionCount: 48,
    scope: "Platform",
    status: "System",
  },
  {
    id: "role-organization-owner",
    name: "Organization Owner",
    description: "Accountable authority for one organization's configuration.",
    userCount: 24,
    permissionCount: 36,
    scope: "Organization",
    status: "System",
  },
  {
    id: "role-workspace-manager",
    name: "Workspace Manager",
    description: "Manages membership and operations within assigned workspaces.",
    userCount: 61,
    permissionCount: 22,
    scope: "Workspace",
    status: "Custom",
  },
  {
    id: "role-agent",
    name: "Agent",
    description: "Performs authorized daily work on assigned resources.",
    userCount: 143,
    permissionCount: 14,
    scope: "Own",
    status: "System",
  },
  {
    id: "role-analytics-reviewer",
    name: "Analytics Reviewer",
    description: "Reviews governed reports without operational write access.",
    userCount: 0,
    permissionCount: 6,
    scope: "Organization",
    status: "Draft",
  },
];

export const roleFilters = [
  {
    id: "role-scope",
    label: "Scope",
    options: [
      { label: "Platform", value: "platform" },
      { label: "Organization", value: "organization" },
      { label: "Workspace", value: "workspace" },
      { label: "Own", value: "own" },
    ],
  },
  {
    id: "role-status",
    label: "Status",
    options: [
      { label: "System", value: "system" },
      { label: "Custom", value: "custom" },
      { label: "Draft", value: "draft" },
    ],
  },
];
