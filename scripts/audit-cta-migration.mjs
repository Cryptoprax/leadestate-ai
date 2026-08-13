import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const roots = ["app", "features", "components"];
const vdsImplementation = "features/platform/design-system/";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}

export async function auditCtaMigration(cwd = process.cwd()) {
  const violations = [];
  const files = (await Promise.all(roots.map(root => walk(join(cwd, root))))).flat();
  for (const file of files) {
    if (extname(file) !== ".tsx") continue;
    const name = relative(cwd, file).split(sep).join("/");
    const source = await readFile(file, "utf8");
    if (!name.startsWith(vdsImplementation) && /<button\b/.test(source)) violations.push(`${name}: native <button> outside VDS`);
    if (source.includes("@/components/ui/Button")) violations.push(`${name}: legacy Button import`);
    for (const pattern of [/text-white/g, /bg-(?:cyan|sky|blue)-/g, /bg-vds-primary text-vds-foreground/g]) {
      if (pattern.test(source)) violations.push(`${name}: forbidden CTA color ${pattern.source}`);
    }
  }
  return violations;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const violations = await auditCtaMigration();
  if (violations.length) {
    console.error(violations.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("CTA migration audit passed: application actions consume VDS and accent foregrounds are semantic.");
  }
}
