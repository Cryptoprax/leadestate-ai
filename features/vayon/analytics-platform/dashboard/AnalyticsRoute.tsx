import {
  AnalyticsHeader,
  Insights,
  MetricGrid,
  PlatformHealth,
} from "../components/AnalyticsViews";
import type { AnalyticsDomain } from "../domain/models";
import { AnalyticsService } from "../services/analytics.service";
import { dataset, domainTitles } from "../view-models/analytics";
export async function AnalyticsRoute({
  domain,
  overview = false,
}: {
  domain: AnalyticsDomain;
  overview?: boolean;
}) {
  const service = await AnalyticsService.production(),
    snapshot = await service.snapshot();
  return (
    <main className="mx-auto max-w-[110rem] px-5 py-8">
      <AnalyticsHeader
        title={
          overview
            ? "Enterprise Analytics & Intelligence"
            : domainTitles[domain]
        }
        description="Evidence-based organizational analytics. Missing production projections remain explicitly unavailable and every deterministic insight cites its evidence."
      />
      <MetricGrid data={dataset(snapshot, domain)} />
      {(overview || domain === "executive") && (
        <Insights items={service.insights(snapshot)} />
      )}{" "}
      {overview && <PlatformHealth s={snapshot} />}
    </main>
  );
}
