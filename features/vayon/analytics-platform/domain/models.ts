export type AnalyticsDomain =
  | "executive"
  | "sales"
  | "crm"
  | "properties"
  | "deals"
  | "communications"
  | "workforce"
  | "workflow"
  | "integrations"
  | "observability";
export interface EvidenceMetric {
  readonly id: string;
  readonly label: string;
  readonly value: string | number | null;
  readonly available: boolean;
  readonly source: string;
  readonly explanation: string;
  readonly measuredAt?: string;
}
export interface AnalyticsDataset {
  readonly domain: AnalyticsDomain;
  readonly metrics: readonly EvidenceMetric[];
}
export interface AnalyticsSnapshot {
  readonly datasets: readonly AnalyticsDataset[];
  readonly source: "supabase" | "aurora";
  readonly generatedAt: string;
}
export interface AnalyticsInsight {
  readonly kind:
    | "business-summary"
    | "top-risks"
    | "recommended-priorities"
    | "growth-opportunities"
    | "operational-health";
  readonly statement: string;
  readonly evidenceIds: readonly string[];
  readonly deterministic: true;
  readonly providerCalled: false;
}
export interface AnalyticsRawSnapshot {
  readonly leads: readonly Record<string, unknown>[];
  readonly deals: readonly Record<string, unknown>[];
  readonly properties: readonly Record<string, unknown>[];
  readonly meetings: readonly Record<string, unknown>[];
  readonly visits: readonly Record<string, unknown>[];
  readonly tasks: readonly Record<string, unknown>[];
  readonly communications: readonly Record<string, unknown>[];
  readonly workflows: readonly Record<string, unknown>[];
  readonly providers: readonly Record<string, unknown>[];
  readonly errors: Readonly<Record<string, string>>;
}
export interface ExecutiveBIModel {
  readonly source: "supabase" | "aurora";
  readonly generatedAt: string;
  readonly metrics: readonly EvidenceMetric[];
  readonly forecast: {
    readonly weighted: number | null;
    readonly bestCase: number | null;
    readonly expected: number | null;
    readonly worstCase: number | null;
    readonly confidence: number;
    readonly quarter: number | null;
    readonly annual: number | null;
  };
  readonly leadSources: readonly { label: string; value: number }[];
  readonly stages: readonly { label: string; value: number; amount: number }[];
  readonly performers: readonly { label: string; value: number }[];
  readonly lostReasons: readonly { label: string; value: number }[];
  readonly benchmarks: readonly { label: string; pipeline: number; wins: number }[];
  readonly digest: readonly { period: "Yesterday" | "Last Week" | "Last Month" | "Quarter"; achievements: number; risks: number; pendingApprovals: number }[];
}
