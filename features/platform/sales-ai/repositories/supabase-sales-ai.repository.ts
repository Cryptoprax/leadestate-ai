import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SalesAIRepositoryContract, SalesEvidence } from "../contracts/repository";
import type { DealInsight, LeadTemperature, SalesLeadInsight } from "../types";

type Row = Record<string, unknown>;
const number = (value: unknown) => Number(value ?? 0) || 0;
const text = (value: unknown, fallback = "") => value == null ? fallback : String(value);
const daysSince = (value: unknown) => value ? Math.max(0, Math.floor((Date.now() - new Date(String(value)).getTime()) / 86_400_000)) : 999;

export class SupabaseSalesAIRepository implements SalesAIRepositoryContract {
  constructor(private client: SupabaseClient, private organizationId: string, private workspaceId: string) {}
  private table(name: string) { return this.client.from(name).select("*").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId); }
  async evidence(): Promise<SalesEvidence> {
    const [employeeResult, conversationResult] = await Promise.all([
      this.table("ai_employees").eq("code", "ai_sales_director").is("deleted_at", null).maybeSingle(),
      this.table("ai_workforce_conversations").eq("employee_code", "sales-ai").is("deleted_at", null).limit(500),
    ]);
    if (employeeResult.error) throw employeeResult.error;
    if (conversationResult.error) throw conversationResult.error;
    const employeeId = (employeeResult.data as Row | null)?.id, conversationIds = ((conversationResult.data ?? []) as Row[]).map((row) => text(row.id));
    const recommendationQuery = employeeId ? this.table("ai_recommendations").eq("employee_id", employeeId).is("deleted_at", null).order("created_at", { ascending: false }).limit(20) : this.table("ai_recommendations").eq("employee_id", "00000000-0000-0000-0000-000000000000").limit(20);
    const usageQuery = conversationIds.length ? this.table("ai_workforce_messages").eq("role", "assistant").in("conversation_id", conversationIds).order("created_at", { ascending: false }).limit(500) : this.table("ai_workforce_messages").eq("conversation_id", "00000000-0000-0000-0000-000000000000").limit(1);
    const [leadsResult, dealsResult, tasksResult, meetingsResult, communicationsResult, approvalsResult, recommendationsResult, activityResult, usageResult] = await Promise.all([
      this.table("leads").is("deleted_at", null).order("updated_at", { ascending: false }).limit(250),
      this.table("deals").is("deleted_at", null).order("updated_at", { ascending: false }).limit(250),
      this.table("tasks").is("deleted_at", null).limit(500),
      this.table("meetings").is("deleted_at", null).gte("starts_at", new Date().toISOString()).order("starts_at").limit(50),
      this.table("communications").in("channel", ["email", "whatsapp"]).is("deleted_at", null).order("occurred_at", { ascending: false }).limit(50),
      this.table("ai_approval_queue").eq("status", "pending").limit(500),
      recommendationQuery,
      this.table("activity_events").order("occurred_at", { ascending: false }).limit(20),
      usageQuery,
    ]);
    for (const result of [leadsResult, dealsResult, tasksResult, meetingsResult, communicationsResult, approvalsResult, recommendationsResult, activityResult, usageResult]) if (result.error) throw result.error;
    const leadRows = (leadsResult.data ?? []) as Row[], taskRows = (tasksResult.data ?? []) as Row[];
    const leads = leadRows.map((row) => this.lead(row));
    const deals = ((dealsResult.data ?? []) as Row[]).map((row) => this.deal(row, taskRows));
    const normalized = new Map<string, number>();
    for (const row of leadRows) { const key = `${text(row.email).trim().toLowerCase()}|${text(row.phone).replace(/\D/g, "")}`; if (key !== "|") normalized.set(key, (normalized.get(key) ?? 0) + 1); }
    const usage = (usageResult.data ?? []) as Row[];
    return {
      leads, deals,
      meetings: ((meetingsResult.data ?? []) as Row[]).map((row) => ({ id: text(row.id), title: text(row.title, "Sales meeting"), startsAt: text(row.starts_at), status: text(row.status, "scheduled") })),
      recentCommunications: ((communicationsResult.data ?? []) as Row[]).map((row) => ({ channel: text(row.channel) === "whatsapp" ? "whatsapp" as const : "email" as const, direction: text(row.direction), occurredAt: text(row.occurred_at), summary: text(row.body).slice(0, 500) })),
      overdueTasks: taskRows.filter((row) => !["completed", "cancelled"].includes(text(row.status)) && row.due_at && new Date(text(row.due_at)) < new Date()).length,
      duplicateLeadCount: [...normalized.values()].filter((count) => count > 1).reduce((sum, count) => sum + count - 1, 0),
      missingFieldCount: leadRows.filter((row) => !row.email || !row.budget || !row.property_type || !(row.preferred_locations as unknown[] | null)?.length).length,
      unassignedLeadCount: leadRows.filter((row) => !row.assigned_agent_id && !row.assigned_employee_id).length,
      slowResponseCount: leadRows.filter((row) => daysSince(row.last_activity_at) > 2 && !["won", "lost", "archived"].includes(text(row.status))).length,
      pendingApprovals: (approvalsResult.data ?? []).length,
      recommendations: ((recommendationsResult.data ?? []) as Row[]).map((row) => ({ id: text(row.id), title: text(row.title), summary: text(row.summary), type: text(row.recommendation_type), confidence: row.confidence == null ? null : number(row.confidence), status: text(row.status), createdAt: text(row.created_at) })),
      timeline: ((activityResult.data ?? []) as Row[]).filter((row) => text(row.event_type).startsWith("ai.")).map((row) => ({ id: text(row.id), title: text(row.title), detail: row.description == null ? null : text(row.description), occurredAt: text(row.occurred_at) })),
      observability: { promptTokens: usage.reduce((sum, row) => sum + number(row.input_tokens), 0), completionTokens: usage.reduce((sum, row) => sum + number(row.output_tokens), 0), latencyMs: usage[0]?.latency_ms == null ? null : number(usage[0].latency_ms), estimatedCost: usage.reduce((sum, row) => sum + number(row.cost_estimate), 0), model: usage[0]?.model ? text(usage[0].model) : null, recommendationCount: (recommendationsResult.data ?? []).length },
    };
  }
  private lead(row: Row): SalesLeadInsight {
    const age = daysSince(row.last_activity_at), value = number(row.budget), stored = number(row.lead_score);
    const computed = Math.max(0, Math.min(100, (row.email ? 12 : 0) + (row.phone ? 12 : 0) + (value > 0 ? 20 : 0) + (row.property_type ? 12 : 0) + ((row.preferred_locations as unknown[] | null)?.length ? 12 : 0) + (age <= 2 ? 22 : age <= 7 ? 10 : 0) + (["qualified", "meeting_scheduled", "viewing_scheduled", "negotiation"].includes(text(row.status)) ? 10 : 0)));
    const score = stored || computed, temperature: LeadTemperature = score >= 75 ? "hot" : score >= 45 ? "warm" : "cold";
    const reasons = [value > 0 ? "budget captured" : "budget missing", age <= 2 ? "recent engagement" : age <= 7 ? "follow-up aging" : "inactive", row.assigned_agent_id || row.assigned_employee_id ? "owner assigned" : "unassigned"];
    return { id: text(row.id), name: text(row.name, "Unnamed lead"), temperature, confidence: Math.min(.98, .55 + [row.email, row.phone, row.budget, row.property_type, row.last_activity_at].filter(Boolean).length * .08), explanation: `${score}/100: ${reasons.join(", ")}.`, status: text(row.status), value, lastActivity: row.last_activity_at ? text(row.last_activity_at) : null };
  }
  private deal(row: Row, tasks: Row[]): DealInsight {
    const age = daysSince(row.stage_changed_at ?? row.updated_at), stage = text(row.stage_name ?? row.stage ?? row.stage_id, "Unspecified"), value = number(row.value ?? row.amount), probability = number(row.probability) || (/won/i.test(stage) ? 100 : /negotiat|proposal/i.test(stage) ? 70 : /qualif/i.test(stage) ? 45 : 25);
    const related = tasks.filter((task) => text(task.deal_id ?? task.related_id) === text(row.id) && !["completed", "cancelled"].includes(text(task.status)));
    const missing = [related.length ? null : "No open follow-up task", row.next_activity_at ? null : "No next activity scheduled", row.expected_closing ? null : "Expected close date missing"].filter(Boolean) as string[];
    const risk = age > 21 || missing.length >= 2 ? "high" : age > 10 || missing.length ? "medium" : "low";
    return { id: text(row.id), title: text(row.name ?? row.title, "Untitled deal"), stage, daysInStage: age, risk, probability, value, missingActivities: missing, nextAction: missing[0] ?? (risk === "high" ? "Review stalled deal with the owner" : "Confirm the next customer commitment") };
  }
}
