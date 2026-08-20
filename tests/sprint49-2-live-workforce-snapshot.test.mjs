import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("workforce snapshot consumes the existing live runtime", async () => {
  const source = await read("features/vayon/operational-workforce/services/workforce.service.ts");
  assert.match(source, /WorkforceRuntimeService\.production/);
  assert.match(source, /runtime\?\.observability/);
  assert.match(source, /runtime\.health\.state === "healthy"/);
  assert.match(source, /"processing" as const : "online" as const/);
});

test("runtime observability merges health with persisted usage", async () => {
  const service = await read("features/platform/openai/runtime/service.ts");
  const repository = await read("features/platform/openai/runtime/repository.ts");
  assert.match(service, /usageSummary/);
  assert.match(service, /health\.state === "unavailable" \? "deterministic" : "openai"/);
  for (const value of ["cost_estimate", "latency_ms", "created_at", "workspace_id", "organization_id"])
    assert.match(repository, new RegExp(value));
});

test("workforce surfaces complete provider telemetry without legacy placeholders", async () => {
  const service = await read("features/vayon/operational-workforce/services/workforce.service.ts");
  const ui = await read("features/vayon/ai-workforce/components/AIWorkforceUI.tsx");
  for (const value of ["provider", "model", "version", "latency", "queueLength", "estimatedCost", "lastResponse", "health"])
    assert.match(service + ui, new RegExp(value));
  for (const placeholder of ["Awaiting provisioning", "Local deterministic", "Awaiting runtime data"])
    assert.doesNotMatch(service + ui, new RegExp(placeholder, "i"));
});
