import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CRMAIRepositoryContract, CRMEvidence } from "../contracts/repository";
import type { CRMCustomerIntelligence, CRMHealthIssue } from "../types";

type Row = Record<string, unknown>;
const string = (value: unknown, fallback = "") => value == null ? fallback : String(value);
const number = (value: unknown) => Number(value ?? 0) || 0;
const days = (value: unknown) => value ? Math.max(0, Math.floor((Date.now() - new Date(String(value)).getTime()) / 86_400_000)) : 999;
const closed = (row: Row) => /won|lost|closed|archived/i.test(string(row.status)) || /won|lost|closed/i.test(string(row.stage_id));

export class SupabaseCRMAIRepository implements CRMAIRepositoryContract {
  constructor(private client: SupabaseClient, private organizationId: string, private workspaceId: string) {}
  private table(name: string) { return this.client.from(name).select("*").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId); }
  async evidence(): Promise<CRMEvidence> {
    const [employee, conversations] = await Promise.all([this.table("ai_employees").eq("code", "ai_property_expert").is("deleted_at", null).maybeSingle(), this.table("ai_workforce_conversations").eq("employee_code", "crm-ai").is("deleted_at", null).limit(500)]);
    if (employee.error) throw employee.error; if (conversations.error) throw conversations.error;
    const employeeId = (employee.data as Row | null)?.id, conversationIds = ((conversations.data ?? []) as Row[]).map((row) => string(row.id));
    const recommendations = employeeId ? this.table("ai_recommendations").eq("employee_id", employeeId).is("deleted_at", null).order("created_at", { ascending: false }).limit(30) : this.table("ai_recommendations").eq("employee_id", "00000000-0000-0000-0000-000000000000").limit(1);
    const usage = conversationIds.length ? this.table("ai_workforce_messages").eq("role", "assistant").in("conversation_id", conversationIds).order("created_at", { ascending: false }).limit(500) : this.table("ai_workforce_messages").eq("conversation_id", "00000000-0000-0000-0000-000000000000").limit(1);
    const [leads, deals, meetings, communications, activity, recommendationRows, usageRows] = await Promise.all([
      this.table("leads").is("deleted_at", null).order("updated_at", { ascending: false }).limit(500), this.table("deals").is("deleted_at", null).limit(500), this.table("meetings").is("deleted_at", null).limit(500), this.table("communications").is("deleted_at", null).order("occurred_at", { ascending: false }).limit(1000), this.table("activity_events").order("occurred_at", { ascending: false }).limit(200), recommendations, usage,
    ]);
    for (const result of [leads, deals, meetings, communications, activity, recommendationRows, usageRows]) if (result.error) throw result.error;
    const leadRows = (leads.data ?? []) as Row[], dealRows = (deals.data ?? []) as Row[], meetingRows = (meetings.data ?? []) as Row[], communicationRows = (communications.data ?? []) as Row[], activityRows = (activity.data ?? []) as Row[];
    const customers = leadRows.map((lead) => this.customer(lead, dealRows, meetingRows, communicationRows, activityRows));
    const duplicates = this.duplicates(leadRows), missing = leadRows.filter((row) => !row.email || !row.phone || !row.name).length, invalid = leadRows.filter((row) => row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string(row.email))).length;
    const orphanDeals = dealRows.filter((row) => !row.lead_id).length, incompleteDeals = dealRows.filter((row) => !closed(row) && (!row.expected_closing || !row.assigned_agent_id || !row.value)).length;
    const issues: CRMHealthIssue[] = [
      { code: "duplicate_leads", label: "Duplicate leads", count: duplicates, available: true, recommendation: "Review matching email and phone records before approving a merge." },
      { code: "duplicate_contacts", label: "Duplicate contacts", count: null, available: false, recommendation: "Contact storage is not available; no duplicate result was inferred." },
      { code: "duplicate_companies", label: "Duplicate companies", count: null, available: false, recommendation: "Company storage is not available; no duplicate result was inferred." },
      { code: "missing_contact", label: "Missing phone or email", count: missing, available: true, recommendation: "Request missing contact information; do not enrich or edit automatically." },
      { code: "invalid_data", label: "Invalid data", count: invalid, available: true, recommendation: "Confirm invalid email formats with the record owner." },
      { code: "incomplete_opportunities", label: "Incomplete opportunities", count: incompleteDeals, available: true, recommendation: "Complete owner, value, and expected close date after human review." },
      { code: "orphaned_records", label: "Orphaned records", count: orphanDeals, available: true, recommendation: "Review opportunities without a lead relationship; never fabricate a link." },
    ];
    const storedUsage = (usageRows.data ?? []) as Row[], storedRecommendations = (recommendationRows.data ?? []) as Row[];
    return { customers, issues, recommendations: storedRecommendations.map((row) => ({ id: string(row.id), title: string(row.title), summary: string(row.summary), status: string(row.status), confidence: row.confidence == null ? null : number(row.confidence), createdAt: string(row.created_at) })), recentActivity: activityRows.slice(0, 20).map((row) => ({ id: string(row.id), title: string(row.title), detail: row.description == null ? null : string(row.description), occurredAt: string(row.occurred_at) })), observability: { latencyMs: storedUsage[0]?.latency_ms == null ? null : number(storedUsage[0].latency_ms), promptTokens: storedUsage.reduce((sum,row) => sum + number(row.input_tokens), 0), completionTokens: storedUsage.reduce((sum,row) => sum + number(row.output_tokens), 0), estimatedCost: storedUsage.reduce((sum,row) => sum + number(row.cost_estimate), 0), model: storedUsage[0]?.model ? string(storedUsage[0].model) : null, recommendations: storedRecommendations.length } };
  }
  private duplicates(rows: Row[]) { const keys = new Map<string, number>(); for (const row of rows) { const key = `${string(row.email).trim().toLowerCase()}|${string(row.phone).replace(/\D/g, "")}`; if (key !== "|") keys.set(key, (keys.get(key) ?? 0) + 1); } return [...keys.values()].reduce((sum,count) => sum + Math.max(0,count-1),0); }
  private customer(lead: Row, deals: Row[], meetings: Row[], communications: Row[], activities: Row[]): CRMCustomerIntelligence {
    const id = string(lead.id), relatedDeals = deals.filter((row) => string(row.lead_id) === id), relatedMeetings = meetings.filter((row) => string(row.related_id) === id || relatedDeals.some((deal) => string(row.related_id) === string(deal.id))), relatedCommunications = communications.filter((row) => string((row.metadata as Row | null)?.lead_id) === id), relatedActivity = activities.filter((row) => string(row.related_id) === id), openDeals = relatedDeals.filter((row) => !closed(row)), value = openDeals.reduce((sum,row) => sum + number(row.value),0), lastContact = [lead.last_activity_at, ...relatedCommunications.map((row) => row.occurred_at), ...relatedMeetings.map((row) => row.starts_at)].filter(Boolean).map(String).sort().reverse()[0] ?? null, inactiveDays = days(lastContact);
    const email = lead.email ? string(lead.email) : null, phone = lead.phone ? string(lead.phone) : null, activityCount = relatedActivity.length + relatedCommunications.length + relatedMeetings.length + relatedDeals.length;
    const healthScore = Math.max(0, Math.min(100, 45 + (email ? 8 : -8) + (phone ? 8 : -8) + Math.min(15, activityCount * 2) + (inactiveDays <= 7 ? 15 : inactiveDays <= 30 ? 5 : -20) + (openDeals.length ? 9 : 0)));
    const won = relatedDeals.filter((row) => /won|closed/i.test(string(row.status)) || /won/i.test(string(row.stage_id))).length;
    const segment = string(lead.priority).match(/vip/i) ? "vip" : value >= 10_000_000 ? "high-value" : inactiveDays > 60 ? "inactive" : healthScore < 45 ? "at-risk" : won > 0 ? "returning" : "active";
    const channels = { email: relatedCommunications.filter((row) => string(row.channel) === "email").length, whatsapp: relatedCommunications.filter((row) => string(row.channel) === "whatsapp").length };
    const timelineSummary = `${string(lead.name, "Customer")} entered CRM ${days(lead.created_at)} days ago. Opened ${relatedDeals.length} opportunities and attended ${relatedMeetings.filter((row) => string(row.status) === "completed").length} meetings. ${openDeals.length ? `Currently has ${openDeals.length} open opportunity${openDeals.length === 1 ? "" : "ies"}.` : "No open opportunity is recorded."}`;
    return { id, name: string(lead.name, "Unnamed customer"), email, phone, status: string(lead.status), healthScore, segment, summary: `${activityCount} lifetime CRM touchpoints; ${channels.email} email and ${channels.whatsapp} WhatsApp interactions; ${openDeals.length} open opportunities.`, timelineSummary, recentInteractions: relatedCommunications.slice(0,5).map((row) => `${string(row.channel)} ${string(row.direction)} on ${string(row.occurred_at)}`), openOpportunities: openDeals.length, opportunityValue: value, lifetimeActivity: activityCount, lastContact, nextEngagement: inactiveDays > 30 ? "Recommend a human-reviewed re-engagement plan." : openDeals.length ? "Recommend reviewing the next opportunity milestone." : "Recommend confirming whether a new need exists." };
  }
}
