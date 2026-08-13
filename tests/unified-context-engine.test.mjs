import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("context engine supports every approved business object", () => {
  const source = read("features/platform/context-engine/domain/contracts.ts");
  for (const type of ["contact", "company", "lead", "deal", "property", "campaign", "task", "document", "meeting", "communication", "calendar-event", "universal-object"]) assert.match(source, new RegExp(`\"${type}\"`));
});

test("assembly composes every approved source through existing contracts", () => {
  const domain = read("features/platform/context-engine/domain/contracts.ts");
  const assembler = read("features/platform/context-engine/assemblers/unified-context.assembler.ts");
  assert.match(domain, /business-timeline/);
  assert.match(domain, /universal-objects/);
  for (const source of ["relationships", "documents", "communications", "growth", "executive-home", "workforce", "intelligence"]) assert.match(assembler, new RegExp(source));
  assert.match(domain, /CanonicalBusinessEvent/);
  assert.match(domain, /UniversalObject/);
  assert.match(domain, /UniversalRelationship/);
});

test("unavailable source data remains explicit and empty", () => {
  const utility = read("features/platform/context-engine/assemblers/utilities.ts");
  const viewModel = read("features/platform/context-engine/view-models/context.view-model.ts");
  assert.match(utility, /Awaiting connected business data\./);
  assert.match(utility, /items: Object\.freeze\(\[\]\)/);
  assert.match(viewModel, /createUnavailableContextViewModel/);
  assert.match(viewModel, /state: "awaiting-data"/);
});

test("unified panel renders every requested context surface", () => {
  const source = read("features/platform/context-engine/view-models/context.view-model.ts");
  for (const section of ["summary", "timeline", "relationships", "documents", "communications", "tasks", "meetings", "campaigns", "attachments", "related-objects", "workforce", "recommendations", "business-health"]) assert.match(source, new RegExp(`\"${section}\"`));
  assert.match(read("features/platform/context-engine/components/ContextPanel.tsx"), /UnifiedContextPanel/);
});

test("context tabs cover all approved views", () => {
  const source = read("features/platform/context-engine/view-models/context.view-model.ts");
  for (const tab of ["overview", "timeline", "relationships", "documents", "communications", "activities", "attachments", "insights"]) assert.match(source, new RegExp(`id: \"${tab}\"`));
});

test("navigation exposes reusable slide-over and side-panel variants", () => {
  assert.match(read("features/platform/context-engine/components/ContextSlideOver.tsx"), /export function ContextSlideOver/);
  assert.match(read("features/platform/context-engine/components/ContextSidePanel.tsx"), /export function ContextSidePanel/);
  assert.match(read("app/vayon/context/page.tsx"), /ContextEngineDashboard/);
  assert.match(read("features/platform/builder/config/vayon-navigation.ts"), /href: "\/vayon\/context"/);
});

test("context engine performs no writes AI calls APIs or fabricated data", () => {
  const files = ["contracts/ports.ts", "services/context-engine.service.ts", "storage/in-memory-snapshot.reader.ts", "assemblers/unified-context.assembler.ts", "view-models/context.view-model.ts"].map(file => read(`features/platform/context-engine/${file}`)).join("\n");
  assert.doesNotMatch(files, /fetch\(|axios|createClient|supabase|\.from\(|\.rpc\(|insert\(|update\(|delete\(|upsert\(|set\(|push\(|localStorage|indexedDB|openai|anthropic|gemini|generateText/i);
  assert.doesNotMatch(files, /revenue:\s*\d|score:\s*\d|confidence:\s*\d|count:\s*\d/);
});

test("release documentation and ADR are registered", () => {
  assert.match(read("docs/RELEASE_1_5_UNIFIED_CONTEXT_ENGINE.md"), /Release 1\.5/);
  assert.match(read("docs/adr/ADR-0015-unified-context-engine.md"), /# ADR-0015/);
});
