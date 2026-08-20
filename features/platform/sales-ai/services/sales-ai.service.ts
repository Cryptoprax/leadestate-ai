import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { SalesAIRepositoryContract } from "../contracts/repository";
import { SupabaseSalesAIRepository } from "../repositories/supabase-sales-ai.repository";
import type { SalesAIDashboard } from "../types";
import { GmailPlatformService } from "@/features/platform/gmail/services/gmail-platform.service";
import { GoogleCalendarPlatformService } from "@/features/platform/google-calendar/services/google-calendar.service";

export class SalesAIService {
  constructor(private repository: SalesAIRepositoryContract) {}
  static async production() { const context = await operationsContext(); return new SalesAIService(new SupabaseSalesAIRepository(context.client, context.organizationId, context.workspaceId)); }
  async dashboard(): Promise<SalesAIDashboard> {
    const evidence = await this.repository.evidence();
    const activeDeals = evidence.deals.filter((deal) => !/won|lost|closed/i.test(deal.stage));
    const weighted = activeDeals.reduce((sum, deal) => sum + deal.value * deal.probability / 100, 0), atRisk = activeDeals.filter((deal) => deal.risk === "high");
    const health = atRisk.length > activeDeals.length / 2 ? "critical" : atRisk.length || evidence.overdueTasks ? "watch" : "healthy";
    const priorities = [...atRisk.slice(0, 3).map((deal) => `Recover ${deal.title}: ${deal.nextAction}`), ...evidence.leads.filter((lead) => lead.temperature === "hot").slice(0, 3).map((lead) => `Follow up with ${lead.name}: ${lead.explanation}`), ...(evidence.overdueTasks ? [`Resolve ${evidence.overdueTasks} overdue follow-up${evidence.overdueTasks === 1 ? "" : "s"}`] : [])].slice(0, 6);
    const cleanup = [[evidence.duplicateLeadCount, "potential duplicate leads"], [evidence.missingFieldCount, "leads with missing qualification fields"], [evidence.unassignedLeadCount, "unassigned leads"], [evidence.slowResponseCount, "leads with long response times"]] as const;
    return { briefing: { priorities, upcomingMeetings: evidence.meetings.length, overdueFollowUps: evidence.overdueTasks, dealsAtRisk: atRisk.length, highValueOpportunities: activeDeals.filter((deal) => deal.value >= 10_000_000 && deal.risk !== "high").length, expectedRevenue: weighted }, leads: evidence.leads, deals: activeDeals, forecast: { expectedMonthlyRevenue: weighted, likelyClosedDeals: activeDeals.filter((deal) => deal.probability >= 70 && deal.risk !== "high").length, atRiskRevenue: atRisk.reduce((sum, deal) => sum + deal.value, 0), pipelineHealth: health, confidence: activeDeals.length ? Math.min(.95, .55 + activeDeals.length * .025) : .2, explanation: activeDeals.length ? `Weighted from ${activeDeals.length} active deals using recorded probability, stage age, and missing-activity risk.` : "No active deal evidence is available; forecast confidence is low." }, pendingApprovals: evidence.pendingApprovals, recommendations: evidence.recommendations, timeline: evidence.timeline, crmCleanup: cleanup.filter(([count]) => count > 0).map(([count, label]) => `${count} ${label}`), observability: evidence.observability, generatedAt: new Date().toISOString() };
  }
  async runtimeContext() {
    const [data, evidence, gmail, calendar] = await Promise.all([
      this.dashboard(),
      this.repository.evidence(),
      new GmailPlatformService().health(),
      new GoogleCalendarPlatformService().health(),
    ]);
    return JSON.stringify({ generatedAt: data.generatedAt, briefing: data.briefing, topLeads: data.leads.slice(0, 20), deals: data.deals.slice(0, 20), recentEmailAndWhatsApp: evidence.recentCommunications, meetings: evidence.meetings, forecast: data.forecast, crmCleanup: data.crmCleanup, integrations: { gmail: gmail.connection, googleCalendar: calendar.connection, whatsapp: evidence.recentCommunications.some((item) => item.channel === "whatsapp") ? "workspace records available" : "no workspace records" }, governance: { recommendationOnly: true, approvalRequired: true, sendingAllowed: false } });
  }
}
