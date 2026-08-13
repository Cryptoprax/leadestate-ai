import { ButtonLink } from "@/features/platform/design-system";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, Sparkles } from "lucide-react";
import type { ExecutiveDashboardData } from "../types";
import { ActivityTimeline } from "./ActivityTimeline";
import { AIWidget } from "./AIWidget";
import { CalendarWidget } from "./CalendarWidget";
import { KpiCard } from "./KpiCard";
import { NotificationsPanel } from "./NotificationsPanel";
import { PipelineBoard } from "./PipelineBoard";
import { QuickActions } from "./QuickActions";
import { RevenueChartLoader } from "./RevenueChartLoader";

export function DashboardShell({data,welcome=false}:{data:ExecutiveDashboardData;welcome?:boolean}){return <main className="mx-auto max-w-[100rem] px-4 py-7 sm:px-5 sm:py-10"><header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-vds-primary">{data.workspaceName}</p><div className="mt-3 flex items-center gap-3">{welcome&&<span className="grid size-10 animate-[onboarding-success_.55s_ease-out] place-items-center rounded-2xl bg-vds-success text-vds-foreground shadow-lg shadow-vds-shadow"><Check className="size-5"/></span>}<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{welcome?"Your workspace is ready":"Executive Dashboard"}</h1></div><p className="mt-2 max-w-2xl text-sm leading-6 text-vds-muted">Real-time pipeline, customer activity, operations, and AI performance for {data.organizationName}.</p></div><div className="flex gap-2"><ButtonLink href="/vayon/leads/new" className="focus-ring">New lead</ButtonLink><Link href="/vayon/ai" className="focus-ring inline-flex items-center gap-2 rounded-xl border border-vds-border px-4 py-2.5 text-sm text-vds-secondary hover:bg-vds-elevated"><Sparkles className="size-4 text-vds-accent"/>Ask AI</Link></div></header>
    {data.isEmpty&&<EmptyDashboard/>}
    <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8" aria-label="Executive key performance indicators" data-widget-id="executive-kpis">{data.kpis.map((metric)=><KpiCard key={metric.key} metric={metric}/>)}</section>
    <div className="mt-5" data-widget-id="sales-pipeline"><PipelineBoard items={data.pipeline} currency={data.currency}/></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.85fr]"><div data-widget-id="revenue-analytics"><RevenueChartLoader data={data.charts} currency={data.currency}/></div><div data-widget-id="ai-workforce"><AIWidget metrics={data.ai}/></div></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]"><div data-widget-id="recent-activity"><ActivityTimeline items={data.activities}/></div><div data-widget-id="today-calendar"><CalendarWidget items={data.calendar}/></div></div>
    <div className="mt-5" data-widget-id="quick-actions"><QuickActions/></div>
    <div className="mt-5" data-widget-id="notifications"><NotificationsPanel items={data.notifications} usage={data.usage}/></div>
  </main>}
function EmptyDashboard(){return <section className="relative mt-8 overflow-hidden rounded-3xl border border-vds-accent-border bg-gradient-to-br from-vds-primary/[0.07] via-vds-surface to-vds-accent/[0.06] p-6 sm:p-8"><div className="absolute -right-12 -top-16 size-48 rounded-full border border-vds-accent-border bg-vds-primary/[0.035]"/><div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-3xl border border-vds-accent-border bg-vds-primary/[0.08] text-vds-primary"><BarChart3 className="size-6"/></span><div><p className="text-xs uppercase tracking-[.18em] text-vds-primary">Your command center is ready</p><h2 className="mt-2 text-xl font-semibold">Create your first opportunity</h2><p className="mt-2 max-w-xl text-sm leading-6 text-vds-muted">Add a lead, property, or teammate. Every widget will populate automatically from your workspace activity.</p></div></div><Link href="/vayon/leads/new" className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-vds-surface px-4 py-3 text-sm font-semibold text-vds-foreground">Create first lead<ArrowRight className="size-4"/></Link></div></section>}
