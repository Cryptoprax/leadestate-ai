import type { Permission } from "../types/permission";

export const permissions: Permission[] = [
  {
    id: "permission-applications-launch",
    key: "applications.launch",
    name: "Launch applications",
    description: "Open installed applications within an authorized workspace.",
    category: "Applications",
    scope: "Workspace",
  },
  {
    id: "permission-users-manage",
    key: "users.manage",
    name: "Manage users",
    description: "Invite, suspend, and manage organization memberships.",
    category: "Users",
    scope: "Organization",
  },
  {
    id: "permission-crm-records",
    key: "crm.records.manage",
    name: "Manage CRM records",
    description: "Create and update authorized CRM records and activities.",
    category: "CRM",
    scope: "Workspace",
  },
  {
    id: "permission-properties-publish",
    key: "properties.publish",
    name: "Publish properties",
    description: "Approve property inventory for customer-facing distribution.",
    category: "Properties",
    scope: "Workspace",
  },
  {
    id: "permission-ai-employees",
    key: "ai.employees.manage",
    name: "Manage AI employees",
    description: "Configure governed AI employees, tools, and knowledge access.",
    category: "AI",
    scope: "Organization",
  },
  {
    id: "permission-marketing-publish",
    key: "marketing.content.publish",
    name: "Publish marketing content",
    description: "Approve and publish governed marketing experiences.",
    category: "Marketing",
    scope: "Organization",
  },
  {
    id: "permission-billing-manage",
    key: "billing.subscription.manage",
    name: "Manage subscriptions",
    description: "Administer plans, entitlements, and subscription lifecycle.",
    category: "Billing",
    scope: "Organization",
  },
  {
    id: "permission-security-review",
    key: "security.activity.review",
    name: "Review security activity",
    description: "Inspect authorized security events and access reviews.",
    category: "Security",
    scope: "Organization",
  },
  {
    id: "permission-developer-clients",
    key: "developer.clients.manage",
    name: "Manage developer clients",
    description: "Configure approved application clients and event subscriptions.",
    category: "Developer",
    scope: "Organization",
  },
  {
    id: "permission-marketplace-install",
    key: "marketplace.modules.install",
    name: "Install marketplace modules",
    description: "Review and install approved extensions into an organization.",
    category: "Marketplace",
    scope: "Organization",
  },
];

export const permissionFilters = [
  {
    id: "permission-scope",
    label: "Scope",
    options: [
      { label: "Platform", value: "platform" },
      { label: "Organization", value: "organization" },
      { label: "Workspace", value: "workspace" },
      { label: "Own", value: "own" },
    ],
  },
];
