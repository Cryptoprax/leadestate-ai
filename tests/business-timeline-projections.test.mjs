import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("workspace projections support workspace department user and category scopes", () => {
  const contracts = read("features/platform/business-timeline/projections/live-contracts.ts");
  const service = read("features/platform/business-timeline/projections/live-projection.service.ts");
  for (const scope of ["workspace", "department", "user", "category"]) assert.match(contracts, new RegExp(`kind: \"${scope}\"`));
  assert.match(service, /owner\.kind === "team"/);
  assert.match(service, /order: "chronological"/);
});

test("object timelines use canonical subject and related object references", () => {
  const contracts = read("features/platform/business-timeline/projections/live-contracts.ts");
  const service = read("features/platform/business-timeline/projections/live-projection.service.ts");
  for (const object of ["contact", "company", "property", "lead", "deal", "document", "task", "campaign"]) assert.match(contracts, new RegExp(object));
  assert.match(service, /event\.subject\.objectId/);
  assert.match(service, /event\.relatedObjects\.some/);
  assert.doesNotMatch(service, /UniversalObjectBase|createClient|supabase/i);
});

test("correlation explorer models chains causation and related objects", () => {
  const source = read("features/platform/business-timeline/services/correlation.service.ts");
  for (const term of ["correlationId", "causationId", "relatedObjects", "complete", "origin", "caused", "correlated"]) assert.match(source, new RegExp(term));
});

test("journey view derives origin intermediate current and outcome", () => {
  const source = read("features/platform/business-timeline/services/journey.service.ts");
  for (const stage of ["origin", "intermediate", "current", "outcome"]) assert.match(source, new RegExp(stage));
});

test("filters cover every approved structured dimension", () => {
  const source = read("features/platform/business-timeline/projections/live-contracts.ts");
  for (const field of ["from", "to", "categories", "priorities", "severities", "actorId", "workspaceId", "object", "correlationId"]) assert.match(source, new RegExp(`readonly ${field}`));
});

test("event inspector exposes envelope lineage classification integrity and validation", () => {
  const source = read("features/platform/business-timeline/components/live/EventInspector.tsx");
  for (const value of ["Canonical envelope", "Correlation & causation", "Classification & integrity", "Validation", "Tenant scope", "Immutability"]) assert.match(source, new RegExp(value));
});

test("projection dashboard covers status replay sequences and validation", () => {
  const source = read("features/platform/business-timeline/components/live/ProjectionDashboard.tsx");
  for (const value of ["Projection dashboard", "Replay", "Sequence", "Validation"]) assert.match(source, new RegExp(value));
});

test("live experience has no external APIs AI database event generation or mutations", () => {
  const files = ["components/live/TimelineExperience.tsx", "projections/live-projection.service.ts", "services/correlation.service.ts", "services/journey.service.ts"].map(path => read(`features/platform/business-timeline/${path}`)).join("\n");
  assert.doesNotMatch(files, /fetch\(|axios|createClient|supabase|\.from\(|\.rpc\(|openai|anthropic|gemini|\.append\(|generateEvent|publish\(/i);
  const route = read("app/vayon/timeline/page.tsx");
  assert.match(route, /organization\?\[\]:auroraTimelineHistory\.events/);
  assert.match(route, /OrganizationService/);
  assert.match(read("docs/RELEASE_1_2_BUSINESS_TIMELINE_PROJECTIONS.md"), /Release 1\.2/);
  assert.match(read("docs/adr/ADR-0012-business-timeline-projections.md"), /# ADR-0012/);
});
