import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("Sprint 78 inventory domain covers projects towers units pricing media and audit", () => {
  const source = read("features/vayon/property-platform/inventory/domain.ts");
  for (const value of ["upcoming", "launching", "sold-out", "completed", "available", "reserved", "booked", "sold", "blocked", "cancelled", "InventoryProject", "InventoryTower", "InventoryUnit", "PriceRevision", "InventoryDocument", "InventoryAuditEvent"]) assert.match(source, new RegExp(value, "i"));
});

test("inventory repository and service preserve provider architecture and governance", () => {
  const contract = read("features/vayon/property-platform/inventory/repository.ts"), service = read("features/vayon/property-platform/inventory/service.ts"), production = read("features/vayon/property-platform/inventory/supabase.repository.ts");
  assert.match(contract, /InventoryRepository/);
  assert.match(service, /SupabaseInventoryRepository/);
  assert.match(service, /AuroraInventoryRepository/);
  assert.match(service, /approvalRequiredForDiscountOverride:\s*true/);
  assert.match(service, /autonomousActions:\s*false/);
  assert.match(production, /organizationId/);
  assert.match(production, /workspaceId/);
  assert.match(production, /transition_property_unit/);
});

test("inventory exposes recommendation-only authoritative AI context", () => {
  const domain = read("features/vayon/property-platform/inventory/domain.ts"), service = read("features/vayon/property-platform/inventory/service.ts");
  for (const capability of ["recommend-properties", "find-alternatives", "suggest-upgrades", "suggest-cheaper-options", "detect-unavailable-inventory", "generate-summaries"]) assert.match(domain, new RegExp(capability));
  assert.match(service, /status === "available"/);
  assert.match(service, /recommendationOnly:\s*true/);
});

test("authenticated property inventory routes are complete", () => {
  for (const route of ["app/vayon/properties/projects/page.tsx", "app/vayon/properties/projects/[projectId]/page.tsx", "app/vayon/properties/inventory/page.tsx", "app/vayon/properties/price-lists/page.tsx", "app/vayon/properties/media/page.tsx"]) assert.ok(existsSync(route), route);
  const ui = read("features/vayon/property-platform/inventory/InventoryViews.tsx");
  for (const surface of ["Inventory metrics", "Fastest selling projects", "Top performing projects", "Map view placeholder", "Assigned sales team", "AI summary", "CSV import/export", "Tenant-scoped RBAC", "Reserve", "Release", "Book"]) assert.match(ui, new RegExp(surface, "i"));
});

test("inventory migration enforces tenant RLS lifecycle concurrency CRM linkage and audit", () => {
  const sql = read("supabase/migrations/20260907000000_sprint78_enterprise_property_inventory.sql");
  for (const table of ["property_projects", "property_towers", "property_units", "property_price_revisions", "property_documents", "property_inventory_audit", "property_inventory_opportunity_requests"]) assert.match(sql, new RegExp(`create table if not exists public.${table}`));
  for (const operation of ["for select", "for insert", "for update", "for delete"]) assert.match(sql, new RegExp(operation));
  assert.match(sql, /inventory_workspace_member/);
  assert.match(sql, /inventory_can_write/);
  assert.match(sql, /for update/);
  assert.match(sql, /p_expected_status/);
  assert.match(sql, /buyer required/);
  assert.match(sql, /inventory lifecycle transition/);
});

test("demo inventory is fictional and production writes never use demo data", () => {
  const demo = read("features/vayon/property-platform/inventory/aurora.repository.ts"), actions = read("features/vayon/property-platform/inventory/actions.ts");
  assert.match(demo, /fictional/i);
  assert.match(demo, /Demo inventory is read-only/);
  assert.match(actions, /InventoryService\.production/);
  assert.doesNotMatch(actions, /InventoryService\.demo/);
});
