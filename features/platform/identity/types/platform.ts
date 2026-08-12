import type { PlatformApplication } from "../../applications/types/application";

export type { PlatformApplication };

export type OrganizationStatus = "Active" | "Provisioning" | "Suspended";
export type WorkspaceStatus = "Operational" | "Setup" | "Maintenance";
export type UserStatus = "Active" | "Invited" | "Suspended";
export type RoleStatus = "System" | "Custom" | "Draft";
export type PermissionScope =
  | "Platform"
  | "Organization"
  | "Workspace"
  | "Own";

export interface Organization {
  id: string;
  name: string;
  workspaceCount: number;
  userCount: number;
  applicationCount: number;
  status: OrganizationStatus;
  country: string;
  region: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  organization: string;
  userCount: number;
  applications: string[];
  status: WorkspaceStatus;
  environment: "Production" | "Staging" | "Development";
}

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarTone: string;
  role: string;
  organization: string;
  workspace: string;
  status: UserStatus;
  lastActive: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  scope: PermissionScope;
  status: RoleStatus;
}

export interface Permission {
  id: string;
  key: string;
  name: string;
  description: string;
  category:
    | "Applications"
    | "Users"
    | "CRM"
    | "Properties"
    | "AI"
    | "Marketing"
    | "Billing"
    | "Security"
    | "Developer"
    | "Marketplace";
  scope: PermissionScope;
}
