import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { auditThemeTokens } from "./audit-theme-tokens.mjs";
import { auditCommercialReadiness } from "./audit-commercial-readiness.mjs";
import { auditCtaMigration } from "./audit-cta-migration.mjs";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}

function routeFromFile(file) {
  const route = file.replaceAll("\\", "/").replace(/^app/, "").replace(/\/page\.tsx$/, "").replace(/\/\[([^/]+)\]/g, "/:$1");
  return route || "/";
}

export async function certifyProduct(cwd = process.cwd()) {
  const routeRoot = join(cwd, "app/vayon");
  const routeFiles = (await walk(routeRoot)).filter(file => file.endsWith(`${sep}page.tsx`) || file.endsWith("/page.tsx"));
  const routes = routeFiles.map(file => routeFromFile(relative(cwd, file))).sort();
  const [theme, ux, cta] = await Promise.all([auditThemeTokens(cwd), auditCommercialReadiness(cwd), auditCtaMigration(cwd)]);
  const sourceFiles = (await walk(join(cwd, "features"))).filter(file => file.endsWith(".tsx"));
  const largeComponents = [];
  for (const file of sourceFiles) {
    const metadata = await stat(file);
    if (metadata.size >= 12_000) largeComponents.push({ file: relative(cwd, file).split(sep).join("/"), bytes: metadata.size });
  }
  const shell = await readFile(join(cwd, "features/vayon/components/ProductExperience.tsx"), "utf8");
  const evidence = Object.freeze({
    routeCount: routes.length,
    themeAuditPassed: theme.length === 0,
    uxAuditPassed: ux.length === 0,
    ctaAuditPassed: cta.length === 0,
    shellNavigationPresent: /ShellSidebar/.test(shell) && /ShellHeader/.test(shell) && /UniversalBar/.test(shell),
    visualRuntimeVerified: false,
    screenshotsVerified: 0,
  });
  return Object.freeze({
    evidence,
    routes: Object.freeze(routes.map(route => Object.freeze({ route, status: "WARNING", reason: "Compiled and source-audited; authenticated visual runtime and screenshots not verified." }))),
    largeComponents: Object.freeze(largeComponents),
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await certifyProduct();
  const failed = !result.evidence.themeAuditPassed || !result.evidence.uxAuditPassed || !result.evidence.ctaAuditPassed || !result.evidence.shellNavigationPresent || result.evidence.routeCount === 0;
  if (failed) {
    console.error(JSON.stringify(result, null, 2));
    process.exitCode = 1;
  } else {
    console.log(`Product certification gate passed: ${result.evidence.routeCount} authenticated routes compiled/source-audited; all remain WARNING pending authenticated visual verification.`);
  }
}
