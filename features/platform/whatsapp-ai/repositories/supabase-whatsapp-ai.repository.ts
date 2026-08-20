import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { WhatsAppAIEvidence, WhatsAppAIRepositoryContract } from "../contracts/repository";
import type { WhatsAppConversationIntelligence, WhatsAppLeadRole, WhatsAppPropertyMatch } from "../types";

type Row = Record<string, unknown>;
const text = (value: unknown, fallback = "") => value == null ? fallback : String(value);
const number = (value: unknown) => Number(value ?? 0) || 0;
const ageHours = (value: unknown) => value ? Math.max(0, (Date.now() - new Date(String(value)).getTime()) / 3_600_000) : 9999;

export class SupabaseWhatsAppAIRepository implements WhatsAppAIRepositoryContract {
  constructor(private client: SupabaseClient, private organizationId: string, private workspaceId: string) {}
  private table(name: string) { return this.client.from(name).select("*").eq("organization_id", this.organizationId).eq("workspace_id", this.workspaceId); }

  async evidence(): Promise<WhatsAppAIEvidence> {
    const [employee, conversations] = await Promise.all([
      this.table("ai_employees").eq("code", "ai_support_assistant").is("deleted_at", null).maybeSingle(),
      this.table("ai_workforce_conversations").eq("employee_code", "whatsapp-ai").is("deleted_at", null).limit(500),
    ]);
    if (employee.error) throw employee.error;
    if (conversations.error) throw conversations.error;
    const employeeId = (employee.data as Row | null)?.id;
    const conversationIds = ((conversations.data ?? []) as Row[]).map((row) => text(row.id));
    const recommendationQuery = employeeId
      ? this.table("ai_recommendations").eq("employee_id", employeeId).is("deleted_at", null).order("created_at", { ascending: false }).limit(30)
      : this.table("ai_recommendations").eq("employee_id", "00000000-0000-0000-0000-000000000000").limit(1);
    const usageQuery = conversationIds.length
      ? this.table("ai_workforce_messages").eq("role", "assistant").in("conversation_id", conversationIds).order("created_at", { ascending: false }).limit(500)
      : this.table("ai_workforce_messages").eq("conversation_id", "00000000-0000-0000-0000-000000000000").limit(1);
    const [threads, messages, leads, properties, meetings, recommendations, activity, usage] = await Promise.all([
      this.table("communication_threads").is("deleted_at", null).order("last_activity_at", { ascending: false }).limit(250),
      this.table("communications").eq("channel", "whatsapp").is("deleted_at", null).order("occurred_at").limit(2000),
      this.table("leads").is("deleted_at", null).limit(500), this.table("properties").eq("status", "available").is("deleted_at", null).limit(500),
      this.table("meetings").is("deleted_at", null).limit(500), recommendationQuery,
      this.table("activity_events").order("occurred_at", { ascending: false }).limit(100), usageQuery,
    ]);
    for (const result of [threads, messages, leads, properties, meetings, recommendations, activity, usage]) if (result.error) throw result.error;
    const messageRows = (messages.data ?? []) as Row[], leadRows = (leads.data ?? []) as Row[], propertyRows = (properties.data ?? []) as Row[], meetingRows = (meetings.data ?? []) as Row[];
    const responseMinutes: number[] = [];
    for (const thread of (threads.data ?? []) as Row[]) {
      const items = messageRows.filter((message) => text(message.thread_id) === text(thread.id));
      for (let index = 0; index < items.length; index++) if (text(items[index].direction) === "inbound") {
        const outbound = items.slice(index + 1).find((message) => text(message.direction) === "outbound");
        if (outbound) responseMinutes.push(Math.max(0, (new Date(text(outbound.occurred_at)).getTime() - new Date(text(items[index].occurred_at)).getTime()) / 60_000));
      }
    }
    const storedUsage = (usage.data ?? []) as Row[], storedRecommendations = (recommendations.data ?? []) as Row[];
    return {
      conversations: ((threads.data ?? []) as Row[]).filter((thread) => messageRows.some((message) => text(message.thread_id) === text(thread.id))).map((thread) => this.conversation(thread, messageRows, leadRows, propertyRows, meetingRows)),
      recommendations: storedRecommendations.map((row) => ({ id: text(row.id), title: text(row.title), summary: text(row.summary), status: text(row.status), confidence: row.confidence == null ? null : number(row.confidence), createdAt: text(row.created_at) })),
      timeline: ((activity.data ?? []) as Row[]).filter((row) => text(row.event_type).includes("whatsapp") || text(row.event_type).startsWith("ai.")).map((row) => ({ id: text(row.id), title: text(row.title), occurredAt: text(row.occurred_at) })),
      responseMinutes,
      observability: { promptTokens: storedUsage.reduce((sum, row) => sum + number(row.input_tokens), 0), completionTokens: storedUsage.reduce((sum, row) => sum + number(row.output_tokens), 0), latencyMs: storedUsage[0]?.latency_ms == null ? null : number(storedUsage[0].latency_ms), cost: storedUsage.reduce((sum, row) => sum + number(row.cost_estimate), 0), model: storedUsage[0]?.model ? text(storedUsage[0].model) : null, recommendations: storedRecommendations.length },
    };
  }

