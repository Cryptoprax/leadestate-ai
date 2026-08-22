import { ButtonLink } from "@/features/platform/design-system";
import { BarChart3, Bot, Check } from "lucide-react";
import type { ExecutiveDashboardData, KpiMetric } from "../types";
import { ActivityTimeline } from "./ActivityTimeline";
import { AICommandBar } from "./AICommandBar";
import { AIWorkforceGrid } from "./AIWorkforceGrid";
import { CalendarWidget } from "./CalendarWidget";
import { KpiCard } from "./KpiCard";
import { PipelineBoard } from "./PipelineBoard";
import { QuickActions } from "./QuickActions";
import { RevenueChartLoader } from "./RevenueChartLoader";
import { WhatsAppConversations } from "./WhatsAppConversations";

export function DashboardShell({
  data,
  welcome = false,
  onBlockedAction,
  aiPrompts,
}: {
  readonly data: ExecutiveDashboardData;
  readonly welcome?: boolean;
  readonly onBlockedAction?: () => void;
  readonly aiPrompts?: readonly string[];
}) {
  const metric = (key: string) => data.kpis.find((item) => item.key === key);
  const online = data.aiWorkforce.filter(
    (item) => item.status !== "offline",
  ).length;
  const aiMetric: KpiMetric = {
    key: "ai-workforce",
    label: "AI Employees",
    value: online,
    displayValue: `${online} Online`,
    detail: `${data.aiWorkforce.length} configured`,
    trend: 0,
    sparkline: data.aiWorkforce.map((item) => item.tasksCompleted),
    icon: "ai",
    href: "/vayon/ai",
  };
  const executiveMetrics = [
    metric("revenue"),
    metric("leads"),
    metric("deals"),
    aiMetric,
  ].filter((item): item is KpiMetric => Boolean(item));

  return (
    <div className="mx-auto max-w-[100rem] space-y-6 px-4 py-7 sm:px-6 sm:py-9">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
            {data.workspaceName}
          </p>
          <div className="mt-3 flex items-center gap-3">
            {welcome && (
              <span className="grid size-10 place-items-center rounded-2xl bg-vds-success-soft text-vds-success">
                <Check className="size-5" />
              </span>
            )}
            <h1 className="text-3xl font-semibold tracking-[-.035em] sm:text-4xl">
              {welcome
                ? "Your workspace is ready"
                : "Good morning. Here’s your business."}
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-vds-muted">
            Live workspace performance, customer momentum, and operational
            priorities for {data.organizationName}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/vayon/leads/new">Add lead</ButtonLink>
          <ButtonLink variant="secondary" href="/vayon/properties/new">
            Add property
          </ButtonLink>
        </div>
      </header>
      <AICommandBar onBlockedAction={onBlockedAction} prompts={aiPrompts} />
      {data.isEmpty && <EmptyDashboard />}
      <section
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Executive key performance indicators"
      >
        {executiveMetrics.map((item) => (
          <KpiCard key={item.key} metric={item} />
        ))}
      </section>
      <div className="grid gap-5 2xl:grid-cols-[1.15fr_.85fr]">
        <RevenueChartLoader data={data.charts} currency={data.currency} />
        <CalendarWidget items={data.calendar} />
      </div>
      <PipelineBoard
        items={data.pipeline.filter((item) => item.id !== "lost")}
        currency={data.currency}
      />
      <AIWorkforceGrid members={data.aiWorkforce} />
      <div className="grid gap-5 xl:grid-cols-2">
        <ActivityTimeline items={data.activities} />
        <WhatsAppConversations conversations={data.whatsappConversations} />
      </div>
      <QuickActions />
    </div>
  );
}

function EmptyDashboard() {
  return (
    <section className="rounded-3xl border border-dashed border-vds-border bg-vds-surface p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-vds-primary-soft text-vds-primary">
            <BarChart3 className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">Your executive workspace is ready</h2>
            <p className="mt-2 max-w-xl text-sm text-vds-muted">
              Add your first lead, property, or deal. Dashboard metrics will
              populate from verified workspace records.
            </p>
          </div>
        </div>
        <ButtonLink href="/vayon/leads/new" className="shrink-0">
          <Bot className="size-4" /> Create first lead
        </ButtonLink>
      </div>
    </section>
  );
}
