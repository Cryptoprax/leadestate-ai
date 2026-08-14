import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("property platform has tenant scoped production and Aurora repositories", () => {
  const contract = read(
      "features/vayon/property-platform/contracts/repository.ts",
    ),
    production = read(
      "features/vayon/property-platform/repositories/supabase.repository.ts",
    ),
    aurora = read(
      "features/vayon/property-platform/repositories/aurora.repository.ts",
    );
  assert.match(contract, /PropertyAssetRepository/);
  assert.match(production, /organization_id/);
  assert.match(production, /workspace_id/);
  assert.match(aurora, /auroraProperties\.map/);
  assert.match(aurora, /auroraLeads/);
  assert.match(aurora, /auroraBusinessActivity\.communications/);
  assert.match(aurora, /auroraMeetings/);
});

test("property model covers the complete asset lifecycle", () => {
  const source = read("features/vayon/property-platform/domain/models.ts");
  for (const value of [
    "referenceCode",
    "available",
    "reserved",
    "under-negotiation",
    "sold",
    "inactive",
    "archived",
    "coordinates",
    "gallery",
    "floorPlans",
    "videos",
    "documents",
    "timeline",
    "createdAt",
    "updatedAt",
  ])
    assert.match(source, new RegExp(value));
});

test("relationship model covers CRM Communications Calendar and Workflow", () => {
  const source = read("features/vayon/property-platform/domain/models.ts");
  for (const value of [
    "interestedLeads",
    "customers",
    "deals",
    "recentActivity",
    "meetings",
    "siteVisits",
    "tasks",
    "reminders",
    "conversations",
    "templates",
    "campaigns",
    "notifications",
    "approvalHistory",
    "workflows",
    "pendingActions",
  ])
    assert.match(source, new RegExp(value));
});

test("property analytics remain evidence safe", () => {
  const source = read(
    "features/vayon/property-platform/services/property-platform.service.ts",
  );
  for (const value of [
    "views",
    "interestedBuyers",
    "conversionRate",
    "averageDaysListed",
    "meetingCount",
    "offerCount",
    "statusChanges",
    "Awaiting connected view data",
    "Awaiting connected offer data",
    "Awaiting Timeline data",
  ])
    assert.match(source, new RegExp(value));
});

test("property assistance is deterministic and non executable", () => {
  const source = read(
    "features/vayon/property-platform/services/property-platform.service.ts",
  );
  for (const value of [
    "buyer-match",
    "pricing",
    "summary",
    "recommended-buyers",
    "follow-up",
    "demand",
  ])
    assert.match(source, new RegExp(value));
  assert.match(source, /deterministic:\s*true/);
  assert.match(source, /executionAllowed:\s*false/);
  assert.doesNotMatch(source, /openai|anthropic|gemini|fetch\(/i);
});

test("document management is read only", () => {
  const model = read("features/vayon/property-platform/domain/models.ts"),
    production = read(
      "features/vayon/property-platform/repositories/supabase.repository.ts",
    );
  for (const value of [
    "brochure",
    "floor-plan",
    "image",
    "video",
    "contract",
    "approval",
    "certificate",
    "readOnly",
  ])
    assert.match(model, new RegExp(value));
  assert.doesNotMatch(production, /insert\(|update\(|delete\(|rpc\(/);
});

test("property governance blocks MLS and execution", () => {
  const source = read(
    "features/vayon/property-platform/services/property-platform.service.ts",
  );
  assert.match(source, /executionAllowed:\s*false/);
  assert.match(source, /externalMLSConnected:\s*false/);
  assert.match(source, /approvalRequired:\s*true/);
});

test("all additive property routes exist while existing profile remains", () => {
  for (const route of ["grid", "map", "availability", "documents", "analytics"])
    assert.doesNotThrow(() => read(`app/vayon/properties/${route}/page.tsx`));
  assert.doesNotThrow(() => read("app/vayon/properties/page.tsx"));
  assert.doesNotThrow(() => read("app/vayon/properties/[propertyId]/page.tsx"));
});

test("property routes share server components and snapshots", () => {
  const route = read(
      "features/vayon/property-platform/dashboard/PropertyRoute.tsx",
    ),
    service = read(
      "features/vayon/property-platform/services/property-platform.service.ts",
    ),
    ui = read("features/vayon/property-platform/components/PropertyViews.tsx");
  assert.match(route, /PropertyPlatformRoute/);
  assert.match(service, /Promise\.all/);
  assert.match(ui, /next\/image/);
  assert.match(ui, /content-visibility:auto/);
});

test("property documentation records extension and safety boundaries", () => {
  const source = read("docs/PROPERTY_PLATFORM.md");
  for (const value of [
    "Architecture",
    "Property model",
    "Relationship model",
    "Analytics",
    "AI Workforce assistance",
    "Workflow governance",
    "Future MLS integration strategy",
    "Sprint 32 recommendation",
  ])
    assert.match(source, new RegExp(value, "i"));
});
