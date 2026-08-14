import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");
test("communications workspace has production and Aurora repositories", () => {
  const contract = read(
      "features/vayon/communications-workspace/contracts/repository.ts",
    ),
    production = read(
      "features/vayon/communications-workspace/repositories/supabase.repository.ts",
    ),
    aurora = read(
      "features/vayon/communications-workspace/repositories/aurora.repository.ts",
    );
  assert.match(contract, /CommunicationsRepository/);
  assert.match(production, /organization_id/);
  assert.match(production, /workspace_id/);
  assert.match(aurora, /auroraBusinessActivity/);
});
test("inbox supports enterprise query selection and rendering boundaries", () => {
  const model = read(
      "features/vayon/communications-workspace/domain/models.ts",
    ),
    query = read(
      "features/vayon/communications-workspace/view-models/query.ts",
    ),
    ui = read(
      "features/vayon/communications-workspace/components/InboxList.tsx",
    );
  for (const value of [
    "search",
    "channel",
    "status",
    "unreadOnly",
    "sort",
    "page",
    "pageSize",
  ])
    assert.match(model, new RegExp(value));
  assert.match(query, /toInboxQuery/);
  assert.match(ui, /selected/);
  assert.match(ui, /content-visibility:auto/);
});
test("conversation model covers CRM workflow tasks assignment and timeline", () => {
  const source = read(
    "features/vayon/communications-workspace/domain/models.ts",
  );
  for (const value of [
    "assignedHuman",
    "assignedAI",
    "dealId",
    "propertyId",
    "workflowId",
    "linkedTasks",
    "ai-recommendation",
    "workflow-event",
    "crm-event",
    "provider-event",
  ])
    assert.match(source, new RegExp(value));
});
test("all message states and channels are normalized", () => {
  const source = read(
    "features/vayon/communications-workspace/domain/models.ts",
  );
  for (const value of [
    "whatsapp",
    "email",
    "sms",
    "phone",
    "internal-note",
    "system-notification",
    "draft",
    "pending-approval",
    "scheduled",
    "prepared",
    "sent",
    "delivered",
    "read",
    "archived",
  ])
    assert.match(source, new RegExp(value));
});
test("templates campaigns and notifications expose complete contracts", () => {
  const source = read(
    "features/vayon/communications-workspace/domain/models.ts",
  );
  for (const value of [
    "Welcome",
    "Follow-up",
    "Site Visit",
    "Offer",
    "Negotiation",
    "Appointment",
    "Payment Reminder",
    "Documents",
    "Workflow Approved",
    "Workflow Rejected",
    "Approval Pending",
    "Provider Offline",
    "AI Recommendation",
  ])
    assert.match(source, new RegExp(value));
});
test("outbound communication cannot bypass governance", () => {
  const source = read(
    "features/vayon/communications-workspace/services/outbound-governance.ts",
  );
  for (const stage of [
    "Draft",
    "Approval Engine",
    "Execution Request",
    "Integration Platform",
    "Deterministic Provider",
    "Conversation Timeline",
  ])
    assert.match(source, new RegExp(stage));
  assert.match(source, /approvalRequired:\s*true/);
  assert.match(source, /executionRequested:\s*false/);
  assert.doesNotMatch(source, /fetch\(|execute\(|send\(/);
});
test("deterministic assistance uses no external provider", () => {
  const source = read(
    "features/vayon/communications-workspace/services/communications.service.ts",
  );
  assert.match(source, /deterministic-rules/);
  assert.match(source, /sentiment:\s*"unavailable"/);
  assert.doesNotMatch(source, /openai|anthropic|gemini|fetch\(/i);
});
test("all communications routes exist", () => {
  for (const path of [
    "app/vayon/communications/page.tsx",
    "app/vayon/communications/inbox/page.tsx",
    "app/vayon/communications/conversations/page.tsx",
    "app/vayon/communications/conversations/[conversationId]/page.tsx",
    "app/vayon/communications/templates/page.tsx",
    "app/vayon/communications/campaigns/page.tsx",
    "app/vayon/communications/notifications/page.tsx",
  ])
    assert.doesNotThrow(() => read(path));
});
test("documentation records provider CRM AI and workflow boundaries", () => {
  const source = read("docs/COMMUNICATIONS_HUB.md");
  for (const value of [
    "Future provider strategy",
    "Workflow integration",
    "CRM and AI Workforce integration",
    "does not fabricate notices",
  ])
    assert.match(source, new RegExp(value));
});
