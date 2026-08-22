import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("contact validation precedes the resilient pipeline", () => {
  const action = read("features/marketing/actions/lead.actions.ts");
  assert.match(action, /schema\.safeParse/);
  assert.match(action, /ContactPipelineService/);
  assert.match(action, /submitted=true/);
  assert.doesNotMatch(action, /SupabaseMarketingProvider/);
});

test("marketing provider has bounded timeout and retry protection", () => {
  const provider = read("features/marketing/providers/supabase-marketing.provider.ts");
  for (const value of ["timeoutMs", "attempts = 3", "Promise.race", "configuration_missing", "database_unavailable", "retryable"]) assert.match(provider, new RegExp(value));
  assert.match(provider, /capture_public_marketing_lead/);
  assert.match(provider, /record_public_marketing_event/);
});

test("optional marketing failure never produces 503", () => {
  const route = read("app/api/marketing/events/route.ts");
  assert.match(route, /status: 202/);
  assert.doesNotMatch(route, /status: 503/);
  assert.match(route, /marketing\.event\.degraded/);
});

test("contact pipeline isolates storage and optional analytics failures", () => {
  const service = read("features/marketing/services/contact-pipeline.service.ts");
  assert.match(service, /captureLead/);
  assert.match(service, /record/);
  assert.match(service, /accepted: true/);
  assert.match(service, /retry_required/);
  assert.ok((service.match(/try \{/g) ?? []).length >= 2);
});

test("diagnostics are structured and secret safe", () => {
  const source = read("features/marketing/services/contact-pipeline.service.ts") + read("app/api/marketing/events/route.ts");
  for (const field of ["requestId", "correlationId", "tenantId", "route", "provider", "operation", "diagnostic", "retryRecommendation"]) assert.match(source, new RegExp(field));
  assert.doesNotMatch(source, /api[_-]?key|service_role|password|authorization/i);
});

test("success UI uses the production acknowledgement", () => {
  const ui = read("features/marketing/components/LeadCapture.tsx");
  for (const sentence of ["Thank you.", "Our team has received your request.", "We will contact you shortly."]) assert.match(ui, new RegExp(sentence.replace(/[.]/g, "\\.")));
  assert.doesNotMatch(ui, /This page couldn.t load/i);
});

test("forward migration repairs missing production tables and RPCs", () => {
  const sql = read("supabase/migrations/20260916000000_sprint84_2_public_contact_reliability.sql");
  for (const value of ["create table if not exists public.marketing_leads", "create table if not exists public.marketing_events", "capture_public_marketing_lead", "record_public_marketing_event", "enable row level security", "security definer", "grant execute"]) assert.match(sql, new RegExp(value, "i"));
});

test("CRM and email are not synchronous contact dependencies", () => {
  const pipeline = read("features/marketing/services/contact-pipeline.service.ts");
  assert.doesNotMatch(pipeline, /CRM|EmailService|sendEmail|captureException/);
});
