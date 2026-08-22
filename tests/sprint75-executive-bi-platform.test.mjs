import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("executive command center uses tenant analytics and existing Executive AI", async () => {
  const source = await read("app/vayon/analytics/executive/page.tsx");
  assert.match(source, /AnalyticsService\.production/);
  assert.match(source, /ExecutiveAIService\.production/);
  assert.match(source, /Promise\.all/);
  assert.match(source, /Executive Command Center/);
});

test("executive KPI center distinguishes authoritative and unavailable evidence", async () => {
  const source = await read("features/vayon/analytics-platform/services/analytics.service.ts");
  for (const metric of ["Revenue", "ARR", "MRR", "Forecast", "Pipeline", "Win Rate", "Conversion", "Meetings", "Tasks", "AI Productivity", "Customer Health", "Growth", "CAC", "LTV", "Close Rate", "Response Time", "Time to Close", "Pipeline Coverage", "Customer Growth"]) assert.match(source, new RegExp(metric));
  assert.match(source, /available/);
  assert.match(source, /Authoritative recognized revenue is not connected/);
});

test("forecast engine exposes weighted best expected worst quarter annual and confidence scenarios", async () => {
  const [service, component] = await Promise.all([
    read("features/vayon/analytics-platform/services/analytics.service.ts"),
    read("features/vayon/analytics-platform/components/ExecutiveBI.tsx"),
  ]);
  for (const value of ["weighted", "bestCase", "expected", "worstCase", "confidence", "quarter", "annual"]) assert.match(service, new RegExp(value));
  for (const value of ["Best case", "Expected", "Worst case", "Weighted forecast", "Quarter forecast", "Annual forecast", "Forecast confidence"]) assert.match(component, new RegExp(value));
});

test("sales analytics includes distributions velocity leakage performers and loss reasons", async () => {
  const [service, component] = await Promise.all([
    read("features/vayon/analytics-platform/services/analytics.service.ts"),
    read("features/vayon/analytics-platform/components/ExecutiveBI.tsx"),
  ]);
  for (const value of ["leadSources", "stages", "performers", "lostReasons", "Sales Velocity", "Sales Cycle", "Stage Duration"]) assert.match(service, new RegExp(value));
  for (const value of ["Lead sources", "Pipeline leakage", "Top performers", "Lost reasons"]) assert.match(component, new RegExp(value));
});

test("chart system includes line area bar donut heatmap funnel forecast and pipeline views", async () => {
  const source = await read("features/vayon/analytics-platform/components/ExecutiveBI.tsx");
  for (const value of ["BarChart", "Donut", "Heatmap", "Funnel", "TrendChart", "line and area", "Forecast scenarios", "Pipeline"]) assert.match(source, new RegExp(value, "i"));
});

test("report builder supports filters saved views ranges teams and governed exports", async () => {
  const source = await read("features/vayon/analytics-platform/components/ExecutiveBI.tsx");
  for (const value of ["Date range", "Team / department", "Saved view", "Export CSV", "PDF soon", "Excel soon", "Presentation soon"]) assert.match(source, new RegExp(value));
  assert.match(source, /Blob/);
});

test("AI insights are clearly separated from measured metrics", async () => {
  const source = await read("features/vayon/analytics-platform/components/ExecutiveBI.tsx");
  assert.match(source, /Generated insight · recommendation only/);
  assert.match(source, /AI generated/);
  assert.match(source, /generated, not measured/);
  assert.match(source, /Recommendation:/);
});

test("analytics repository remains organization and workspace scoped", async () => {
  const source = await read("features/vayon/analytics-platform/repositories/supabase.repository.ts");
  assert.match(source, /organization_id/);
  assert.match(source, /workspace_id/);
  assert.match(source, /\.limit\(5000\)/);
});

