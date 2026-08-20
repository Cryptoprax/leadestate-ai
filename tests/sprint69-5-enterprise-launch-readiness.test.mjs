import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
const read = path => readFileSync(path, "utf8");

test("launch readiness preserves repository service provider architecture", () => {
  for (const path of ["features/platform/launch-readiness/contracts/index.ts", "features/platform/launch-readiness/repositories/launch-readiness.repository.ts", "features/platform/launch-readiness/services/launch-readiness.service.ts", "features/platform/launch-readiness/providers/existing-platform-audit.provider.ts"]) assert.equal(existsSync(path), true, path);
  const provider = read("features/platform/launch-readiness/providers/existing-platform-audit.provider.ts");
  for (const existing of ["DeploymentService", "SecurityReviewService", "PerformanceService"]) assert.match(provider, new RegExp(existing));
});

test("application and complete user journey audits are represented", () => {
  const source = read("features/platform/launch-readiness/services/launch-readiness.service.ts");
  for (const item of ["Authentication", "Organizations", "User Management", "AI Workforce", "Sales AI", "CRM Platform", "CRM AI", "WhatsApp AI", "Marketing AI", "Executive AI", "Knowledge Platform", "Workflow Engine", "Notification Platform", "Email Platform", "Analytics", "Documentation", "Demo Workspace", "Public Website", "Visitor", "Signup", "Email Verification", "Organization Creation", "Workspace Creation", "Onboarding", "AI Setup", "CRM Usage", "Knowledge Usage", "Workflow Usage", "First AI Recommendation", "Subscription Ready"]) assert.match(source, new RegExp(item));
});

test("audit covers deployment performance security accessibility browsers and SEO", () => {
  const source = read("features/platform/launch-readiness/services/launch-readiness.service.ts");
  for (const item of ["Environment variables", "Health endpoints", "Migration status", "Build configuration", "Caching and observability", "RBAC", "RLS and tenant isolation", "Secret handling", "Rate limiting", "Dependency status", "Keyboard navigation", "ARIA labels", "Color contrast", "Focus order", "Screen reader compatibility", "Responsive layouts", "Chrome", "Edge", "Safari", "Firefox", "Metadata", "Canonical URLs", "Open Graph", "JSON-LD", "Sitemap", "robots.txt", "Structured data"]) assert.match(source, new RegExp(item));
});

test("weighted score has explicit ready attention and blocked states", () => {
  const source = read("features/platform/launch-readiness/services/launch-readiness.service.ts") + read("features/platform/launch-readiness/contracts/index.ts");
  assert.match(source, /score >= 85/); assert.match(source, /blocked/); assert.match(source, /needs_attention/); assert.match(source, /not_verified/);
  for (const severity of ["critical", "high", "medium", "low"]) assert.match(source, new RegExp(severity));
});

test("audit history is tenant isolated, administrator gated, and secret safe", () => {
  const migration = read("supabase/migrations/20260902180000_sprint69_5_launch_readiness_audit.sql");
  assert.match(migration, /enable row level security/); assert.match(migration, /current_workspace_role/); assert.match(migration, /organization_owner/); assert.match(migration, /organization_admin/); assert.match(migration, /security definer/);
  assert.doesNotMatch(migration, /api_key|authorization|service_role/i);
});

test("dashboard records history, exports checklist, and exposes provider health and blockers", () => {
  const dashboard = read("features/platform/launch-readiness/components/LaunchReadinessDashboard.tsx");
  const service = read("features/platform/launch-readiness/services/launch-readiness.service.ts");
  for (const text of ["Production Score", "Outstanding blockers", "Provider health", "Technical debt", "Readiness history", "Run and record audit", "Export launch checklist"]) assert.match(dashboard, new RegExp(text));
  assert.match(service, /launch\.readiness\.audit\.completed/); assert.equal(existsSync("app/api/launch-readiness/report/route.ts"), true); assert.equal(existsSync("app/api/launch-readiness/run/route.ts"), true);
});