  private conversation(thread: Row, messages: Row[], leads: Row[], properties: Row[], meetings: Row[]): WhatsAppConversationIntelligence {
    const id = text(thread.id), items = messages.filter((message) => text(message.thread_id) === id), inbound = items.filter((message) => text(message.direction) === "inbound"), latest = inbound.at(-1);
    const body = inbound.slice(-10).map((message) => text(message.body)).join(" \n"), lower = body.toLowerCase();
    const lead = text(thread.related_type) === "lead" ? leads.find((item) => text(item.id) === text(thread.related_id)) : undefined;
    const role: WhatsAppLeadRole = /\bbroker\b/.test(lower) ? "broker" : /landlord|rent out|lease my/.test(lower) ? "landlord" : /tenant|want to rent|looking to rent/.test(lower) ? "tenant" : /sell my|selling/.test(lower) ? "seller" : /invest|roi|rental yield/.test(lower) ? "investor" : /buy|purchase|looking for/.test(lower) ? "buyer" : "unknown";
    const negative = /angry|unhappy|bad service|complaint|refund|frustrat/.test(lower), positive = /great|thanks|interested|perfect|love|yes/.test(lower);
    const sentiment = negative ? "negative" as const : positive ? "positive" as const : "neutral" as const;
    const questions = inbound.flatMap((message) => text(message.body).split(/(?<=[?])\s+/)).filter((value) => value.includes("?")).slice(-5), hours = ageHours(latest?.occurred_at ?? thread.last_activity_at);
    const unanswered = questions.length && text(items.at(-1)?.direction) === "inbound" ? questions : [];
    const temperature = /book|visit|offer|negot|ready|today|urgent/.test(lower) ? "hot" as const : /interested|price|budget|location|bedroom/.test(lower) ? "warm" as const : "cold" as const;
    const urgency = Math.min(100, (unanswered.length ? 25 : 0) + (negative ? 30 : 0) + (temperature === "hot" ? 30 : temperature === "warm" ? 15 : 0) + (hours > 24 ? 20 : hours > 4 ? 10 : 0) + number(thread.unread_count) * 5), escalation = negative && urgency >= 60;
    const health = escalation ? "escalation" as const : urgency >= 75 ? "high-priority" as const : temperature === "hot" ? "hot" as const : hours > 72 ? "no-response" as const : temperature === "cold" ? "cold" as const : "healthy" as const;
    const matches = this.matches(lead, properties), linkedMeetings = meetings.filter((meeting) => text(meeting.related_id) === text(lead?.id));
    const needs = [lead?.property_type && `Property type: ${text(lead.property_type)}`, lead?.bedrooms && `${number(lead.bedrooms)} bedrooms`, lead?.buying_purpose && `Purpose: ${text(lead.buying_purpose)}`].filter(Boolean) as string[];
    return { id, subject: text(thread.subject, "WhatsApp conversation"), leadId: lead ? text(lead.id) : null, customerName: lead ? text(lead.name) : null, intent: role === "unknown" ? "Intent requires human review" : `${role} enquiry`, buyingStage: temperature === "hot" ? "decision" : temperature === "warm" ? "consideration" : "discovery", sentiment, leadTemperature: temperature, responseUrgency: urgency, confidence: Math.min(.97, .5 + (lead ? .2 : 0) + Math.min(.2, inbound.length * .03) + (role !== "unknown" ? .07 : 0)), reasoning: `Based on ${inbound.length} inbound messages, ${unanswered.length} unanswered questions, ${Math.round(hours)} hours since the latest inbound message, and ${lead ? "an authoritative CRM lead link" : "no authoritative CRM link"}.`, unansweredQuestions: unanswered, leadRole: role, recommendedTags: role === "unknown" ? [] : [role, temperature, urgency >= 70 ? "priority" : null].filter(Boolean) as string[], summary: `${inbound.length} inbound and ${items.length - inbound.length} outbound WhatsApp messages. Sentiment is ${sentiment}; inferred stage is ${temperature === "hot" ? "decision" : temperature === "warm" ? "consideration" : "discovery"}.`, needs, budget: lead?.budget == null ? null : number(lead.budget), preferredLocation: Array.isArray(lead?.preferred_locations) ? text(lead.preferred_locations[0]) || null : null, timeline: lead?.timeline ? text(lead.timeline) : null, concerns: negative ? ["Negative sentiment requires human review"] : unanswered, nextAction: escalation ? "Escalate for human review before drafting a response." : unanswered.length ? "Draft answers for approval; do not send automatically." : linkedMeetings.length ? "Review the scheduled meeting and prepare a confirmation draft." : "Recommend the next human-reviewed follow-up.", health, unreadCount: number(thread.unread_count), lastActivityAt: text(thread.last_activity_at), messages: items.length, propertyMatches: matches };
  }

