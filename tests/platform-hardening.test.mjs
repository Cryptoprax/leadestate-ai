import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (p) => readFileSync(p, "utf8");
test("system diagnostics route is non-sensitive and build metadata backed", () => {
  const service = read(
      "features/platform/quality/services/system-diagnostics.ts",
    ),
    page = read("app/vayon/system/page.tsx");
  assert.match(service, /getBuildMetadata/);
  assert.match(service, /sensitiveRuntimeDataIncluded:\s*false/);
  assert.match(service, /testStatus:\s*"not-exposed-at-runtime"/);
  assert.match(page, /SystemDiagnosticsView/);
  assert.doesNotMatch(
    service,
    /SUPABASE|SECRET|TOKEN|PASSWORD|process\.env\[/i,
  );
});
test("system diagnostics inventory covers every certified product module", () => {
  const s = read("features/platform/quality/services/system-diagnostics.ts");
  for (const x of [
    "Authentication",
    "Executive Dashboard",
    "CRM Engine",
    "AI Workforce",
    "Workflow & Approval",
    "Integration Platform",
    "Communications Hub",
    "Calendar Platform",
    "Property Platform",
    "Deal Room",
    "Analytics Platform",
    "Event Bus",
    "Notification Platform",
    "Administration Platform",
  ])
    assert.match(s, new RegExp(x));
});
test("module boundaries reuse VDS loading error and retry controls", () => {
  const s = read("features/platform/quality/components/RouteBoundary.tsx");
  for (const x of ["Page", "LoadingState", "ErrorState", "Button"])
    assert.match(s, new RegExp(x));
  for (const moduleName of [
    "admin",
    "analytics",
    "events",
    "notifications",
    "system",
  ]) {
    assert.doesNotThrow(() => read(`app/vayon/${moduleName}/loading.tsx`));
    assert.doesNotThrow(() => read(`app/vayon/${moduleName}/error.tsx`));
  }
});
test("authenticated routes retain global loading and error fallbacks", () => {
  assert.match(read("app/vayon/loading.tsx"), /role="status"/);
  assert.match(read("app/vayon/error.tsx"), /RouteError/);
});
test("module navigation uses semantic labeled landmarks", () => {
  for (const p of [
    "features/vayon/calendar-platform/components/CalendarShell.tsx",
    "features/vayon/property-platform/components/PropertyShell.tsx",
    "features/vayon/deal-room/components/DealRoomViews.tsx",
    "features/vayon/analytics-platform/components/AnalyticsViews.tsx",
    "features/vayon/admin-platform/components/AdminViews.tsx",
    "features/platform/event-bus/components/EventViews.tsx",
    "features/platform/notifications/components/NotificationViews.tsx",
  ])
    assert.match(read(p), /aria-label/);
});
test("diagnostics view uses semantic VDS components", () => {
  const s = read("features/platform/quality/components/SystemDiagnostics.tsx");
  for (const x of [
    "PageHeader",
    "Page",
    "Section",
    "Card",
    "Badge",
    "<ul",
    "<dl",
  ])
    assert.match(s, new RegExp(x));
});
test("hardening introduces no database external provider or AI execution", () => {
  const files = [
    "features/platform/quality/services/system-diagnostics.ts",
    "features/platform/quality/components/SystemDiagnostics.tsx",
    "features/platform/quality/components/RouteBoundary.tsx",
  ]
    .map(read)
    .join("\n");
  assert.doesNotMatch(
    files,
    /supabase|fetch\(|openai|anthropic|gemini|insert\(|update\(|delete\(|rpc\(/i,
  );
});
test("hardening documentation distinguishes automated and manual evidence", () => {
  const s = read("docs/PLATFORM_HARDENING.md");
  for (const x of [
    "UX findings",
    "Performance findings",
    "Accessibility findings",
    "Technical debt",
    "Refactoring completed",
    "remaining improvements",
    "No browser screenshots",
    "Sprint 37 recommendation",
  ])
    assert.match(s, new RegExp(x, "i"));
});
