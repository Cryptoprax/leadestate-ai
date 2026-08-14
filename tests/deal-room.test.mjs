import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (p) => readFileSync(p, "utf8");
test("Deal Room has tenant scoped Supabase and Aurora repositories", () => {
  const p = read(
      "features/vayon/deal-room/repositories/supabase.repository.ts",
    ),
    a = read("features/vayon/deal-room/repositories/aurora.repository.ts");
  assert.match(p, /organization_id/);
  assert.match(p, /workspace_id/);
  assert.match(a, /auroraDeals\.map/);
  assert.match(a, /auroraBusinessActivity\.communications/);
});
test("deal lifecycle includes every required stage", () => {
  const s = read("features/vayon/deal-room/domain/models.ts");
  for (const x of [
    "new",
    "qualified",
    "property-matched",
    "site-visit-completed",
    "negotiation",
    "offer-submitted",
    "documentation",
    "approval",
    "ready-to-close",
    "closed-won",
    "closed-lost",
  ])
    assert.match(s, new RegExp(x));
});
test("offer contract and checklist models are read only and complete", () => {
  const s = read("features/vayon/deal-room/domain/models.ts");
  for (const x of [
    "offerNumber",
    "revisionHistory",
    "reservation",
    "sale-agreement",
    "purchase-agreement",
    "commission-agreement",
    "KYC",
    "Finance",
    "Legal",
    "Compliance",
    "completionPercentage",
    "readOnly",
  ])
    assert.match(s, new RegExp(x));
});
test("CRM Property Calendar Communications and Workflow remain reference integrations", () => {
  const s = read("features/vayon/deal-room/domain/models.ts");
  for (const x of [
    "activities",
    "communications",
    "campaigns",
    "notifications",
    "meetings",
    "siteVisits",
    "tasks",
    "reminders",
    "approvalHistory",
    "pendingApprovals",
    "workflowTimeline",
    "executionRequests",
  ])
    assert.match(s, new RegExp(x));
});
test("analytics cover transaction metrics without fabricated cycle data", () => {
  const s = read("features/vayon/deal-room/view-models/deal.ts");
  for (const x of [
    "Pipeline Value",
    "Average Deal Cycle",
    "Win Rate",
    "Loss Rate",
    "Forecast",
    "Average Offer Value",
    "Awaiting Timeline data",
  ])
    assert.match(s, new RegExp(x));
});
test("AI guidance is deterministic and cannot execute", () => {
  const s = read("features/vayon/deal-room/services/deal-room.service.ts");
  for (const x of [
    "summary",
    "negotiation",
    "risk",
    "missing-documents",
    "next-action",
    "probability",
  ])
    assert.match(s, new RegExp(x));
  assert.match(s, /deterministic:\s*true/);
  assert.match(s, /executionAllowed:\s*false/);
  assert.doesNotMatch(s, /openai|anthropic|gemini|fetch\(/i);
});
test("governance blocks payment legal signature and autonomous execution", () => {
  const s = read("features/vayon/deal-room/services/deal-room.service.ts");
  for (const x of [
    "paymentExecution\\s*:\\s*false",
    "legalExecution\\s*:\\s*false",
    "externalSignatures\\s*:\\s*false",
    "autonomousActions\\s*:\\s*false",
    "readOnly\\s*:\\s*true",
  ])
    assert.match(s, new RegExp(x));
});
test("all additive Deal Room routes exist", () => {
  for (const x of [
    "pipeline",
    "offers",
    "contracts",
    "checklists",
    "analytics",
  ])
    assert.doesNotThrow(() => read(`app/vayon/deals/${x}/page.tsx`));
  assert.doesNotThrow(() => read("app/vayon/deals/[dealId]/page.tsx"));
});
test("shared snapshot and components prevent duplicated fetching", () => {
  const s = read("features/vayon/deal-room/services/deal-room.service.ts"),
    r = read("features/vayon/deal-room/dashboard/DealRoomRoute.tsx");
  assert.match(s, /Promise\.all/);
  assert.match(r, /DealRoomRoute/);
});
test("Deal Room documentation covers future safety boundaries", () => {
  const s = read("docs/DEAL_ROOM.md");
  for (const x of [
    "Architecture",
    "Deal model",
    "Offer model",
    "Checklist model",
    "Workflow",
    "Analytics",
    "Future e-signature strategy",
    "Future payment integration strategy",
    "Technical debt",
    "Sprint 33 recommendation",
  ])
    assert.match(s, new RegExp(x, "i"));
});
