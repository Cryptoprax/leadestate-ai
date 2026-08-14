import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { AnalyticsAggregator } from "../aggregation/analytics.aggregator";
import type { AnalyticsInsight, AnalyticsSnapshot } from "../domain/models";
import type { AnalyticsRepository } from "../contracts/repository";
import { AuroraAnalyticsRepository } from "../repositories/aurora.repository";
import { SupabaseAnalyticsRepository } from "../repositories/supabase.repository";
export class AnalyticsService {
  constructor(
    private r: AnalyticsRepository,
    private a = new AnalyticsAggregator(),
  ) {}
  static async production() {
    const c = await operationsContext();
    return new AnalyticsService(
      new SupabaseAnalyticsRepository(
        c.client,
        c.organizationId,
        c.workspaceId,
      ),
    );
  }
  static demo() {
    return new AnalyticsService(new AuroraAnalyticsRepository());
  }
  async snapshot(): Promise<AnalyticsSnapshot> {
    const raw = await this.r.load();
    return {
      datasets: this.a.aggregate(raw, this.r.provider),
      source: this.r.provider,
      generatedAt: new Date().toISOString(),
    };
  }
  insights(s: AnalyticsSnapshot): readonly AnalyticsInsight[] {
    const available = s.datasets
        .flatMap((x) => x.metrics)
        .filter((x) => x.available),
      unavailable = s.datasets
        .flatMap((x) => x.metrics)
        .filter((x) => !x.available);
    return [
      {
        kind: "business-summary",
        statement: `${available.length} evidence-backed metrics are available.`,
        evidenceIds: available.slice(0, 5).map((x) => x.id),
        deterministic: true,
        providerCalled: false,
      },
      {
        kind: "top-risks",
        statement: `${unavailable.length} metrics await authoritative data.`,
        evidenceIds: unavailable.slice(0, 5).map((x) => x.id),
        deterministic: true,
        providerCalled: false,
      },
      {
        kind: "recommended-priorities",
        statement:
          "Connect authoritative projections before operational decisions.",
        evidenceIds: unavailable.slice(0, 3).map((x) => x.id),
        deterministic: true,
        providerCalled: false,
      },
      {
        kind: "growth-opportunities",
        statement: "Review evidence-backed sales and property relationships.",
        evidenceIds: available
          .filter((x) => ["sales", "inventory"].some((k) => x.id.includes(k)))
          .map((x) => x.id),
        deterministic: true,
        providerCalled: false,
      },
      {
        kind: "operational-health",
        statement:
          "Repository and queue health are reported without provider calls.",
        evidenceIds: ["repository-health", "queue-health"],
        deterministic: true,
        providerCalled: false,
      },
    ];
  }
}
