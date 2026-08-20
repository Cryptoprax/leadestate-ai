import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("Sprint 52 uses the existing workforce runtime and Sales employee", async () => {
  const runtime = await read("features/platform/openai/runtime/service.ts");
  assert.match(runtime, /SalesAIService\.production/);
  assert.match(runtime, /input\.employee === "sales-ai"/);
  assert.match(runtime, /this\.provider\.stream/);
});

test("Sales AI repository is tenant scoped and reads production sales evidence", async () => {
  const source = await read("features/platform/sales-ai/repositories/supabase-sales-ai.repository.ts");
  assert.match(source, /eq\("organization_id", this\.organizationId\)/);
  assert.match(source, /eq\("workspace_id", this\.workspaceId\)/);
  for (const table of ["leads", "deals", "tasks", "meetings", "ai_approval_queue", "ai_recommendations", "activity_events"]) assert.match(source, new RegExp(`\\"${table}\\"`));
  assert.doesNotMatch(source, /mock|fixture/i);
});

test("lead qualification provides hot warm cold, confidence, and explanation", async () => {
  const source = await read("features/platform/sales-ai/repositories/supabase-sales-ai.repository.ts");
  assert.match(source, /score >= 75 \? "hot" : score >= 45 \? "warm" : "cold"/);
  assert.match(source, /confidence:/);
  assert.match(source, /explanation:/);
});

test("pipeline intelligence measures stage age, risk, probability, missing activity, and next action", async () => {
  const source = await read("features/platform/sales-ai/repositories/supabase-sales-ai.repository.ts");
  for (const signal of ["daysInStage", "risk", "probability", "missingActivities", "nextAction"]) assert.match(source, new RegExp(signal));
});

test("daily briefing and forecast are based on repository evidence", async () => {
  const source = await read("features/platform/sales-ai/services/sales-ai.service.ts");
  for (const signal of ["priorities", "upcomingMeetings", "overdueFollowUps", "dealsAtRisk", "highValueOpportunities", "expectedMonthlyRevenue", "pipelineHealth", "confidence", "explanation"]) assert.match(source, new RegExp(signal));
});

test("communication and meeting playbooks remain human-reviewed drafts", async () => {
  const [chat, runtime, service] = await Promise.all([read("features/platform/openai/runtime/ChatPanel.tsx"), read("features/platform/openai/runtime/service.ts"), read("features/platform/sales-ai/services/sales-ai.service.ts")]);
  assert.match(chat, /Draft a follow-up email for human review/);
  assert.match(chat, /Draft a WhatsApp follow-up for human review/);
  assert.match(chat, /Prepare me for today’s customer meetings/);
  assert.match(runtime, /Never execute or send messages/);
  assert.match(runtime, /draft-only/);
  assert.match(service, /GmailPlatformService/);
  assert.match(service, /GoogleCalendarPlatformService/);
  assert.match(service, /recentEmailAndWhatsApp/);
  assert.match(service, /sendingAllowed: false/);
});

test("Sales dashboard exposes required intelligence and observability", async () => {
  const source = await read("features/platform/sales-ai/components/SalesAIDashboard.tsx");
  for (const label of ["Today&apos;s priorities", "Top opportunities", "Deals at risk", "Revenue forecast", "pending approvals", "Recent recommendations", "AI activity timeline", "Prompt tokens", "Completion tokens", "Estimated cost", "Model", "Recommendations"]) assert.match(source, new RegExp(label, "i"));
});

test("governance, workspace attribution, and no-autonomy boundaries are explicit", async () => {
  const [service, runtime] = await Promise.all([read("features/platform/sales-ai/services/sales-ai.service.ts"), read("features/platform/openai/runtime/service.ts")]);
  assert.match(service, /recommendationOnly: true/);
  assert.match(service, /approvalRequired: true/);
  assert.match(runtime, /Workspace references/iu);
  assert.match(runtime, /Never invent CRM relationships/);
  assert.match(runtime, /Recommendations always require human approval/);
});
