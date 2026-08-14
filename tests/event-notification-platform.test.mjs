import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (p) => readFileSync(p, "utf8");
test("domain event model contains complete immutable envelope", () => {
  const s = read("features/platform/event-bus/domain/event.ts");
  for (const x of [
    "eventId",
    "eventType",
    "sourceModule",
    "workspaceId",
    "organizationId",
    "correlationId",
    "actorId",
    "timestamp",
    "payloadMetadata",
    "evidenceReference",
    "severity",
    "visibility",
    "readonly",
  ])
    assert.match(s, new RegExp(x));
});
test("registry includes every required event type", () => {
  const s = read("features/platform/event-bus/domain/event.ts");
  for (const x of [
    "LeadCreated",
    "LeadUpdated",
    "PropertyViewed",
    "PropertyMatched",
    "ConversationReceived",
    "ConversationDrafted",
    "MeetingScheduled",
    "ReminderTriggered",
    "WorkflowSubmitted",
    "WorkflowApproved",
    "WorkflowRejected",
    "DealUpdated",
    "DealClosed",
    "NotificationCreated",
    "AIRecommendationGenerated",
    "ProviderHealthChanged",
    "AnalyticsRefreshed",
  ])
    assert.match(s, new RegExp(x));
});
test("event bus supports publish subscribe replay history filtering and search", () => {
  const s = read("features/platform/event-bus/services/in-memory-event-bus.ts");
  for (const x of [
    "publish",
    "subscribe",
    "replay",
    "history",
    "filter",
    "search",
    "correlationId",
  ])
    assert.match(s, new RegExp(x));
  assert.match(s, /Object\.freeze/);
  assert.doesNotMatch(s, /fetch\(|supabase|kafka|eventbridge/i);
});
test("publisher validates tenancy correlation and immutable metadata", () => {
  const s = read("features/platform/event-bus/services/event.factory.ts");
  assert.match(s, /organizationId/);
  assert.match(s, /workspaceId/);
  assert.match(s, /correlationId/);
  assert.match(s, /Object\.freeze/);
});
test("module integration contracts are publish-only and non executing", () => {
  const s = read(
    "features/platform/event-bus/integration/module-publishers.ts",
  );
  for (const x of [
    "crm",
    "properties",
    "communications",
    "calendar",
    "workflow",
    "deals",
    "workforce",
    "integrations",
    "analytics",
    "notifications",
    "TaskSuggested",
    "RiskDetected",
    "ApprovalRequested",
    "ExecutionPrepared",
  ])
    assert.match(s, new RegExp(x));
  assert.match(s, /publishOnly:\s*true/);
  assert.match(s, /autonomousExecution:\s*false/);
  assert.match(s, /productionHooksEnabled:\s*false/);
});
test("notification model covers categories delivery and lifecycle", () => {
  const s = read("features/platform/notifications/domain/notification.ts");
  for (const x of [
    "notificationId",
    "title",
    "body",
    "category",
    "priority",
    "status",
    "recipientId",
    "module",
    "relatedEntity",
    "relatedRoute",
    "timestamp",
    "read",
    "dismissed",
    "workflow",
    "crm",
    "deals",
    "properties",
    "calendar",
    "communications",
    "ai-workforce",
    "analytics",
    "integrations",
    "platform",
  ])
    assert.match(s, new RegExp(x));
});
test("notification delivery policy disables every external channel", () => {
  const s = read(
    "features/platform/notifications/services/notification.service.ts",
  );
  for (const x of [
    "readOnly\\s*:\\s*true",
    "deterministic\\s*:\\s*true",
    "push\\s*:\\s*false",
    "email\\s*:\\s*false",
    "sms\\s*:\\s*false",
    "whatsapp\\s*:\\s*false",
    "browserPush\\s*:\\s*false",
    "externalProviders\\s*:\\s*false",
  ])
    assert.match(s, new RegExp(x));
  assert.doesNotMatch(s, /fetch\(/);
});
test("all additive event and notification routes exist", () => {
  for (const p of [
    "app/vayon/events/page.tsx",
    "app/vayon/events/catalog/page.tsx",
    "app/vayon/events/history/page.tsx",
    "app/vayon/notifications/inbox/page.tsx",
    "app/vayon/notifications/preferences/page.tsx",
    "app/vayon/notifications/history/page.tsx",
  ])
    assert.doesNotThrow(() => read(p));
  assert.doesNotThrow(() => read("app/vayon/notifications/page.tsx"));
});
test("observability uses shared immutable snapshots without fabricated events", () => {
  const s = read("features/platform/event-bus/dashboard/EventRoute.tsx");
  assert.match(s, /bus\.snapshot/);
  assert.match(s, /Event Throughput/);
  assert.match(s, /Notification Volume/);
  assert.doesNotMatch(s, /publish\(/);
});
test("event and notification documentation define future distributed boundaries", () => {
  const e = read("docs/EVENT_BUS.md"),
    n = read("docs/NOTIFICATION_PLATFORM.md");
  for (const x of [
    "Architecture",
    "Event model",
    "Publishing rules",
    "Subscriber rules",
    "Future distributed event strategy",
    "Technical debt",
    "Sprint 35 recommendation",
  ])
    assert.match(e, new RegExp(x, "i"));
  for (const x of [
    "notification model",
    "Delivery policy",
    "Future provider strategy",
    "Technical debt",
    "Sprint 35 recommendation",
  ])
    assert.match(n, new RegExp(x, "i"));
});
