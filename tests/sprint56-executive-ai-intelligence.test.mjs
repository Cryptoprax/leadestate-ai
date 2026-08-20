import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("Executive AI reuses the existing streaming workforce runtime", async () => {
  const source = await read("features/platform/openai/runtime/service.ts");
  assert.match(source, /ExecutiveAIService\.production/);
  assert.match(source, /input\.employee === "executive-ai"/);
  assert.match(source, /this\.provider\.stream/);
});

test("Executive intelligence aggregates specialist employees and platform health", async () => {
  const source = await read("features/platform/executive-ai/services/executive-ai.service.ts");
  for (const dependency of ["SalesAIService", "CRMAIService", "MarketingAIService", "WhatsAppAIService", "GmailPlatformService", "GoogleCalendarPlatformService", "OpenAIProvider", "AnalyticsService"])
    assert.match(source, new RegExp(dependency));
});

test("repository reads authoritative tenant-scoped executive evidence", async () => {
  const source = await read("features/platform/executive-ai/repositories/supabase-executive-ai.repository.ts");
  assert.match(source, /eq\("organization_id",this\.organizationId\)/);
  assert.match(source, /eq\("workspace_id",this\.workspaceId\)/);
  for (const table of ["leads", "meetings", "deals", "ai_approval_queue", "subscriptions", "billing_events", "activity_events", "ai_workforce_messages"])
    assert.match(source, new RegExp(`\\"${table}\\"`));
  assert.doesNotMatch(source, /mock|fixture/i);
});

test("business health provides every required dimension and reasoning", async () => {
  const source = await read("features/platform/executive-ai/services/executive-ai.service.ts");
  for (const field of ["sales", "marketing", "customerEngagement", "crmQuality", "pipelineQuality", "aiUtilization", "overall", "reasoning"])
    assert.match(source, new RegExp(field));
});

test("revenue intelligence keeps unavailable authoritative values explicit", async () => {
  const [repository, component] = await Promise.all([
    read("features/platform/executive-ai/repositories/supabase-executive-ai.repository.ts"),
    read("features/platform/executive-ai/components/ExecutiveAIDashboard.tsx"),
  ]);
  for (const metric of ["mrr", "arr", "activeSubscriptions", "newSubscriptions", "churn", "pipelineValue", "forecastRevenue"])
    assert.match(repository, new RegExp(metric));
  assert.match(repository, /available:false/);
  assert.match(component, /\.reason/);
});

test("recommendations and risks carry priority impact confidence reasoning and action", async () => {
  const source = await read("features/platform/executive-ai/services/executive-ai.service.ts");
  for (const field of ["critical", "high", "medium", "low", "businessImpact", "confidence", "explanation", "suggestedAction", "risks"])
    assert.match(source, new RegExp(field));
});

test("department intelligence covers every requested department", async () => {
  const source = await read("features/platform/executive-ai/services/executive-ai.service.ts");
  for (const department of ["Sales", "Marketing", "CRM", "WhatsApp", "Finance", "Operations", "Support"])
    assert.match(source, new RegExp(`department:\"${department}\"`));
});

test("Executive AI offers all report cadences and an export-ready summary", async () => {
  const [service, chat] = await Promise.all([
    read("features/platform/executive-ai/services/executive-ai.service.ts"),
    read("features/platform/openai/runtime/ChatPanel.tsx"),
  ]);
  for (const cadence of ["daily", "weekly", "monthly", "quarterly"])
    assert.match(service, new RegExp(`\"${cadence}\"`));
  assert.match(chat, /export-ready daily, weekly, monthly, or quarterly report/i);
});

test("dashboard exposes executive KPIs timeline workforce and observability", async () => {
  const source = await read("features/platform/executive-ai/components/ExecutiveAIDashboard.tsx");
  for (const label of ["Business health score", "Revenue forecast", "Department health", "Top priorities", "Critical risks", "Pending approvals", "Executive timeline", "AI workforce status", "Prompt tokens", "Completion tokens", "Latency", "Model", "Estimated cost", "Recommendations generated"])
    assert.match(source, new RegExp(label, "i"));
});

test("Executive AI is recommendation-only and cannot autonomously execute", async () => {
  const [service, runtime] = await Promise.all([
    read("features/platform/executive-ai/services/executive-ai.service.ts"),
    read("features/platform/openai/runtime/service.ts"),
  ]);
  assert.match(service, /recommendationOnly:true/);
  assert.match(service, /approvalRequired:true/);
  assert.match(service, /executionAllowed:false/);
  assert.match(runtime, /Never make or execute decisions/);
});
