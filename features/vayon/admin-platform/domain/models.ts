export type AdminRole =
  | "Administrator"
  | "Manager"
  | "Sales"
  | "Marketing"
  | "Operations"
  | "Finance"
  | "Legal"
  | "Support";
export type AdminModule =
  | "CRM Access"
  | "Property Access"
  | "Deal Access"
  | "Calendar Access"
  | "Communications Access"
  | "Workflow Approval"
  | "AI Workforce"
  | "Analytics"
  | "Integration Access";
export interface AdminUser {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly profile?: string;
  readonly role: AdminRole;
  readonly department?: string;
  readonly team?: string;
  readonly workspace?: string;
  readonly status: "active" | "inactive" | "suspended" | "invited";
  readonly lastLogin: null;
  readonly assignedAIEmployees: readonly string[];
}
export interface RoleDefinition {
  readonly id: string;
  readonly name: AdminRole;
  readonly description: string;
  readonly readOnly: true;
}
export interface PermissionDefinition {
  readonly role: AdminRole;
  readonly module: AdminModule;
  readonly allowed: boolean;
  readonly source: "configured" | "unavailable";
  readonly readOnly: true;
}
export interface AdminTeam {
  readonly id: string;
  readonly name: string;
  readonly department?: string;
  readonly memberIds: readonly string[];
  readonly custom: boolean;
  readonly readOnly: true;
}
export interface AdminDepartment {
  readonly id: string;
  readonly name: string;
  readonly teamIds: readonly string[];
  readonly readOnly: true;
}
export interface AdminOrganization {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly readOnly: true;
}
export interface AdminWorkspace {
  readonly id: string;
  readonly organizationId: string;
  readonly name: string;
  readonly status: string;
  readonly readOnly: true;
}
export interface AdminAuditRecord {
  readonly id: string;
  readonly user: string;
  readonly action: string;
  readonly module: string;
  readonly timestamp: string;
  readonly entity?: string;
  readonly outcome: string;
  readonly correlationId: string;
}
export interface AIGovernance {
  readonly userId: string;
  readonly assignedAIEmployees: readonly string[];
  readonly approvalAuthority: string;
  readonly recommendationScope: string;
  readonly executionScope: "disabled";
}
export interface IntegrationGovernance {
  readonly providerId: string;
  readonly enabled: boolean;
  readonly approvalRequired: true;
  readonly health: "healthy" | "needs-attention" | "unavailable" | "unknown";
  readonly workspaceScope: string;
  readonly readOnly: true;
}
export interface AdminSnapshot {
  readonly users: readonly AdminUser[];
  readonly roles: readonly RoleDefinition[];
  readonly permissions: readonly PermissionDefinition[];
  readonly teams: readonly AdminTeam[];
  readonly departments: readonly AdminDepartment[];
  readonly organizations: readonly AdminOrganization[];
  readonly workspaces: readonly AdminWorkspace[];
  readonly audit: readonly AdminAuditRecord[];
  readonly aiGovernance: readonly AIGovernance[];
  readonly integrationGovernance: readonly IntegrationGovernance[];
  readonly source: "supabase" | "aurora";
  readonly errors: Readonly<Record<string, string>>;
}
