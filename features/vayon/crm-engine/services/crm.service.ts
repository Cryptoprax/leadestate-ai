import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { CrmRepository } from "../contracts/repository";
import type { CrmDashboardModel, CrmLeadListQuery } from "../domain/contracts";
import { AuroraCrmRepository } from "../repositories/aurora-crm.repository";
import { SupabaseCrmRepository } from "../repositories/supabase-crm.repository";
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
}
