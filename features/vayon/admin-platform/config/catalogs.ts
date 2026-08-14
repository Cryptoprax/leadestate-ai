import type { AdminModule, AdminRole, RoleDefinition } from "../domain/models";
export const adminRoles: readonly AdminRole[] = [
  "Administrator",
  "Manager",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "Legal",
  "Support",
];
export const adminModules: readonly AdminModule[] = [
  "CRM Access",
  "Property Access",
  "Deal Access",
  "Calendar Access",
  "Communications Access",
  "Workflow Approval",
  "AI Workforce",
  "Analytics",
  "Integration Access",
];
export const roleDefinitions: readonly RoleDefinition[] = adminRoles.map(
  (name, index) => ({
    id: `role-${index + 1}`,
    name,
    description: `Read-only ${name.toLowerCase()} administration profile.`,
    readOnly: true,
  }),
);
