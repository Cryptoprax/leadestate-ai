import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("development staging and production environment definitions are credential free", () => {
  for (const environment of ["development", "staging", "production"]) {
    const source = read(`config/environments/${environment}.env.example`);
    assert.match(source, new RegExp(`APP_ENV=${environment}`));
    assert.doesNotMatch(source, /sk_live_|whsec_[A-Za-z0-9]{20,}/);
  }
  assert.match(read(".env.example"), /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(read(".env.example"), /SUPABASE_SERVICE_ROLE_KEY/);
});

test("health readiness version and build metadata routes are present", () => {
  for (const path of ["app/api/health/route.ts", "app/api/health/live/route.ts", "app/api/health/ready/route.ts", "app/api/version/route.ts"]) assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), true);
  assert.match(read("lib/infrastructure/build-metadata.ts"), /VERCEL_GIT_COMMIT_SHA/);
  assert.match(read("app/api/health/ready/route.ts"), /head: true/);
});

test("observability is provider neutral and disconnected", () => {
  const contracts = read("lib/observability/contracts.ts");
  const adapter = read("lib/observability/noop-adapter.ts");
  assert.match(contracts, /sentry/);
  assert.match(contracts, /opentelemetry/);
  assert.match(adapter, /connected = false/);
  assert.doesNotMatch(adapter, /fetch\(|Sentry\.init|registerOTel/);
});

test("feature flags are workspace scoped and default to disabled", () => {
  const source = read("lib/infrastructure/feature-flags.ts");
  for (const flag of ["ai", "gmail", "whatsapp", "stripe", "beta"]) assert.match(source, new RegExp(`"${flag}"`));
  assert.match(source, /workspaceId/);
  for (const file of ["development", "staging", "production"]) assert.match(read(`config/environments/${file}.env.example`), /FEATURE_AI=false/);
});

test("security headers and security boundaries are explicit", () => {
  const config = read("next.config.ts");
  for (const header of ["Content-Security-Policy-Report-Only", "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) assert.match(config, new RegExp(header));
  const security = read("lib/infrastructure/security.ts");
  assert.match(security, /rateLimitBoundaries/);
  assert.match(security, /isTrustedOrigin/);
});

test("CI validates types lint tests audits and production build", () => {
  const workflow = read(".github/workflows/ci.yml");
  for (const command of ["npm ci", "npm run typecheck", "npm run lint", "npm test", "npm run audit:theme", "npm run audit:ux", "npm run audit:production", "npm run build"]) assert.match(workflow, new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(workflow, /permissions:\s+contents: read/);
});

test("deployment environment and operations documentation are complete", () => {
  for (const file of ["PRODUCTION_DEPLOYMENT_GUIDE.md", "ENVIRONMENT_GUIDE.md", "OPERATIONS_RUNBOOK.md", "PRODUCTION_DEPLOYMENT_CHECKLIST.md"]) assert.equal(existsSync(new URL(`../docs/${file}`, import.meta.url)), true);
  assert.match(read("docs/PRODUCTION_DEPLOYMENT_GUIDE.md"), /Vercel/);
  assert.match(read("docs/PRODUCTION_DEPLOYMENT_GUIDE.md"), /Cloudflare/);
  assert.match(read("docs/PRODUCTION_DEPLOYMENT_GUIDE.md"), /Supabase/);
  assert.match(read("docs/PRODUCTION_DEPLOYMENT_GUIDE.md"), /GitHub/);
  const manifest = JSON.parse(read("infrastructure/deployment-manifest.json"));
  assert.equal(manifest.data.migrationsAppliedByWebDeployment, false);
  assert.equal(manifest.dns.proxyInitiallyEnabled, false);
});
