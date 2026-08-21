"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { ButtonLink } from "@/features/platform/design-system";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function LandingRoiCalculator() {
  const [leads, setLeads] = useState(250);
  const [conversion, setConversion] = useState(4);
  const [revenue, setRevenue] = useState(500000);
  const result = useMemo(() => {
    const currentDeals = leads * conversion / 100;
    const improvedDeals = leads * Math.min(conversion * 1.2, 100) / 100;
    const revenueIncrease = Math.max(0, improvedDeals - currentDeals) * revenue;
    const hoursSaved = leads * .28;
    const aiCostSavings = hoursSaved * 800;
    return { revenueIncrease, hoursSaved, aiCostSavings, pipelineGrowth: currentDeals ? (improvedDeals / currentDeals - 1) * 100 : 0 };
  }, [leads, conversion, revenue]);

  return <div className="grid overflow-hidden rounded-[2rem] border border-vds-accent-border bg-vds-surface shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
    <div className="p-6 sm:p-8"><h3 className="text-xl font-semibold">Model your monthly opportunity</h3><p className="mt-2 text-sm leading-6 text-vds-muted">Use your own assumptions. Estimates are directional—not guarantees or financial advice.</p><div className="mt-7 grid gap-5">{([
      ["Monthly leads", leads, setLeads, 0, 100000],
      ["Conversion rate (%)", conversion, setConversion, 0, 100],
      ["Revenue per deal (₹)", revenue, setRevenue, 0, 100000000],
    ] as const).map(([label, value, update, min, max]) => <label className="grid gap-2 text-sm font-medium" key={label}>{label}<input aria-label={label} className="h-12 rounded-xl border border-vds-border bg-vds-input px-4 tabular-nums" type="number" min={min} max={max} value={value} onChange={event => update(Math.min(max, Math.max(min, Number(event.target.value) || 0)))}/></label>)}</div></div>
    <div aria-live="polite" className="relative border-t border-vds-border bg-vds-primary-soft p-6 sm:p-8 lg:border-l lg:border-t-0"><TrendingUp className="size-7 text-vds-primary" aria-hidden="true"/><p className="mt-5 text-xs font-semibold uppercase tracking-[.18em] text-vds-primary">Directional impact</p><dl className="mt-5 grid gap-5 sm:grid-cols-2">{[["Revenue increase", money(result.revenueIncrease)], ["Hours saved", `${result.hoursSaved.toFixed(0)} / month`], ["AI cost savings", money(result.aiCostSavings)], ["Pipeline growth", `${result.pipelineGrowth.toFixed(0)}%`]].map(([label, value]) => <div className="rounded-2xl border border-vds-border bg-vds-surface p-4" key={label}><dt className="text-xs text-vds-muted">{label}</dt><dd className="mt-2 text-xl font-semibold">{value}</dd></div>)}</dl><ButtonLink href="/roi-calculator" variant="outline" className="mt-7">Open full ROI calculator</ButtonLink></div>
  </div>;
}
