import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { auditThemeTokens } from "../scripts/audit-theme-tokens.mjs";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("application UI has no hardcoded theme colors", async () => {
  assert.deepEqual(await auditThemeTokens(fileURLToPath(new URL("..", import.meta.url))), []);
});

test("semantic tokens cover application appearance states", async () => {
  const css = await read("features/platform/design-system/tokens/vds.css");
  for (const token of ["surface-hover", "input", "secondary", "divider", "selection", "scrollbar", "skeleton", "tooltip", "disabled", "overlay"]) {
    assert.match(css, new RegExp(`--vds-(?:color-)?${token}`));
  }
  assert.match(css, /\[data-vds-theme="light"\]/);
  assert.match(css, /\[data-vds-theme="dark"\]/);
});

test("dark light and system switching remains live and persisted", async () => {
  const provider = await read("features/platform/design-system/theme/ThemeProvider.tsx");
  assert.match(provider, /media = "\(prefers-color-scheme: dark\)"/);
  assert.match(provider, /matchMedia\(media\)/);
  assert.match(provider, /localStorage\.setItem/);
  assert.match(provider, /resolved: VdsResolvedTheme/);
});

test("universal bar uses semantic overlay surface form and focus tokens", async () => {
  const source = await read("features/vayon/universal-bar/components/UniversalBar.tsx");
  for (const token of ["bg-vds-overlay", "bg-vds-surface", "text-vds-foreground", "placeholder:text-vds-subtle", "outline-vds-focus"]) assert.match(source, new RegExp(token));
});

test("executive home cards forms and dialogs use semantic VDS styling", async () => {
  const sources = await Promise.all([
    "features/vayon/executive-home/components/ExecutiveHome.tsx",
    "features/platform/design-system/components/core/Surfaces.tsx",
    "features/platform/design-system/components/forms/Fields.tsx",
    "features/platform/design-system/components/disclosure/Disclosure.tsx",
  ].map(read));
  const combined = sources.join("\n");
  assert.match(combined, /bg-vds-(?:surface|elevated|input)/);
  assert.match(combined, /border-vds-border/);
  assert.match(combined, /text-vds-(?:foreground|muted|subtle)/);
});

test("global accessibility supports focus reduced motion selection and scrollbars", async () => {
  const [globalCss, tokenCss] = await Promise.all([read("app/globals.css"), read("features/platform/design-system/tokens/vds.css")]);
  assert.match(globalCss, /focus-visible/);
  assert.match(globalCss, /scrollbar-color:var\(--vds-color-scrollbar\)/);
  assert.match(globalCss, /::selection/);
  assert.match(globalCss + tokenCss, /prefers-reduced-motion/);
});
