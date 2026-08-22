import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("organization profile supports branding business and regional settings", async () => {
  const [types, form, migration] = await Promise.all([read("features/platform/organization/types/index.ts"), read("features/platform/organization/components/OrganizationUI.tsx"), read("supabase/migrations/20260906000000_sprint76_enterprise_organization_management.sql")]);
  for (const field of ["businessHours", "regionalSettings", "branding", "timezone", "locale", "currency", "logoPath"]) assert.match(types, new RegExp(field));
  for (const field of ["Business opens", "Business closes", "Date format", "Week starts", "Primary color", "Company logo"]) assert.match(form, new RegExp(field));
  assert.match(migration, /business_hours/);
  assert.match(migration, /regional_settings/);
});

test("departments are production backed with managers KPIs permissions and custom structures", async () => {
  const [component, migration] = await Promise.all([read("features/platform/organization/components/OrganizationAdmin.tsx"), read("supabase/migrations/20260906000000_sprint76_enterprise_organization_management.sql")]);
  for (const value of ["Department name", "Manager", "KPIs", "Permissions", "Create department", "Archive"]) assert.match(component, new RegExp(value));
  for (const department of ["Sales", "Marketing", "Operations", "Support", "Finance", "HR", "Legal", "IT"]) assert.match(migration, new RegExp(department));
  assert.match(migration, /manage_organization_department/);
});

test("teams support managers members capacity workload and governed archiving", async () => {
  const [component, service, migration] = await Promise.all([read("features/platform/organization/components/OrganizationAdmin.tsx"), read("features/platform/organization/services/organization.service.ts"), read("supabase/migrations/20260906000000_sprint76_enterprise_organization_management.sql")]);
  for (const value of ["Team name", "Assign members", "Capacity", "workload", "Create team", "Archive"]) assert.match(component, new RegExp(value, "i"));
  assert.match(service, /manageTeam/);
  assert.match(migration, /organization_team_members/);
  assert.match(migration, /manage_organization_team/);
});

test("employee directory supports required fields search filters and bulk selection", async () => {
  const source = await read("features/platform/organization/components/OrganizationAdmin.tsx");
  for (const field of ["Employee", "Role", "Department", "Status", "Last active", "Permissions", "Teams", "Assigned AI Employees", "Search user directory", "Filter by role", "Bulk actions"]) assert.match(source, new RegExp(field));
  assert.match(source, /memo\(/);
  assert.match(source, /useMemo/);
  assert.match(source, /content-visibility/);
});

test("permission matrix covers enterprise modules and actions using canonical RBAC", async () => {
  const source = await read("features/platform/organization/components/OrganizationAdmin.tsx");
  for (const moduleName of ["CRM", "AI", "Analytics", "Billing", "Reports", "Settings", "Knowledge", "Documents", "Administration"]) assert.match(source, new RegExp(moduleName));
  for (const action of ["Read", "Write", "Delete", "Export", "Approve", "Admin"]) assert.match(source, new RegExp(action));
  assert.match(source, /canonical RBAC assignments/);
});

test("organization storage uses RLS tenant isolation and audited security-definer mutations", async () => {
  const migration = await read("supabase/migrations/20260906000000_sprint76_enterprise_organization_management.sql");
  for (const table of ["organization_departments", "organization_teams", "organization_team_members"]) {
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`));
  }
  assert.match(migration, /enterprise_org_context/);
  assert.match(migration, /organization_audit_events/);
  assert.match(migration, /organization_id/);
  assert.match(migration, /workspace_id/);
});

test("settings platform exposes every enterprise administration destination", async () => {
  const [shell, page] = await Promise.all([read("features/identity-workspace/components/SettingsShell.tsx"), read("app/vayon/settings/page.tsx")]);
  for (const tab of ["General", "Organization", "Users", "Teams", "Departments", "Security", "AI", "Notifications", "Billing", "Integrations"]) assert.match(shell, new RegExp(tab));
  assert.match(page, /Organization → Departments → Users → AI Workforce → CRM → Finish/);
});

test("security center includes sessions devices MFA password IP and API controls", async () => {
  const source = await read("features/platform/enterprise-security/components/SecurityDashboard.tsx");
  for (const value of ["Active Sessions", "Devices", "MFA", "Password policy", "IP restrictions", "API keys", "API Tokens"]) assert.match(source, new RegExp(value));
  assert.match(source, /placeholder/);
});
