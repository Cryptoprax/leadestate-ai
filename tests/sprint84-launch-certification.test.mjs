import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");
test("launch audit certifies the complete enterprise workflow without claiming browser execution", () => {
  const source = read(
    "features/platform/launch-readiness/services/launch-readiness.service.ts",
  );
  for (const step of [
    "Organization",
    "Invite Users",
    "Projects",
    "Inventory",
    "CRM",
    "Property Matching",
    "Site Visits",
    "Communications",
    "Creative Studio",
    "Growth Studio",
    "Subscriptions",
    "Billing",
    "Analytics",
    "Reports",
  ])
    assert.match(source, new RegExp(step));
  assert.match(
    source,
    /production end-to-end execution requires launch-environment verification/i,
  );
});
test("administrator checklist covers launch infrastructure providers legal and support", () => {
  const source = read(
    "features/platform/launch-readiness/services/launch-readiness.service.ts",
  );
  for (const item of [
    "Branding",
    "Pricing",
    "Billing",
    "Domains",
    "SSL",
    "Email",
    "WhatsApp",
    "Google",
    "Microsoft",
    "OpenAI",
    "Storage",
    "Legal pages",
    "Privacy Policy",
    "Terms",
    "Cookie Policy",
    "Support email",
    "Support URLs",
  ])
    assert.match(source, new RegExp(item));
  assert.match(source, /administratorChecklist/);
});
test("beta certification remains labeled governed and fail closed", () => {
  const source = read(
    "features/platform/launch-readiness/services/launch-readiness.service.ts",
  );
  for (const item of [
    "Creative Studio",
    "Growth Studio",
    "AI Image Generation",
    "Campaign Packs",
    "Video Projects",
    "Brand Guardian",
    "AI Marketing Brain",
    "Clearly labeled Beta",
    "fail closed",
  ])
    assert.match(source, new RegExp(item));
});
test("Creative Studio has accessible loading and recoverable error boundaries", () => {
  for (const path of [
    "app/vayon/creative-studio/loading.tsx",
    "app/vayon/creative-studio/error.tsx",
  ])
    assert.ok(existsSync(path));
  const loading = read("app/vayon/creative-studio/loading.tsx"),
    error = read("app/vayon/creative-studio/error.tsx");
  assert.match(loading, /aria-busy/);
  assert.match(loading, /sr-only/);
  assert.match(error, /role="alert"/);
  assert.match(error, /Retry/);
  assert.match(error, /Your drafts remain safe/);
});
test("Help Center supports search guides FAQ videos and escalation", () => {
  const source = read("app/vayon/knowledge/help/page.tsx");
  for (const value of [
    'role="search"',
    "Admin Guide",
    "User Guide",
    "Creative Studio Guide",
    "Growth Studio Guide",
    "Billing Guide",
    "Organization Guide",
    "Developer Notes",
    "Architecture Summary",
    "Frequently asked questions",
    "Video guides",
    "Escalate to support",
  ])
    assert.match(source, new RegExp(value));
});
test("investor demo exposes focused one-click platform tours", () => {
  const view = read(
      "features/vayon/demo-experience/components/DemoExperience.tsx",
    ),
    repository = read(
      "features/vayon/demo-experience/repository/aurora-enterprise.repository.ts",
    );
  for (const tour of [
    "Executive Tour",
    "Sales Tour",
    "Marketing Tour",
    "CRM Tour",
    "AI Tour",
    "Creative Studio Tour",
    "Growth Studio Tour",
  ])
    assert.match(view, new RegExp(tour));
  assert.match(repository, /Creative Studio/);
  assert.match(repository, /Growth Studio/);
});
test("universal search explicitly covers projects inventory campaigns creative assets and reports", () => {
  const contract = read("features/vayon/universal-bar/domain/contracts.ts"),
    provider = read(
      "features/vayon/universal-bar/providers/static-navigation.provider.ts",
    );
  for (const scope of [
    "projects",
    "inventory",
    "campaigns",
    "creative-assets",
    "reports",
    "properties",
    "leads",
    "deals",
    "communications",
    "employees",
    "settings",
  ])
    assert.match(contract + provider, new RegExp(scope));
});
test("launch documentation distinguishes static certification from required runtime evidence", () => {
  const source = read("docs/SPRINT84_LAUNCH_CERTIFICATION.md");
  for (const value of [
    "Administrator guide",
    "User guide",
    "Creative and Growth Studio guide",
    "Billing and organization guide",
    "Developer and architecture notes",
    "Runtime verification still required",
    "backup restoration",
    "real mobile/tablet devices",
  ])
    assert.match(source, new RegExp(value, "i"));
});
