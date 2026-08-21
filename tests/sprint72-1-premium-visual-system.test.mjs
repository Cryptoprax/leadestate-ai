import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("premium canvas is shared by every top-level application shell", async () => {
  const sources = await Promise.all([
    read("features/marketing/components/MarketingShell.tsx"),
    read("features/vayon/components/ProductExperience.tsx"),
    read("features/dashboard/components/MissionControlLayout.tsx"),
  ]);
  for (const source of sources) assert.match(source, /vayon-premium-canvas/);
});

test("visual system provides continuous gradients, texture, glass, and ambient light", async () => {
  const source = (await Promise.all([
    read("app/globals.css"),
    read("features/platform/design-system/tokens/vds.css"),
  ])).join("\n");
  for (const pattern of [
    /background-attachment:fixed/,
    /background-size:72px 72px/,
    /backdrop-filter:blur/,
    /vayon-ambient-drift/,
    /--vds-ambient-ai/,
    /--vds-ambient-warm/,
  ]) assert.match(source, pattern);
});

test("premium motion remains responsive and accessibility safe", async () => {
  const source = await read("app/globals.css");
  assert.match(source, /@media \(max-width:40rem\)/);
  assert.match(source, /@media \(prefers-reduced-motion:reduce\)/);
  assert.match(source, /translate3d/);
});

test("visual tokens preserve semantic dark and light theme support", async () => {
  const source = await read("features/platform/design-system/tokens/vds.css");
  assert.match(source, /--vds-glass-surface:/);
  assert.match(source, /\[data-vds-theme="light"\]/);
  assert.match(source, /--vds-ambient-primary:/);
});
