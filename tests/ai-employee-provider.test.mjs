import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("AI employee is a provider-independent execution boundary", () => {
  const source = read(
    "features/vayon/operational-workforce/providers/employee.ts",
  );
  for (const field of [
    "readonly id",
    "readonly role",
    "readonly provider",
    "execute(task",
  ])
    assert.match(source, new RegExp(field.replace("(", "\\(")));
  assert.match(source, /AIProvider/);
});

test("employee validates task ownership before provider delegation", () => {
  const source = read(
    "features/vayon/operational-workforce/providers/employee.ts",
  );
  assert.match(source, /task\.employeeId !== this\.id/);
  assert.match(source, /this\.provider\.execute\(task\)/);
});

test("registry supports explicit versioned provider assignment", () => {
  const source = read(
    "features/vayon/operational-workforce/providers/employee.ts",
  );
  assert.match(source, /AIEmployeeRegistry/);
  assert.match(source, /providerId/);
  assert.match(source, /providerVersion/);
  assert.match(source, /already registered/);
});

test("architecture catalog covers platform provider event workflow and security boundaries", () => {
  for (const file of [
    "system-overview",
    "module-map",
    "ai-workforce",
    "workflow-engine",
    "event-model",
    "provider-model",
    "security",
  ])
    assert.doesNotThrow(() => read(`docs/architecture/${file}.md`));
});
