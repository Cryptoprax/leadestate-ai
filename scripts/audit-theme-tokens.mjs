import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const roots = ["app", "components", "features", "lib"];
const extensions = new Set([".css", ".ts", ".tsx"]);
const exceptions = new Set([
  "app/manifest.ts",
  "features/platform/builder/config/branding.ts",
  "features/platform/core/themes/config/themes.ts",
  "features/platform/design-system/tokens/vds.css",
  "features/vayon/demo-workspace/config/aurora-realty-group.ts",
  "features/vayon/configuration/config/defaults.ts",
]);

const legacyUtility = /(?:bg|text|border|ring|divide|placeholder|from|via|to|shadow)-(?:slate|gray|zinc|neutral|stone|black|white|cyan|emerald|amber|rose|red|blue|violet|indigo|purple|green|yellow|orange)(?:-\d{2,3})?(?:\/[\d[\].]+)?/g;
const inlineColor = /#[\da-fA-F]{6}(?:[\da-fA-F]{2})?(?![\da-fA-F])|rgba?\((?!var\()[^)]+\)/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}

export async function auditThemeTokens(cwd = process.cwd()) {
  const files = (await Promise.all(roots.map(root => walk(join(cwd, root))))).flat();
  const violations = [];
  for (const file of files) {
    if (!extensions.has(extname(file))) continue;
    const name = relative(cwd, file).split(sep).join("/");
    if (exceptions.has(name)) continue;
    const source = await readFile(file, "utf8");
    for (const pattern of [legacyUtility, inlineColor]) {
      pattern.lastIndex = 0;
      for (const match of source.matchAll(pattern)) violations.push({ file: name, value: match[0] });
    }
  }
  return violations;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const violations = await auditThemeTokens();
  if (violations.length) {
    console.error(violations.map(item => `${item.file}: ${item.value}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Theme token audit passed: application UI uses semantic VDS colors.");
  }
}
