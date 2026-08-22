import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { AnalyticsAggregator } from "../aggregation/analytics.aggregator";
import type { AnalyticsInsight, AnalyticsSnapshot, EvidenceMetric, ExecutiveBIModel } from "../domain/models";
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
  async executiveBI(): Promise<ExecutiveBIModel> {
    const raw = await this.r.load(), source = this.r.provider;
    const number = (row: Record<string, unknown>, key: string) => Number(row[key] ?? 0);
    const stage = (row: Record<string, unknown>) => String(row.stage ?? row.stage_id ?? "Unassigned");
    const won = raw.deals.filter((row) => ["won", "closed-won", "completed"].includes(stage(row)));
    const lost = raw.deals.filter((row) => ["lost", "closed-lost"].includes(stage(row)));
    const closed = won.length + lost.length;
    const pipeline = raw.deals.reduce((sum, row) => sum + number(row, "value"), 0);
    const weighted = raw.deals.reduce((sum, row) => sum + number(row, "value") * number(row, "probability") / 100, 0);
    const group = (rows: readonly Record<string, unknown>[], key: (row: Record<string, unknown>) => string) => [...rows.reduce((map, row) => { const label = key(row) || "Unspecified"; return map.set(label, (map.get(label) ?? 0) + 1); }, new Map<string, number>())].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }));
    const stageGroups = group(raw.deals, stage).map((item) => ({ ...item, amount: raw.deals.filter((row) => stage(row) === item.label).reduce((sum, row) => sum + number(row, "value"), 0) }));
    const performerGroups = [...raw.deals.reduce((map, row) => { const label = String(row.assigned_agent_name ?? row.assigned_agent_id ?? "Unassigned"); const current = map.get(label) ?? { label, pipeline: 0, wins: 0 }; return map.set(label, { label, pipeline: current.pipeline + number(row, "value"), wins: current.wins + (won.includes(row) ? 1 : 0) }); }, new Map<string, { label: string; pipeline: number; wins: number }>()).values()].sort((a, b) => b.pipeline - a.pipeline);
    const metric = (id: string, label: string, value: string | number | null, available: boolean, explanation: string): EvidenceMetric => ({ id, label, value, available, source, explanation });
    const tasksOpen = raw.tasks.filter((row) => !["completed", "cancelled"].includes(String(row.status))).length;
    const confidence = raw.deals.length ? Math.min(95, Math.round(raw.deals.filter((row) => Number.isFinite(Number(row.value)) && Number.isFinite(Number(row.probability))).length / raw.deals.length * 100)) : 0;
    return {
      source, generatedAt: new Date().toISOString(),
      metrics: [
        metric("revenue", "Revenue", null, false, "Authoritative recognized revenue is not connected."),
        metric("arr", "ARR", null, false, "Authoritative subscription ARR is not available in this snapshot."),
        metric("mrr", "MRR", null, false, "Authoritative subscription MRR is not available in this snapshot."),
        metric("forecast", "Forecast", raw.deals.length ? weighted : null, raw.deals.length > 0, "Probability-weighted deal values."),
        metric("pipeline", "Pipeline", raw.deals.length ? pipeline : null, raw.deals.length > 0, "Sum of tenant-scoped recorded deals."),
        metric("win-rate", "Win Rate", closed ? `${Math.round(won.length / closed * 100)}%` : null, closed > 0, "Closed-won share of recorded closed outcomes."),
        metric("conversion", "Conversion", closed ? `${Math.round(won.length / closed * 100)}%` : null, closed > 0, "Recorded closed outcome conversion."),
        metric("meetings", "Meetings", raw.meetings.length, !raw.errors.meetings, "Tenant-scoped meeting count."),
        metric("tasks", "Tasks", tasksOpen, !raw.errors.tasks, "Open tenant-scoped task count."),
        metric("ai-productivity", "AI Productivity", null, false, "AI outcome attribution is not connected to this analytics snapshot."),
        metric("customer-health", "Customer Health", null, false, "No authoritative customer health projection is connected."),
        metric("growth", "Growth", null, false, "Comparable recognized-revenue periods are unavailable."),
        metric("cac", "CAC", null, false, "Authoritative acquisition cost attribution is unavailable."),
        metric("ltv", "LTV", null, false, "Authoritative customer lifetime value is unavailable."),
        metric("close-rate", "Close Rate", closed ? `${Math.round(won.length / closed * 100)}%` : null, closed > 0, "Recorded closed-won share."),
        metric("response-time", "Response Time", null, false, "Communication response-time projection is unavailable."),
        metric("time-to-close", "Time to Close", null, false, "Deal stage chronology is unavailable."),
        metric("pipeline-coverage", "Pipeline Coverage", null, false, "Quota targets are not connected."),
        metric("customer-growth", "Customer Growth", null, false, "Comparable customer periods are unavailable."),
        metric("sales-velocity", "Sales Velocity", null, false, "Time-to-close evidence is unavailable."),
        metric("sales-cycle", "Sales Cycle", null, false, "Deal lifecycle chronology is unavailable."),
        metric("stage-duration", "Stage Duration", null, false, "Stage transition timestamps are unavailable."),
      ],
      forecast: { weighted: raw.deals.length ? weighted : null, bestCase: raw.deals.length ? pipeline : null, expected: raw.deals.length ? weighted : null, worstCase: raw.deals.length ? weighted * .6 : null, confidence, quarter: raw.deals.length ? weighted : null, annual: raw.deals.length ? weighted * 4 : null },
      leadSources: group(raw.leads, (row) => String(row.source ?? "Unspecified")),
      stages: stageGroups,
      performers: performerGroups.map(({ label, wins }) => ({ label, value: wins })),
      lostReasons: group(lost, (row) => String(row.lost_reason ?? row.loss_reason ?? "Reason not recorded")),
      benchmarks: performerGroups,
      digest: (["Yesterday", "Last Week", "Last Month", "Quarter"] as const).map((period) => ({ period, achievements: won.length, risks: lost.length, pendingApprovals: raw.workflows.filter((row) => String(row.status) === "pending").length })),
    };
  }
}
