import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (p) => readFileSync(p, "utf8");
test("analytics repositories support tenant scoped production and Aurora", () => {
  const p = read(
      "features/vayon/analytics-platform/repositories/supabase.repository.ts",
    ),
    a = read(
      "features/vayon/analytics-platform/repositories/aurora.repository.ts",
    );
  assert.match(p, /organization_id/);
  assert.match(p, /workspace_id/);
  assert.match(p, /Promise\.all/);
  assert.match(a, /auroraLeads/);
  assert.match(a, /auroraProperties/);
  assert.match(a, /auroraBusinessActivity\.communications/);
});
test("evidence envelope prevents fabricated production values", () => {
  const m = read("features/vayon/analytics-platform/domain/models.ts"),
    a = read(
      "features/vayon/analytics-platform/aggregation/analytics.aggregator.ts",
    );
  for (const x of ["available", "source", "explanation", "measuredAt"])
    assert.match(m, new RegExp(x));
  assert.match(a, /value:\s*null/);
  assert.match(a, /Authoritative production source unavailable/);
});
test("aggregation covers executive command center", () => {
  const s = read(
    "features/vayon/analytics-platform/aggregation/analytics.aggregator.ts",
  );
  for (const x of [
    "Revenue",
    "Pipeline",
    "Forecast",
    "Conversion",
    "Win Rate",
    "Loss Rate",
    "Meetings",
    "Site Visits",
    "Open Deals",
    "AI Workforce Status",
    "Workflow Queue",
    "Provider Health",
    "Notifications",
  ])
    assert.match(s, new RegExp(x));
});
test("aggregation covers sales CRM property and deal analytics", () => {
  const s = read(
    "features/vayon/analytics-platform/aggregation/analytics.aggregator.ts",
  );
  for (const x of [
    "Lead Sources",
    "Conversion Funnel",
    "Lead Growth",
    "Lead Quality",
    "Hot Leads",
    "Inactive Leads",
    "Inventory",
    "Demand",
    "Average Days Listed",
    "Average Deal Cycle",
    "Stage Distribution",
    "Average Offer Value",
  ])
    assert.match(s, new RegExp(x));
});
test("aggregation covers communications and workforce analytics", () => {
  const s = read(
    "features/vayon/analytics-platform/aggregation/analytics.aggregator.ts",
  );
  for (const x of [
    "Inbox Volume",
    "Conversation Growth",
    "Unread",
    "Campaign Activity",
    "Template Usage",
    "Employee Status",
    "Recommendations",
    "Queue Length",
    "Average Completion Time",
    "Provider Assignment",
  ])
    assert.match(s, new RegExp(x));
});
test("workflow integration and observability are complete", () => {
  const s = read(
    "features/vayon/analytics-platform/aggregation/analytics.aggregator.ts",
  );
  for (const x of [
    "Pending Approvals",
    "Approved",
    "Rejected",
    "Cancelled",
    "Expired",
    "Execution Requests",
    "Module Health",
    "Route Health",
    "Repository Health",
    "Workflow Health",
    "Queue Health",
    "Capability Coverage",
    "Rate Limits",
  ])
    assert.match(s, new RegExp(x));
});
test("deterministic insights cite evidence and never call providers", () => {
  const s = read(
    "features/vayon/analytics-platform/services/analytics.service.ts",
  );
  for (const x of [
    "business-summary",
    "top-risks",
    "recommended-priorities",
    "growth-opportunities",
    "operational-health",
    "evidenceIds",
  ])
    assert.match(s, new RegExp(x));
  assert.match(s, /deterministic:\s*true/);
  assert.match(s, /providerCalled:\s*false/);
  assert.doesNotMatch(s, /openai|anthropic|gemini|fetch\(/i);
});
test("all analytics routes exist", () => {
  for (const x of [
    "",
    "executive",
    "sales",
    "crm",
    "properties",
    "deals",
    "communications",
    "workforce",
  ]) {
    const p = x
      ? `app/vayon/analytics/${x}/page.tsx`
      : "app/vayon/analytics/page.tsx";
    assert.doesNotThrow(() => read(p));
  }
});
test("analytics routes use shared snapshots and reusable rendering", () => {
  const r = read(
      "features/vayon/analytics-platform/dashboard/AnalyticsRoute.tsx",
    ),
    c = read("features/vayon/analytics-platform/components/AnalyticsViews.tsx");
  assert.match(r, /AnalyticsRoute/);
  assert.match(c, /MetricGrid/);
  assert.match(c, /PlatformHealth/);
});
test("analytics documentation defines evidence BI and technical boundaries", () => {
  const s = read("docs/ANALYTICS_PLATFORM.md");
  for (const x of [
    "Architecture",
    "Aggregation model",
    "Evidence policy",
    "Executive dashboard",
    "Future BI strategy",
    "Technical debt",
    "Sprint 34 recommendation",
  ])
    assert.match(s, new RegExp(x, "i"));
});
