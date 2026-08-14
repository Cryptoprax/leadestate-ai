"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/features/platform/design-system";

const plans = [
  {
    name: "Starter",
    audience: "Small teams establishing a shared operating system",
    features: [
      "Core CRM workspace",
      "Property workspace",
      "Calendar and tasks",
    ],
  },
  {
    name: "Professional",
    audience: "Growing teams coordinating customer and transaction work",
    features: [
      "Everything in Starter",
      "Communications workspace",
      "Workflow foundations",
    ],
  },
  {
    name: "Business",
    audience: "Multi-team organizations requiring governance and analytics",
    features: [
      "Everything in Professional",
      "Enterprise analytics",
      "Administration and approvals",
    ],
  },
  {
    name: "Enterprise",
    audience: "Complex organizations with advanced control requirements",
    features: [
      "Everything in Business",
      "Integration readiness",
      "Enterprise architecture review",
    ],
  },
] as const;

export function PricingTable() {
  const [annual, setAnnual] = useState(true);
  return (
    <section
      aria-labelledby="pricing-heading"
      className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-vds-primary">
            Editions
          </p>
          <h2 id="pricing-heading" className="mt-3 text-3xl font-semibold">
            Choose the operating model that fits.
          </h2>
          <p className="mt-3 text-vds-muted">
            Final commercial prices are awaiting launch approval. No price is
            implied.
          </p>
        </div>
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex w-fit rounded-xl border border-vds-border p-1"
        >
          {[false, true].map((value) => (
            <Button
              key={String(value)}
              variant="control"
              aria-pressed={annual === value}
              onClick={() => setAnnual(value)}
              className={`vds-focus h-10 rounded-lg px-4 text-sm ${annual === value ? "bg-vds-primary text-vds-on-accent" : "text-vds-muted"}`}
            >
              {value ? "Annual" : "Monthly"}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-2xl border border-vds-border bg-vds-surface/[.035] p-6"
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-3 min-h-20 text-sm leading-6 text-vds-muted">
              {plan.audience}
            </p>
            <p className="mt-5 text-sm font-medium">
              Pricing available at launch
            </p>
            <p className="mt-1 text-xs text-vds-subtle">
              {annual ? "Annual billing selected" : "Monthly billing selected"}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-vds-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="vds-focus mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl border border-vds-border font-semibold hover:bg-vds-hover"
            >
              {plan.name === "Enterprise"
                ? "Talk to enterprise sales"
                : "Join launch updates"}
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-vds-border">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <caption className="sr-only">
            Vayon edition capability comparison
          </caption>
          <thead className="bg-vds-elevated">
            <tr>
              <th scope="col" className="p-4">
                Capability
              </th>
              {plans.map((plan) => (
                <th scope="col" className="p-4" key={plan.name}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["CRM and properties", true, true, true, true],
              ["Communications", false, true, true, true],
              ["Analytics and administration", false, false, true, true],
              ["Enterprise architecture review", false, false, false, true],
            ].map((row) => (
              <tr key={String(row[0])} className="border-t border-vds-border">
                <th scope="row" className="p-4 font-medium">
                  {row[0]}
                </th>
                {row.slice(1).map((value, index) => (
                  <td key={index} className="p-4">
                    {value ? (
                      <>
                        <Check
                          className="size-4 text-vds-primary"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <span className="text-vds-subtle">
                        —<span className="sr-only">Not included</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