  private matches(lead: Row | undefined, properties: Row[]): WhatsAppPropertyMatch[] {
    if (!lead) return [];
    const budget = number(lead.budget), locations = Array.isArray(lead.preferred_locations) ? lead.preferred_locations.map((value) => text(value).toLowerCase()) : [], type = text(lead.property_type).toLowerCase(), bedrooms = number(lead.bedrooms);
    return properties.map((property) => {
      const price = number(property.sale_price || property.rental_price), location = text(property.locality || property.city).toLowerCase(), typeMatch = !type || text(property.property_type).toLowerCase() === type, locationMatch = !locations.length || locations.some((value) => location.includes(value) || value.includes(location)), bedroomMatch = !bedrooms || number(property.bedrooms) === bedrooms, budgetRatio = budget && price ? price / budget : 1;
      const match: WhatsAppPropertyMatch["match"] = typeMatch && locationMatch && bedroomMatch && budgetRatio <= 1.05 ? "best" : budgetRatio > 1.05 && budgetRatio <= 1.2 ? "upsell" : budgetRatio < .85 ? "budget" : locationMatch ? "alternative" : "nearby";
      const score = (typeMatch ? 3 : 0) + (locationMatch ? 3 : 0) + (bedroomMatch ? 2 : 0) + (budgetRatio <= 1.05 ? 2 : 0);
      return { score, item: { id: text(property.id), title: text(property.title), reference: text(property.reference), price, currency: text(property.currency), locality: text(property.locality || property.city), match, explanation: `${typeMatch ? "Property type matches" : "Alternative property type"}; ${locationMatch ? "preferred location matches" : "nearby/alternative location"}; ${bedroomMatch ? "bedroom need matches" : "bedroom alternative"}; price is ${budget ? `${Math.round(budgetRatio * 100)}% of recorded budget` : "shown without a recorded budget comparison"}.` } };
    }).sort((a, b) => b.score - a.score).slice(0, 5).map(({ item }) => item);
  }
}
