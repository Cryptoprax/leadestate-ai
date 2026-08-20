import type { WorkforceEmployee, WorkforceMetric } from "../domain/models";
export const capabilities = [
  "Read CRM",
  "Read Deals",
  "Read Properties",
  "Read Calendar",
  "Generate Summaries",
  "Recommend Actions",
  "Schedule Meetings",
  "Analyze Pipeline",
  "Generate Campaigns",
] as const;
export const definitions = [
  [
    "sales-ai",
    "Sales AI",
    "Sales Advisor",
    "Qualifies leads and recommends the next best sales action.",
    "SA",
  ],
  [
    "crm-ai",
    "CRM AI",
    "CRM Steward",
    "Maintains record quality and summarizes customer context.",
    "CA",
  ],
  [
    "whatsapp-ai",
    "WhatsApp AI",
    "Messaging Advisor",
    "Prepares governed WhatsApp follow-up suggestions.",
    "WA",
  ],
  [
    "voice-ai",
    "Voice AI",
    "Call Advisor",
    "Plans call preparation and follow-up recommendations.",
    "VA",
  ],
  [
    "marketing-ai",
    "Marketing AI",
    "Growth Advisor",
    "Develops campaign suggestions from approved context.",
    "MA",
  ],
  [
    "operations-ai",
    "Operations AI",
    "Operations Advisor",
    "Reviews queues, schedules, and operational bottlenecks.",
    "OA",
  ],
  [
    "finance-ai",
    "Finance AI",
    "Finance Advisor",
    "Reviews financial context without executing transactions.",
    "FA",
  ],
  [
    "executive-ai",
    "Executive AI",
    "Executive Advisor",
    "Synthesizes approved workspace evidence into governed executive recommendations.",
    "EA",
  ],
] as const;
export const unavailableMetrics = (): readonly WorkforceMetric[] =>
  [
    "Tasks Today",
    "Success Rate",
    "Average Completion Time",
    "Appointments Booked",
    "Leads Assisted",
    "Revenue Influenced",
  ].map((label) => ({ label, value: "Awaiting data", available: false }));
export function configuredEmployee(
  def: (typeof definitions)[number],
): WorkforceEmployee {
  return {
    id: def[0],
    code: def[0],
    name: def[1],
    role: def[2],
    description: def[3],
    avatar: def[4],
    status: "idle",
    capabilities,
    permissions: ["Read-only advisory access"],
    kpis: unavailableMetrics(),
    performance: unavailableMetrics(),
    currentQueue: 0,
    memory: {
      customerContext: "No customer context recorded.",
      recentDecisions: "No decisions recorded.",
      learnedPreferences: "No learned preferences recorded.",
      recentOutcomes: "No outcomes recorded.",
      currentObjectives: "No objectives recorded.",
    },
    recentActivity: [],
    health: "unavailable",
    version: 1,
  };
}
