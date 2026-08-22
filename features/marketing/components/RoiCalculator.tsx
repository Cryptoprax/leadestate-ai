"use client";
import { useMemo, useState } from "react";
import { Button } from "@/features/platform/design-system";
import { readConsent } from "@/features/platform/conversion-analytics/components/ConsentManager";
import { useMarketingCurrency } from "../currency/CurrencyDisplay";
type Inputs = {
  employees: number;
  leads: number;
  meetings: number;
  revenue: number;
  timeSaved: number;
};
const initial: Inputs = {
  employees: 10,
  leads: 250,
  meetings: 60,
  revenue: 300000,
  timeSaved: 5,
};
export function RoiCalculator() {
  const { currency, format, toLocal, toUsd } = useMarketingCurrency();
  const [values, setValues] = useState(initial),
    [calculated, setCalculated] = useState(false);
  const result = useMemo(() => {
    const hourlyValue = Math.max(
        values.revenue / Math.max(values.employees * 2000, 1),
        0,
      ),
      annualHours = values.employees * values.timeSaved * 52,
      costSavings = annualHours * hourlyValue,
      revenueIncrease =
        values.revenue *
        Math.min(0.15, (values.leads + values.meetings) / 10000),
      platformEstimate = 2148,
      roi =
        ((costSavings + revenueIncrease - platformEstimate) /
          platformEstimate) *
        100;
    return { costSavings, revenueIncrease, roi, impact: annualHours };
  }, [values]);
  function update(key: keyof Inputs, value: string) {
    setCalculated(false);
    setValues((current) => ({
      ...current,
      [key]: Math.max(0, Number(value) || 0),
    }));
  }
  function calculate() {
    setCalculated(true);
    if (!readConsent()?.analytics) return;
    const key = "vayon-marketing-session",
      sessionId = sessionStorage.getItem(key) ?? crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
    navigator.sendBeacon(
      "/api/marketing/events",
      JSON.stringify({
        type: "roi_calculation",
        path: location.pathname,
        sessionId,
        metadata: {
          employees: String(values.employees),
          estimatedSavings: String(Math.round(result.costSavings)),
          estimatedRevenueIncrease: String(Math.round(result.revenueIncrease)),
        },
      }),
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
        ROI calculator
      </p>
      <h1 className="mt-4 text-5xl font-semibold">
        Model the potential impact of a governed AI workforce.
      </h1>
      <p className="mt-4 max-w-3xl text-vds-muted">
        Adjust your operating assumptions. Results are directional estimates,
        not guarantees or financial advice.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-vds-border bg-vds-surface p-6">
          <h2 className="text-xl font-semibold">Your assumptions</h2>
          <div className="mt-5 grid gap-4">
            {(
              [
                ["employees", "Employees"],
                ["leads", "Monthly leads"],
                ["meetings", "Monthly meetings"],
                ["revenue", `Annual revenue (${currency})`],
                ["timeSaved", "Hours saved per employee / week"],
              ] as const
            ).map(([key, label]) => (
              <label className="grid gap-2 text-sm" key={key}>
                {label}
                <input
                  type="number"
                  min="0"
                  value={key === "revenue" ? toLocal(values[key]) : values[key]}
                  onChange={(event) => update(key, key === "revenue" ? String(toUsd(Number(event.target.value) || 0)) : event.target.value)}
                  className="h-11 rounded-xl border border-vds-border bg-vds-input px-3"
                />
              </label>
            ))}
            <Button onClick={calculate}>Calculate estimated ROI</Button>
          </div>
        </section>
        <section
          aria-live="polite"
          className="rounded-3xl border border-vds-accent-border bg-vds-primary-soft p-6"
        >
          <h2 className="text-xl font-semibold">Estimated annual impact</h2>
          {calculated ? (
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["Estimated ROI", `${result.roi.toFixed(0)}%`],
                ["Cost savings", format(result.costSavings)],
                ["Revenue increase", format(result.revenueIncrease)],
                [
                  "AI Workforce impact",
                  `${result.impact.toFixed(0)} hours redirected`,
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-vds-muted">{label}</dt>
                  <dd className="mt-1 text-2xl font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 text-sm text-vds-muted">
              Calculate to view a transparent directional estimate.
            </p>
          )}
          <p className="mt-8 text-xs leading-5 text-vds-subtle">
            Assumptions: annual software estimate {format(2148)}; time value derived
            from revenue per employee hour; modeled revenue uplift capped at
            15%. Actual outcomes vary.
          </p>
        </section>
      </div>
    </main>
  );
}
