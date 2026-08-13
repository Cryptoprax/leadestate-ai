import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { auditCtaMigration } from "../scripts/audit-cta-migration.mjs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("all application buttons are owned by VDS", async () => {
  assert.deepEqual(await auditCtaMigration(), []);
  assert.doesNotMatch(read("components/ui/Button.tsx"), /<button\b/);
  assert.match(read("components/ui/Button.tsx"), /@deprecated/);
});

test("primary actions use the semantic accent foreground and shared interaction states", () => {
  const actions = read("features/platform/design-system/components/core/Actions.tsx");
  assert.match(actions, /bg-\[var\(--vds-color-primary\)\] text-vds-on-accent/);
  assert.match(actions, /active:brightness-95/);
  assert.match(actions, /vds-focus/);
  assert.match(actions, /ButtonLink/);
});

test("CTA enforcement is part of the release validation pipeline", () => {
  const packageMetadata = read("package.json");
  assert.match(packageMetadata, /audit:cta/);
  assert.match(packageMetadata, /npm run audit:cta/);
  assert.match(read("docs/RELEASE_1_9_1_COMPLETE_CTA_MIGRATION.md"), /177 button instances/);
});
