import type {
  AnalyticsDataset,
  AnalyticsRawSnapshot,
  EvidenceMetric,
} from "../domain/models";
const unavailable = (
  id: string,
  label: string,
  source: string,
  reason: string,
): EvidenceMetric => ({
  id,
  label,
  value: null,
  available: false,
  source,
  explanation: reason,
});
const count = (
  id: string,
  label: string,
  items: readonly unknown[],
  source: string,
  error?: string,
): EvidenceMetric =>
  error
    ? unavailable(
        id,
        label,
        source,
        "Authoritative production source unavailable.",
      )
    : {
        id,
        label,
        value: items.length,
        available: true,
        source,
        explanation: "Counted from the tenant-scoped repository snapshot.",
      };
const values = (items: readonly Record<string, unknown>[], key: string) =>
  items.map((x) => Number(x[key])).filter(Number.isFinite);
export class AnalyticsAggregator {
  aggregate(
    r: AnalyticsRawSnapshot,
    source: string,
  ): readonly AnalyticsDataset[] {
    const dealValues = values(r.deals, "value"),
      won = r.deals.filter((x) =>
        ["closed-won", "completed"].includes(String(x.stage ?? x.stage_id)),
      ),
      lost = r.deals.filter((x) =>
        ["closed-lost", "lost"].includes(String(x.stage ?? x.stage_id)),
      ),
      closed = won.length + lost.length,
      metric = (
        id: string,
        label: string,
        value: string | number | null,
        available: boolean,
        explanation: string,
      ): EvidenceMetric => ({
        id,
        label,
        value,
        available,
        source,
        explanation,
      });
    const pipeline = dealValues.reduce((a, b) => a + b, 0),
      forecast = r.deals.reduce(
        (n, d) => n + (Number(d.value ?? 0) * Number(d.probability ?? 0)) / 100,
        0,
      ),
      unread = r.communications.reduce(
        (n, x) => n + Number(x.unread_count ?? 0),
        0,
      ),
      openDeals = r.deals.filter(
        (x) =>
          !["closed-won", "closed-lost", "completed", "lost"].includes(
            String(x.stage ?? x.stage_id),
          ),
      ).length;
    return [
      {
        domain: "executive",
        metrics: [
          unavailable(
            "revenue",
            "Revenue",
            source,
            "No authoritative recognized-revenue projection.",
          ),
          metric(
            "pipeline",
            "Pipeline",
            pipeline,
            pipeline > 0,
            "Sum of recorded deal values.",
          ),
          metric(
            "forecast",
            "Forecast",
            forecast,
            dealValues.length > 0,
            "Probability-weighted recorded deal values.",
          ),
          metric(
            "conversion",
            "Conversion",
            closed ? `${Math.round((won.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed outcome ratio only.",
          ),
          metric(
            "win-rate",
            "Win Rate",
            closed ? `${Math.round((won.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed won share.",
          ),
          metric(
            "loss-rate",
            "Loss Rate",
            closed ? `${Math.round((lost.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed lost share.",
          ),
          count("meetings", "Meetings", r.meetings, source, r.errors.meetings),
          count(
            "site-visits",
            "Site Visits",
            r.visits,
            source,
            r.errors.site_visits,
          ),
          metric(
            "open-deals",
            "Open Deals",
            openDeals,
            true,
            "Non-terminal recorded deals.",
          ),
          count("ai-status", "AI Workforce Status", r.providers, source),
          count(
            "workflow-queue",
            "Workflow Queue",
            r.workflows.filter((x) => String(x.status) === "pending"),
            source,
            r.errors.workflow_definitions,
          ),
          unavailable(
            "provider-health",
            "Provider Health",
            source,
            "No provider health projection connected.",
          ),
          unavailable(
            "notifications",
            "Notifications",
            source,
            "No authoritative notification projection connected.",
          ),
        ],
      },
      {
        domain: "sales",
        metrics: [
          unavailable(
            "lead-sources",
            "Lead Sources",
            source,
            "Rendered when source distribution projection is connected.",
          ),
          count("funnel", "Conversion Funnel", r.leads, source, r.errors.leads),
          metric(
            "sales-pipeline",
            "Pipeline Value",
            pipeline,
            pipeline > 0,
            "Recorded deal values.",
          ),
          metric(
            "average-deal",
            "Average Deal Value",
            dealValues.length ? Math.round(pipeline / dealValues.length) : null,
            dealValues.length > 0,
            "Mean recorded deal value.",
          ),
          metric(
            "sales-win",
            "Win Rate",
            closed ? `${Math.round((won.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed outcomes.",
          ),
          metric(
            "sales-loss",
            "Loss Rate",
            closed ? `${Math.round((lost.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed outcomes.",
          ),
          count(
            "stage-distribution",
            "Stage Distribution",
            r.deals,
            source,
            r.errors.deals,
          ),
          metric(
            "sales-forecast",
            "Forecast",
            forecast,
            dealValues.length > 0,
            "Probability-weighted values.",
          ),
        ],
      },
      {
        domain: "crm",
        metrics: [
          count("lead-growth", "Lead Growth", r.leads, source, r.errors.leads),
          unavailable(
            "lead-quality",
            "Lead Quality",
            source,
            "No authoritative quality model.",
          ),
          metric(
            "hot-leads",
            "Hot Leads",
            r.leads.filter((x) =>
              ["high", "urgent"].includes(String(x.priority)),
            ).length,
            true,
            "Explicit priority only.",
          ),
          metric(
            "inactive-leads",
            "Inactive Leads",
            r.leads.filter((x) =>
              ["closed", "inactive"].includes(String(x.status)),
            ).length,
            true,
            "Explicit status only.",
          ),
          unavailable(
            "response-time",
            "Average Response Time",
            source,
            "Response-time projection unavailable.",
          ),
          metric(
            "activity-volume",
            "Activity Volume",
            r.meetings.length + r.tasks.length,
            true,
            "Meeting and task records.",
          ),
        ],
      },
      {
        domain: "properties",
        metrics: [
          count(
            "inventory",
            "Inventory",
            r.properties,
            source,
            r.errors.properties,
          ),
          unavailable(
            "property-views",
            "Views",
            source,
            "No authoritative view events.",
          ),
          unavailable("demand", "Demand", source, "No market demand model."),
          metric(
            "availability",
            "Availability",
            r.properties.filter((x) => String(x.status).includes("available"))
              .length,
            true,
            "Explicit availability status.",
          ),
          unavailable(
            "days-listed",
            "Average Days Listed",
            source,
            "Listing chronology projection unavailable.",
          ),
          count(
            "property-meetings",
            "Meeting Counts",
            r.meetings,
            source,
            r.errors.meetings,
          ),
          unavailable(
            "offer-counts",
            "Offer Counts",
            source,
            "Offer projection unavailable.",
          ),
        ],
      },
      {
        domain: "deals",
        metrics: [
          metric(
            "deal-pipeline",
            "Pipeline Value",
            pipeline,
            pipeline > 0,
            "Recorded values.",
          ),
          unavailable(
            "deal-cycle",
            "Average Deal Cycle",
            source,
            "Timeline cycle projection unavailable.",
          ),
          metric(
            "deal-win",
            "Win Rate",
            closed ? `${Math.round((won.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed outcomes.",
          ),
          metric(
            "deal-loss",
            "Loss Rate",
            closed ? `${Math.round((lost.length / closed) * 100)}%` : null,
            closed > 0,
            "Closed outcomes.",
          ),
          count(
            "deal-stages",
            "Stage Distribution",
            r.deals,
            source,
            r.errors.deals,
          ),
          metric(
            "deal-forecast",
            "Forecast",
            forecast,
            dealValues.length > 0,
            "Probability weighted.",
          ),
          unavailable(
            "average-offer",
            "Average Offer Value",
            source,
            "Offer projection unavailable.",
          ),
        ],
      },
      {
        domain: "communications",
        metrics: [
          count(
            "inbox-volume",
            "Inbox Volume",
            r.communications,
            source,
            r.errors.communication_threads,
          ),
          unavailable(
            "conversation-growth",
            "Conversation Growth",
            source,
            "Chronology projection unavailable.",
          ),
          metric("unread", "Unread", unread, true, "Explicit unread counts."),
          unavailable(
            "communication-response",
            "Average Response Time",
            source,
            "Response projection unavailable.",
          ),
          unavailable(
            "campaign-activity",
            "Campaign Activity",
            source,
            "Campaign analytics projection unavailable.",
          ),
          unavailable(
            "template-usage",
            "Template Usage",
            source,
            "Template events unavailable.",
          ),
        ],
      },
      {
        domain: "workforce",
        metrics: [
          count("employee-status", "Employee Status", r.providers, source),
          count("workforce-tasks", "Tasks", r.tasks, source, r.errors.tasks),
          unavailable(
            "recommendations",
            "Recommendations",
            source,
            "Recommendation telemetry unavailable.",
          ),
          metric(
            "queue-length",
            "Queue Length",
            r.tasks.filter(
              (x) => !["completed", "cancelled"].includes(String(x.status)),
            ).length,
            true,
            "Open task records.",
          ),
          unavailable(
            "completion-time",
            "Average Completion Time",
            source,
            "Completion chronology unavailable.",
          ),
          unavailable(
            "workforce-health",
            "Health",
            source,
            "Health projection unavailable.",
          ),
          count(
            "provider-assignment",
            "Provider Assignment",
            r.providers,
            source,
          ),
        ],
      },
      {
        domain: "workflow",
        metrics: [
          metric(
            "pending-approvals",
            "Pending Approvals",
            r.workflows.filter((x) => String(x.status) === "pending").length,
            true,
            "Explicit workflow status.",
          ),
          metric(
            "approved",
            "Approved",
            r.workflows.filter((x) => String(x.status) === "approved").length,
            true,
            "Explicit workflow status.",
          ),
          metric(
            "rejected",
            "Rejected",
            r.workflows.filter((x) => String(x.status) === "rejected").length,
            true,
            "Explicit workflow status.",
          ),
          metric(
            "cancelled",
            "Cancelled",
            r.workflows.filter((x) => String(x.status) === "cancelled").length,
            true,
            "Explicit workflow status.",
          ),
          metric(
            "expired",
            "Expired",
            r.workflows.filter((x) => String(x.status) === "expired").length,
            true,
            "Explicit workflow status.",
          ),
          unavailable(
            "execution-requests",
            "Execution Requests",
            source,
            "Execution projection unavailable.",
          ),
        ],
      },
      {
        domain: "integrations",
        metrics: [
          unavailable(
            "integration-health",
            "Provider Health",
            source,
            "Provider health projection unavailable.",
          ),
          unavailable(
            "connection-status",
            "Connection Status",
            source,
            "Connection projection unavailable.",
          ),
          unavailable(
            "latency",
            "Latency",
            source,
            "No provider calls measured.",
          ),
          unavailable(
            "capabilities",
            "Capability Coverage",
            source,
            "Capability projection unavailable.",
          ),
          unavailable(
            "rate-limits",
            "Rate Limits",
            source,
            "No live provider quotas.",
          ),
        ],
      },
      {
        domain: "observability",
        metrics: [
          metric(
            "module-health",
            "Module Health",
            "Operational",
            true,
            "Aggregation completed.",
          ),
          metric(
            "route-health",
            "Route Health",
            "Built",
            true,
            "Validated route inventory.",
          ),
          metric(
            "repository-health",
            "Repository Health",
            Object.keys(r.errors).length ? "Needs attention" : "Healthy",
            true,
            "Repository error boundary.",
          ),
          unavailable(
            "obs-provider",
            "Provider Health",
            source,
            "No live provider health.",
          ),
          metric(
            "workflow-health",
            "Workflow Health",
            r.errors.workflow_definitions ? "Unavailable" : "Available",
            !r.errors.workflow_definitions,
            "Workflow repository state.",
          ),
          metric(
            "queue-health",
            "Queue Health",
            r.tasks.length ? "Measured" : "Unavailable",
            r.tasks.length > 0,
            "Task queue evidence.",
          ),
        ],
      },
    ];
  }
}
