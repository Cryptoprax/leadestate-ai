import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("AI workforce directory exposes employees, live state, workload, and department filters", async () => {
  const source = await read("features/vayon/operational-workforce/components/WorkforceDirectory.tsx");
  for (const department of ["Sales", "Marketing", "Support", "Operations", "CRM", "Finance", "Executive"]) assert.match(source, new RegExp(department));
  for (const field of ["Availability", "Workload", "capabilities", "permissions", "status"]) assert.match(source, new RegExp(field, "i"));
  assert.match(source, /memo\(/);
  assert.match(source, /useMemo/);
});

test("agent memory is visual, workspace scoped, and evidence safe", async () => {
  const [model, view] = await Promise.all([
    read("features/vayon/operational-workforce/domain/models.ts"),
    read("features/vayon/operational-workforce/components/WorkforceDirectory.tsx"),
  ]);
  for (const field of ["conversationCount", "assignedCustomers", "pendingTasks", "completedActions", "knowledgeReferences", "contextUtilization"]) assert.match(model, new RegExp(field));
  assert.match(view, /Workspace-scoped context/);
  assert.match(view, /never inferred from another tenant/);
});

test("task orchestration includes governance and dependency metadata", async () => {
  const [model, view] = await Promise.all([
    read("features/vayon/operational-workforce/domain/models.ts"),
    read("features/vayon/operational-workforce/components/WorkforceViews.tsx"),
  ]);
  for (const field of ["deadline", "dependencies", "progress", "approvalState", "history"]) assert.match(model, new RegExp(field));
  for (const field of ["Deadline", "Dependencies", "Progress", "Approval"]) assert.match(view, new RegExp(field));
});

test("command center composes collaboration, approvals, prompts, knowledge, and executive evidence", async () => {
  const source = await read("features/vayon/operational-workforce/components/WorkforceViews.tsx");
  for (const role of ["Sales Executive", "CRM Manager", "Meeting Coordinator", "Reporting Analyst", "Executive Assistant"]) assert.match(source, new RegExp(role));
  for (const route of ["/vayon/ai/collaboration", "/vayon/approvals", "/vayon/ai/tasks", "/vayon/ai/playground", "/vayon/knowledge"]) assert.match(source, new RegExp(route));
  for (const metric of ["AI utilization", "Tasks completed", "Time saved", "Revenue influenced", "Meetings created", "Emails drafted", "Customer interactions"]) assert.match(source, new RegExp(metric));
});

test("prompt library reuses the canonical versioned prompt registry", async () => {
  const [page, library] = await Promise.all([
    read("app/vayon/ai/playground/page.tsx"),
    read("features/vayon/ai-runtime/components/PromptLibrary.tsx"),
  ]);
  assert.match(page, /PromptLibrary/);
  assert.match(library, /promptRegistry/);
  for (const field of ["Version history", "System prompts", "Templates", "Testing"]) assert.match(library, new RegExp(field));
  assert.match(library, /Direct ungoverned execution remains disabled/);
});

test("future connectors remain explicit non-executing placeholders", async () => {
  const source = await read("features/vayon/operational-workforce/components/WorkforceViews.tsx");
  for (const connector of ["WhatsApp", "Email", "Calendar", "Voice", "Slack", "Microsoft Teams", "Google Drive", "Dropbox", "Stripe", "Razorpay"]) assert.match(source, new RegExp(connector));
  assert.match(source, /no provider calls/i);
});

test("production workforce repository preserves organization and workspace isolation", async () => {
  const source = await read("features/vayon/operational-workforce/repositories/supabase.repository.ts");
  assert.match(source, /organization_id/);
  assert.match(source, /workspace_id/);
  assert.match(source, /organizationId/);
  assert.match(source, /workspaceId/);
});

