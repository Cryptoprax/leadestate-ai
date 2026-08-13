import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("brain core exposes the complete orchestration contract", () => {
  const source = read("features/platform/intelligence/brain/domain/contracts.ts");
  for (const contract of ["BrainContext", "BrainRequest", "BrainResponse", "BrainDecision", "BrainReason", "BrainAction", "BrainObservation", "BrainSession", "BrainPipeline", "BrainCapability", "BrainState", "BrainTrace", "BrainExplanation", "BrainReference", "BrainCitation", "BrainConfidence", "BrainIntent", "BrainGoal", "BrainPlan", "BrainResult"]) assert.match(source, new RegExp(`interface ${contract}|type ${contract}`));
});
test("reasoning pipeline contains every governed stage and no provider calls", () => {
  const source = read("features/platform/intelligence/brain/pipelines/reasoning-pipeline.ts");
  for (const stage of ["observe", "understand", "collect-context", "resolve-memory", "resolve-knowledge", "resolve-events", "resolve-permissions", "resolve-recommendations", "resolve-predictions", "build-context", "build-prompt", "generate-decision", "generate-explanation", "generate-result"]) assert.match(source, new RegExp(stage));
  assert.doesNotMatch(source, /fetch\(|new OpenAI|Anthropic|Gemini|supabase|\.from\(|\.rpc\(/i);
});
test("brain gateway is the single workforce entry point", () => {
  const gateway = read("features/platform/intelligence/brain/gateway/brain-gateway.ts");
  const workforce = read("features/platform/intelligence/brain/workforce/contracts.ts");
  assert.match(gateway, /VayonBrainGateway/); assert.match(gateway, /pipeline\.run/);
  for (const role of ["ceo", "sales-director", "sales-executive", "receptionist", "operations", "finance", "legal", "marketing", "customer-success", "property-advisor", "recruiter", "support"]) assert.match(workforce, new RegExp(role));
  assert.match(workforce, /BrainContext/); assert.match(workforce, /BrainResponse/); assert.match(workforce, /execute\?: never/);
});
test("explainability exposes evidence and limitations", () => {
  const source = read("features/platform/intelligence/brain/services/explainability.ts");
  for (const field of ["evidence", "dataSources", "objectsUsed", "memoryUsed", "knowledgeUsed", "recommendationsUsed", "predictionsUsed", "limitations"]) assert.match(source, new RegExp(field));
});
test("brain dashboard and documentation are registered", () => {
  assert.match(read("features/platform/builder/config/vayon-navigation.ts"), /href: "\/vayon\/brain"/);
  assert.match(read("app/vayon/brain/page.tsx"), /BrainDashboard/);
  assert.match(read("docs/RELEASE_0_6_5_VAYON_BRAIN.md"), /Vayon Brain/);
  assert.match(read("docs/adr/ADR-0006-vayon-brain.md"), /# ADR-0006/);
});

