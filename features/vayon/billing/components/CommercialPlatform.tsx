import { commercialPlanCatalog } from "../config/commercial-plans";
const card = "rounded-3xl border border-vds-border bg-vds-surface p-5";
export function CommercialPlans() {
  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Commercial plans</h2>
          <p className="mt-1 text-sm text-vds-muted">
            USD canonical pricing · localized display and manual currency
            selection remain presentation concerns.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-vds-elevated px-3 py-1.5 text-xs">
            Monthly
          </span>
          <span className="rounded-full bg-vds-elevated px-3 py-1.5 text-xs">
            Annual
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {commercialPlanCatalog.map((plan) => (
          <article className={card} key={plan.code}>
            <h3 className="font-semibold">{plan.name}</h3>
            <p className="mt-3 text-2xl font-semibold">
              {plan.monthlyUsd === null ? "Custom" : `$${plan.monthlyUsd}/mo`}
            </p>
            <p className="mt-1 text-xs text-vds-muted">
              {plan.annualUsd === null
                ? "Contact sales"
                : `$${plan.annualUsd}/yr`}{" "}
              ·{" "}
              {plan.trialDays
                ? `${plan.trialDays}-day trial`
                : "Contract terms"}
            </p>
            <p className="mt-4 text-sm text-vds-muted">
              Seats: {plan.seatLimit ?? "Unlimited"}
            </p>
            <ul className="mt-3 space-y-1 text-xs text-vds-muted">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature.replaceAll("_", " ")}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export function ProviderHealthGrid({
  items,
}: {
  items: readonly {
    provider: string;
    state: "healthy" | "warning" | "offline";
    latencyMs: number | null;
    lastCheckedAt: string | null;
    diagnostic: string;
  }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article className={card} key={item.provider}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold capitalize">
              {item.provider.replaceAll("_", " ")}
            </h2>
            <span
              className={
                item.state === "healthy"
                  ? "text-vds-success"
                  : item.state === "warning"
                    ? "text-vds-warning"
                    : "text-vds-danger"
              }
            >
              {item.state}
            </span>
          </div>
          <p className="mt-3 text-sm text-vds-muted">
            Latency:{" "}
            {item.latencyMs === null ? "Unavailable" : `${item.latencyMs} ms`}
          </p>
          <p className="mt-1 text-xs text-vds-muted">
            Checked:{" "}
            {item.lastCheckedAt
              ? new Date(item.lastCheckedAt).toLocaleString()
              : "Never"}
          </p>
          {item.state !== "healthy" && (
            <p className="mt-3 text-xs text-vds-warning">{item.diagnostic}</p>
          )}
        </article>
      ))}
    </div>
  );
}
