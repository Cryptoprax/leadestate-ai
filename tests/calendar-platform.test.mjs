import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("calendar repository contract has Supabase and Aurora adapters", () => {
  const contract = read(
      "features/vayon/calendar-platform/contracts/repository.ts",
    ),
    production = read(
      "features/vayon/calendar-platform/repositories/supabase.repository.ts",
    ),
    aurora = read(
      "features/vayon/calendar-platform/repositories/aurora.repository.ts",
    );
  assert.match(contract, /CalendarRepository/);
  assert.match(production, /organization_id/);
  assert.match(production, /workspace_id/);
  assert.match(aurora, /auroraMeetings\s*\.slice\(0, 150\)/);
  assert.match(aurora, /length: 90/);
  assert.match(aurora, /auroraTasks\.slice\(0, 200\)/);
  assert.match(aurora, /length: 180/);
  assert.match(aurora, /length: 30/);
});

test("calendar model covers complete scheduling context", () => {
  const source = read("features/vayon/calendar-platform/domain/models.ts");
  for (const value of [
    "meeting",
    "site-visit",
    "follow-up",
    "phone-call",
    "reminder",
    "internal-task",
    "deadline",
    "ai-recommendation",
    "assignedHuman",
    "assignedAI",
    "workflow",
    "approval",
    "timeline",
    "conversation",
    "notification",
  ])
    assert.match(source, new RegExp(value));
});

test("meeting task and reminder lifecycles are normalized", () => {
  const source = read("features/vayon/calendar-platform/domain/models.ts");
  for (const value of [
    "pending",
    "scheduled",
    "in-progress",
    "completed",
    "cancelled",
    "low",
    "medium",
    "high",
    "critical",
    "queued",
    "triggered",
    "dismissed",
  ])
    assert.match(source, new RegExp(value));
});

test("conflict detection is deterministic and read only", () => {
  const source = read(
    "features/vayon/calendar-platform/repositories/supabase.repository.ts",
  );
  assert.match(source, /detectConflicts/);
  assert.match(source, /Date\.parse\(current\.startsAt\)/);
  assert.doesNotMatch(source, /insert\(|update\(|delete\(|rpc\(/);
});

test("CRM and Communications context remain references only", () => {
  const model = read("features/vayon/calendar-platform/domain/models.ts"),
    service = read(
      "features/vayon/calendar-platform/services/calendar-platform.service.ts",
    );
  for (const value of [
    "customer",
    "property",
    "deal",
    "conversation",
    "relatedCommunications",
  ])
    assert.match(`${model}\n${service}`, new RegExp(value));
  assert.doesNotMatch(service, /from\(|fetch\(/);
});

test("AI recommendations are deterministic and non executable", () => {
  const source = read(
    "features/vayon/calendar-platform/services/calendar-platform.service.ts",
  );
  assert.match(source, /deterministic:\s*true/);
  assert.match(source, /executionAllowed:\s*false/);
  assert.doesNotMatch(source, /openai|anthropic|gemini|fetch\(/i);
});

test("scheduling actions cannot bypass workflow governance", () => {
  const source = read(
    "features/vayon/calendar-platform/services/calendar-platform.service.ts",
  );
  for (const stage of [
    "Draft",
    "Approval Engine",
    "Execution Request",
    "Timeline",
  ])
    assert.match(source, new RegExp(stage));
  assert.match(source, /externalSchedulingAllowed:\s*false/);
  assert.match(source, /approvalRequired:\s*true/);
});

test("all additive calendar routes exist", () => {
  for (const route of [
    "day",
    "week",
    "month",
    "agenda",
    "meetings",
    "site-visits",
    "tasks",
    "reminders",
  ])
    assert.doesNotThrow(() => read(`app/vayon/calendar/${route}/page.tsx`));
  assert.doesNotThrow(() => read("app/vayon/calendar/page.tsx"));
});

test("calendar rendering uses shared components and bounded agenda rendering", () => {
  const route = read(
      "features/vayon/calendar-platform/dashboard/CalendarRoute.tsx",
    ),
    ui = read("features/vayon/calendar-platform/components/CalendarViews.tsx");
  assert.match(route, /CalendarViewRoute/);
  assert.match(route, /CalendarEntityRoute/);
  assert.match(ui, /content-visibility:auto/);
  assert.match(ui, /Meeting workspace preview/);
  assert.match(ui, /Site visit workspace preview/);
});

test("calendar documentation records future provider and safety boundaries", () => {
  const source = read("docs/CALENDAR_PLATFORM.md");
  for (const value of [
    "Calendar architecture",
    "Conflict detection",
    "AI recommendation",
    "Workflow integration",
    "Future Google Calendar strategy",
    "Sprint 31 recommendation",
  ])
    assert.match(source, new RegExp(value, "i"));
});
