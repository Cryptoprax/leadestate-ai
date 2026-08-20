import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("Sprint 61 extends the existing runtime instead of adding another engine", () => {
  const adapter = read("features/platform/workflows/services/runtime-adapter.service.ts");
  assert.match(adapter, /WorkflowRuntimeEngine/);
  assert.match(adapter, /WorkflowActionDispatcher/);
  assert.match(adapter, /PermissionRuntimeAuthorizer/);
  assert.match(adapter, /ExistingPlatformWorkflowProvider/);
  assert.doesNotMatch(adapter, /while\s*\(|fetch\s*\(/);
});

test("visual builder supports every governed node family and persistence", () => {
  const registry = read("features/platform/workflows/registry/node-registry.ts");
  const designer = read("features/platform/workflows/components/WorkflowDesigner.tsx");
  for (const label of ["Trigger", "Condition", "Delay / wait", "Approval", "AI recommendation", "End"])
    assert.match(registry, new RegExp(label));
  assert.match(designer, /draggable/);
  assert.match(designer, /saveWorkflowAction/);
  assert.match(designer, /publishWorkflowAction/);
});

test("all Sprint 61 trigger, condition, and action contracts are registered", () => {
  const contracts = read("features/platform/workflows/domain/contracts.ts");
  for (const value of [
    "lead.created", "deal.stage_changed", "gmail.received", "whatsapp.received",
    "billing.payment_failed", "organization.role_changed", "ai.collaboration_completed",
    "time.recurring", "ai_confidence", "business_health", "subscription_plan",
    "crm.task.recommend", "gmail.draft", "whatsapp.draft", "approval.request",
    "executive.report",
  ]) assert.match(contracts, new RegExp(value.replaceAll(".", "\\.")));
});

test("workflow storage is tenant isolated, observable, auditable, and idempotent", () => {
  const migration = read("supabase/migrations/20260825000000_sprint61_enterprise_workflow_automation.sql");
  for (const table of ["workflow_definitions", "workflow_instances", "workflow_step_executions", "workflow_trigger_events", "workflow_automation_approvals"])
    assert.match(migration, new RegExp(`create table if not exists public\\.${table}`));
  assert.match(migration, /enable row level security/g);
  assert.match(migration, /current_workspace_role/);
  assert.match(migration, /unique\(workspace_id,idempotency_key\)/);
  assert.match(migration, /organization_audit_events/);
  for (const metric of ["duration_ms", "step_count", "ai_participation", "estimated_cost", "retry_count", "failure_reason"])
    assert.match(migration, new RegExp(metric));
});

test("dashboard provides monitoring, templates, approvals, cost, and failure analysis", () => {
  const dashboard = read("features/platform/workflows/components/WorkflowAutomationDashboard.tsx");
  for (const label of ["Total workflows", "Active workflows", "Success rate", "Average duration", "Pending approvals", "AI recommendations", "Recent executions", "Failure analysis"])
    assert.match(dashboard.toLowerCase(), new RegExp(label.toLowerCase()));
});

test("platform actions preserve recommendation and approval governance", () => {
  const provider = read("features/platform/workflows/providers/existing-platform.provider.ts");
  assert.match(provider, /approval_required/);
  assert.match(provider, /recommendationOnly/);
  assert.match(provider, /NotificationService/);
  assert.match(provider, /EmailService/);
  assert.match(provider, /TaskService/);
  assert.match(provider, /AIService/);
});
