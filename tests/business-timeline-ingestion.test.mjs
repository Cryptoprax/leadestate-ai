import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("event factory supports every approved subject through immutable proposals", () => {
  const contracts = read("features/platform/business-timeline/ingestion/contracts.ts");
  const factory = read("features/platform/business-timeline/ingestion/event.factory.ts");
  for (const subject of ["lead", "deal", "property", "contact", "company", "task", "document", "campaign", "communication", "calendar", "note", "attachment", "workforce-recommendation", "configuration"]) assert.match(contracts, new RegExp(subject));
  assert.match(factory, /immutable\(/);
  assert.match(factory, /Object\.freeze/);
  assert.doesNotMatch(factory, /createClient|supabase|fetch\(|axios|\.from\(|\.rpc\(/i);
});

test("mapping registry owns aliases canonical names and versions", () => {
  const source = read("features/platform/business-timeline/ingestion/event-mapping.registry.ts");
  for (const mapping of ["lead.created", "sales.lead.created", "deal.closed", "sales.deal.closed", "property.published", "campaign.saved", "document.uploaded", "meeting.scheduled"]) assert.match(source, new RegExp(mapping.replaceAll(".", "\\.")));
  assert.match(source, /eventVersion: 1/);
  assert.match(source, /envelopeVersion: 1/);
});

test("hub adapters expose event creation methods without production hooks", () => {
  const adapters = ["sales-hub.adapter.ts", "growth-hub.adapter.ts", "communication-hub.adapter.ts", "configuration.adapter.ts", "universal-objects.adapter.ts"].map(file => read(`features/platform/business-timeline/ingestion/adapters/${file}`)).join("\n");
  for (const adapter of ["SalesHubEventAdapter", "GrowthHubEventAdapter", "CommunicationHubEventAdapter", "ConfigurationEventAdapter", "UniversalObjectsEventAdapter"]) assert.match(adapters, new RegExp(adapter));
  assert.doesNotMatch(adapters, /useEffect|subscribe|registerHook|addEventListener|createClient|supabase|fetch\(|axios|publish\(/i);
});

test("factory carries tenant workspace idempotency and envelope validation inputs", () => {
  const source = read("features/platform/business-timeline/ingestion/event.factory.ts");
  for (const field of ["organizationId", "workspaceId", "idempotencyKey", "eventVersion", "envelopeVersion"]) assert.match(source, new RegExp(field));
  assert.match(read("features/platform/business-timeline/ingestion/preview-ingestion.ts"), /CanonicalEventValidator/);
  assert.match(read("features/platform/business-timeline/ingestion/preview-ingestion.ts"), /BusinessTimelineService/);
});

test("timeline preview is explicit deterministic local and metric free", () => {
  const source = read("features/platform/business-timeline/ingestion/preview-ingestion.ts");
  assert.match(source, /preview-organization/);
  assert.match(source, /preview-event-/);
  assert.match(source, /payload: Object\.freeze\(\{ preview: true \}\)/);
  assert.doesNotMatch(source, /revenue|conversion|pipelineValue|amount|currency|randomUUID|Date\.now/);
  assert.match(read("features/platform/business-timeline/components/live/TimelineExperience.tsx"), /Load architecture preview/);
});

test("ingestion remains local with no APIs brokers AI or durable persistence", () => {
  const files = ["contracts.ts", "event.factory.ts", "event-mapping.registry.ts", "preview-ingestion.ts", "adapters/base.adapter.ts", "adapters/sales-hub.adapter.ts", "adapters/growth-hub.adapter.ts", "adapters/communication-hub.adapter.ts", "adapters/configuration.adapter.ts", "adapters/universal-objects.adapter.ts"].map(file => read(`features/platform/business-timeline/ingestion/${file}`)).join("\n");
  assert.doesNotMatch(files, /fetch\(|axios|createClient|supabase|postgres|kafka|eventbridge|openai|anthropic|gemini|localStorage|indexedDB|\.from\(|\.rpc\(/i);
});

test("release documentation and ADR are registered", () => {
  assert.match(read("docs/RELEASE_1_3_EVENT_INGESTION.md"), /Release 1\.3/);
  assert.match(read("docs/adr/ADR-0013-event-ingestion.md"), /# ADR-0013/);
});
