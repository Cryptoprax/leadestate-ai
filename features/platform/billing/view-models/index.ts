import type { PlanRecord, UsageRecord } from "../types";
export const planPrice = (plan: PlanRecord) => plan.monthlyPrice === null ? "Custom pricing" : new Intl.NumberFormat("en-IN", { style: "currency", currency: plan.currency, maximumFractionDigits: 0 }).format(plan.monthlyPrice) + "/month";
export const usagePercent = (usage: UsageRecord) => usage.limit === null || usage.limit === undefined ? null : usage.limit === 0 ? (usage.quantity ? 100 : 0) : Math.min(100, usage.quantity / usage.limit * 100);
