import type { AnalyticsDomain, AnalyticsSnapshot } from "../domain/models";
export function dataset(s: AnalyticsSnapshot, d: AnalyticsDomain) {
  return s.datasets.find((x) => x.domain === d) ?? { domain: d, metrics: [] };
}
export const domainTitles: Record<AnalyticsDomain, string> = {
  executive: "Executive Command Center",
  sales: "Sales Analytics",
  crm: "CRM Analytics",
  properties: "Property Analytics",
  deals: "Deal Analytics",
  communications: "Communications Analytics",
  workforce: "Workforce Analytics",
  workflow: "Workflow Analytics",
  integrations: "Integration Analytics",
  observability: "Platform Observability",
};
