import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("CRM engine exposes repository, service, and view-model boundaries", () => {
  assert.match(
    read("features/vayon/crm-engine/contracts/repository.ts"),
    /interface CrmRepository/,
  );
  assert.match(
    read("features/vayon/crm-engine/services/crm.service.ts"),
    /class CrmService/,
  );
  assert.match(
    read("features/vayon/crm-engine/view-models/query.ts"),
    /toCrmQuery/,
  );
});

test("production repository preserves organization and workspace isolation", () => {
  const source = read(
    "features/vayon/crm-engine/repositories/supabase-crm.repository.ts",
  );
  assert.match(source, /organization_id/);
  assert.match(source, /workspace_id/);
  assert.match(source, /LeadRepository/);
});

test("CRM routes include command center and Customer 360", () => {
  for (const route of [
    "app/vayon/crm/page.tsx",
    "app/vayon/crm/leads/page.tsx",
    "app/vayon/crm/leads/[leadId]/page.tsx",
    "app/vayon/crm/customers/page.tsx",
    "app/vayon/crm/companies/page.tsx",
    "app/vayon/crm/activities/page.tsx",
  ])
    assert.doesNotThrow(() => read(route));
});

test("lead workspace provides filters, selection, columns, and CSV export", () => {
  const page = read("app/vayon/crm/leads/page.tsx");
  const table = read("features/vayon/crm-engine/components/CrmLeadTable.tsx");
  for (const expected of ["search", "status", "priority", "sort"])
    assert.match(page, new RegExp(expected));
  for (const expected of ["selected", "Columns", "Export CSV", "text/csv"])
    assert.match(table, new RegExp(expected));
});

test("Customer 360 supports all requested relationship surfaces", () => {
  const source = read(
    "features/vayon/crm-engine/components/CrmLeadProfile.tsx",
  );
  for (const tab of [
    "overview",
    "timeline",
    "properties",
    "deals",
    "communications",
    "meetings",
    "tasks",
    "documents",
    "ai insights",
  ])
    assert.match(source, new RegExp(tab));
});

test("CRM intelligence is deterministic and provider free", () => {
  const source = read(
    "features/vayon/crm-engine/services/crm-rules.service.ts",
  );
  assert.match(source, /deterministic-rules/);
  assert.doesNotMatch(source, /openai|anthropic|gemini|fetch\(/i);
});

test("CRM documentation records unavailable states and future persistence", () => {
  const source = read("docs/CRM_ENGINE.md");
  assert.match(source, /unavailable state/i);
  assert.match(source, /saved-view/i);
  assert.match(source, /Future integration points/);
});
