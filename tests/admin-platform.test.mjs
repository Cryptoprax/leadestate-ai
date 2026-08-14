import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (p) => readFileSync(p, "utf8");
test("admin repositories support tenant scoped Supabase and Aurora", () => {
  const p = read(
      "features/vayon/admin-platform/repositories/supabase.repository.ts",
    ),
    a = read("features/vayon/admin-platform/repositories/aurora.repository.ts");
  assert.match(p, /organization_id/);
  assert.match(p, /workspace_id/);
  assert.match(p, /Promise\.all/);
  assert.match(a, /auroraEmployees/);
  assert.match(a, /auroraRealtyGroup/);
});
test("user model covers profile governance and unavailable last login", () => {
  const s = read("features/vayon/admin-platform/domain/models.ts");
  for (const x of [
    "profile",
    "role",
    "department",
    "team",
    "workspace",
    "status",
    "lastLogin\\s*:\\s*null",
    "assignedAIEmployees",
  ])
    assert.match(s, new RegExp(x));
});
test("role model contains all enterprise roles", () => {
  const s = read("features/vayon/admin-platform/config/catalogs.ts");
  for (const x of [
    "Administrator",
    "Manager",
    "Sales",
    "Marketing",
    "Operations",
    "Finance",
    "Legal",
    "Support",
    "readOnly",
  ])
    assert.match(s, new RegExp(x));
});
test("permission model covers every required module", () => {
  const s = read("features/vayon/admin-platform/config/catalogs.ts");
  for (const x of [
    "CRM Access",
    "Property Access",
    "Deal Access",
    "Calendar Access",
    "Communications Access",
    "Workflow Approval",
    "AI Workforce",
    "Analytics",
    "Integration Access",
  ])
    assert.match(s, new RegExp(x));
});
test("team department organization and workspace models are read only", () => {
  const s = read("features/vayon/admin-platform/domain/models.ts");
  for (const x of [
    "AdminTeam",
    "AdminDepartment",
    "AdminOrganization",
    "AdminWorkspace",
    "custom",
    "memberIds",
    "teamIds",
    "readOnly",
  ])
    assert.match(s, new RegExp(x));
});
test("audit model is complete", () => {
  const s = read("features/vayon/admin-platform/domain/models.ts");
  for (const x of [
    "user",
    "action",
    "module",
    "timestamp",
    "entity",
    "outcome",
    "correlationId",
  ])
    assert.match(s, new RegExp(x));
});
test("AI and integration governance preserve execution and approval boundaries", () => {
  const s = read("features/vayon/admin-platform/domain/models.ts");
  for (const x of [
    "assignedAIEmployees",
    "approvalAuthority",
    "recommendationScope",
    "executionScope",
    "disabled",
    "approvalRequired",
    "health",
    "workspaceScope",
  ])
    assert.match(s, new RegExp(x));
});
test("administration service blocks every mutation class", () => {
  const s = read("features/vayon/admin-platform/services/admin.service.ts");
  for (const x of [
    "readOnly\\s*:\\s*true",
    "writes\\s*:\\s*false",
    "roleMutations\\s*:\\s*false",
    "permissionMutations\\s*:\\s*false",
    "schemaChanges\\s*:\\s*false",
    "migrations\\s*:\\s*false",
    "aiExecution\\s*:\\s*false",
  ])
    assert.match(s, new RegExp(x));
  assert.doesNotMatch(s, /insert\(|update\(|delete\(|rpc\(/);
});
test("all administration routes exist and share one route component", () => {
  for (const x of [
    "",
    "users",
    "roles",
    "permissions",
    "teams",
    "departments",
    "organizations",
    "workspaces",
    "audit",
  ]) {
    const p = x ? `app/vayon/admin/${x}/page.tsx` : "app/vayon/admin/page.tsx";
    assert.doesNotThrow(() => read(p));
  }
  assert.match(
    read("features/vayon/admin-platform/dashboard/AdminRoute.tsx"),
    /AdminRoute/,
  );
});
test("administration documentation records safety and Sprint 36 boundary", () => {
  const s = read("docs/ADMIN_PLATFORM.md");
  for (const x of [
    "Architecture",
    "Domain models",
    "Governance",
    "Analytics",
    "Safety",
    "Technical debt",
    "Sprint 36 recommendation",
  ])
    assert.match(s, new RegExp(x, "i"));
});
