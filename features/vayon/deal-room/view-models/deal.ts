import type { DealRoomSnapshot } from "../domain/models";
export const pipelineStages = [
  "new",
  "qualified",
  "property-matched",
  "site-visit-completed",
  "negotiation",
  "offer-submitted",
  "documentation",
  "approval",
  "ready-to-close",
  "closed-won",
  "closed-lost",
] as const;
export function dealAnalytics(s: DealRoomSnapshot) {
  const total = s.deals.reduce((n, d) => n + (d.value ?? 0), 0),
    won = s.deals.filter((d) => d.currentStage === "closed-won"),
    lost = s.deals.filter((d) => d.currentStage === "closed-lost"),
    closed = won.length + lost.length;
  return [
    [
      "Pipeline Value",
      total
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: s.deals[0]?.currency ?? "INR",
            maximumFractionDigits: 0,
          }).format(total)
        : "Awaiting data",
    ],
    ["Average Deal Cycle", "Awaiting Timeline data"],
    [
      "Win Rate",
      closed ? `${Math.round((won.length / closed) * 100)}%` : "Awaiting data",
    ],
    [
      "Loss Rate",
      closed ? `${Math.round((lost.length / closed) * 100)}%` : "Awaiting data",
    ],
    [
      "Forecast",
      s.deals.length
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: s.deals[0]?.currency ?? "INR",
            maximumFractionDigits: 0,
          }).format(
            s.deals.reduce(
              (n, d) => n + ((d.value ?? 0) * d.probability) / 100,
              0,
            ),
          )
        : "Awaiting data",
    ],
    [
      "Average Offer Value",
      s.offers.length
        ? new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: s.offers[0]!.currency,
            maximumFractionDigits: 0,
          }).format(
            s.offers.reduce((n, o) => n + o.amount, 0) / s.offers.length,
          )
        : "Awaiting data",
    ],
  ] as const;
}
