import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { CrmRepository } from "../contracts/repository";
import type { CrmDashboardModel, CrmLeadListQuery } from "../domain/contracts";
import { AuroraCrmRepository } from "../repositories/aurora-crm.repository";
import { SupabaseCrmRepository } from "../repositories/supabase-crm.repository";
import { PipelineService } from "@/features/vayon/deal/services/pipeline.service";
import { TaskService } from "@/features/vayon/operations/services/task.service";
import { MeetingService } from "@/features/vayon/operations/services/meeting.service";
export const defaultCrmQuery: CrmLeadListQuery = {
  sort: "updated_at",
  direction: "desc",
  page: 1,
  pageSize: 25,
};
export class CrmService {
  constructor(private repository: CrmRepository) {}
  static async production() {
    const { client, organizationId, workspaceId } = await operationsContext();
    return new CrmService(
      new SupabaseCrmRepository(client, organizationId, workspaceId),
    );
  }
  static demo() {
    return new CrmService(new AuroraCrmRepository());
  }
  leads(query: Partial<CrmLeadListQuery> = {}) {
    return this.repository.leads({ ...defaultCrmQuery, ...query });
  }
  customers(query: Partial<CrmLeadListQuery> = {}) {
    return this.repository.customers({ ...defaultCrmQuery, ...query });
  }
  companies(search?: string) {
    return this.repository.companies(search);
  }
  activities(limit?: number) {
    return this.repository.activities(limit);
  }
  lead(id: string) {
    return this.repository.lead(id);
  }
  async dashboard(): Promise<CrmDashboardModel> {
    const [page, activity] = await Promise.all([
        this.leads({ pageSize: 100 }),
        this.activities(8),
      ]),
      hot = page.items.filter(
        (item) =>
          item.priority === "urgent" ||
          item.priority === "vip" ||
          Number(item.aiScore) >= 80,
      ).length,
      inactive = page.items.filter((item) => !item.lastActivity).length,
      won = page.items.filter(
        (item) => item.status === "won" || item.status === "converted",
      ).length,
      lost = page.items.filter(
        (item) => item.status === "lost" || item.status === "closed",
      ).length;
    return {
      provider: this.repository.provider,
      stats: [
        {
          label: "New Leads",
          value: String(
            page.items.filter((item) => item.status === "new").length,
          ),
          state: "available",
        },
        { label: "Hot Leads", value: String(hot), state: "available" },
        { label: "Inactive", value: String(inactive), state: "available" },
        { label: "Won", value: String(won), state: "available" },
        { label: "Lost", value: String(lost), state: "available" },
        {
          label: "Average Response Time",
          value: "Awaiting data",
          state: "unavailable",
        },
        {
          label: "Average Conversion",
          value: "Awaiting data",
          state: "unavailable",
        },
      ],
      recentLeads: page.items.slice(0, 8),
      recentActivity: activity,
    };
  }
  async salesDashboard() {
    const [leads, pipeline, tasks, meetings] = await Promise.all([
      this.leads({ pageSize: 100 }),
      new PipelineService().board(),
      new TaskService().list(),
      new MeetingService().list(),
    ]);
    const rank = (values: readonly string[]) => [...values.reduce((map, value) => map.set(value, (map.get(value) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, count]) => ({ label, count }));
    const won = pipeline.deals.filter(deal => deal.stageId === "completed");
    return {
      revenue: won.reduce((sum, deal) => sum + (deal.value?.amount ?? 0), 0),
      forecast: pipeline.forecastRevenue,
      conversion: pipeline.conversion,
      meetings: meetings.length,
      tasks: tasks.filter(task => task.status !== "completed" && task.status !== "cancelled").length,
      pipeline: pipeline.totalValue,
      leadSources: rank(leads.items.map(lead => lead.source)),
      topSalespeople: rank(leads.items.map(lead => lead.assignedAgent)),
    };
  }
}
