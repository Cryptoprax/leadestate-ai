export type IdentityModuleIcon =
  | "identity"
  | "authentication"
  | "organizations"
  | "users"
  | "roles"
  | "permissions"
  | "audit"
  | "future";

export interface IdentityDashboardItem {
  id: string;
  title: string;
  description: string;
  value: string;
  status: string;
  iconName: IdentityModuleIcon;
  tone: string;
}

export const identityDashboardItems: IdentityDashboardItem[] = [
  {
    id: "identity-platform",
    title: "Identity Platform",
    description: "Shared identity contracts and lifecycle architecture.",
    value: "Foundation",
    status: "Ready",
    iconName: "identity",
    tone: "bg-cyan-400",
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Future sign-in, sessions, MFA, recovery, and federation.",
    value: "Architecture",
    status: "Future",
    iconName: "authentication",
    tone: "bg-blue-400",
  },
  {
    id: "organizations",
    title: "Organizations",
    description: "Tenant lifecycle, hierarchy, policy, and administration.",
    value: "Multi-tenant",
    status: "Ready",
    iconName: "organizations",
    tone: "bg-violet-400",
  },
  {
    id: "users",
    title: "Users",
    description: "Global identities, memberships, profiles, and sessions.",
    value: "Directory",
    status: "Ready",
    iconName: "users",
    tone: "bg-emerald-400",
  },
  {
    id: "roles",
    title: "Roles",
    description: "Reusable role definitions and delegated scopes.",
    value: "RBAC",
    status: "Ready",
    iconName: "roles",
    tone: "bg-amber-400",
  },
  {
    id: "permissions",
    title: "Permissions",
    description: "Capability catalog, resource scope, and policy contracts.",
    value: "Default deny",
    status: "Ready",
    iconName: "permissions",
    tone: "bg-fuchsia-400",
  },
  {
    id: "audit-logs",
    title: "Audit Logs",
    description: "Immutable evidence for significant identity activity.",
    value: "Auditable",
    status: "Planned",
    iconName: "audit",
    tone: "bg-rose-400",
  },
  {
    id: "future-status",
    title: "Future Status",
    description: "Enterprise SSO, directories, risk, and identity governance.",
    value: "Extensible",
    status: "Roadmap",
    iconName: "future",
    tone: "bg-slate-400",
  },
];
