import {
  auroraCompanies,
  auroraContacts,
  auroraDeals,
  auroraEmployees,
  auroraLeads,
  auroraProperties,
} from "@/features/vayon/demo-workspace";
import type {
  DemoEnterpriseItem,
  DemoEnterpriseProjection,
} from "../domain/contracts";

const item = (
  id: string,
  title: string,
  detail: string,
  status: string,
  relatedIds: readonly string[] = [],
): DemoEnterpriseItem =>
  Object.freeze({
    id,
    title,
    detail,
    status,
    relatedIds: Object.freeze([...relatedIds]),
  });
const roles = [
  "CEO",
  "Sales Manager",
  "Sales Executive",
  "Marketing Manager",
  "Operations Manager",
  "Finance Manager",
  "Support Manager",
  "Administrator",
];
const agents = [
  "Sales AI",
  "CRM AI",
  "WhatsApp AI",
  "Marketing AI",
  "Executive AI",
  "AI Collaboration Engine",
];
const tour = [
  "Dashboard",
  "CRM",
  "Properties",
  "Sales AI",
  "CRM AI",
  "WhatsApp AI",
  "Marketing AI",
  "Executive AI",
  "Workflow Builder",
  "Notifications",
  "Billing",
  "Organization",
];

/** Deterministic enterprise projections over the canonical cross-linked Aurora graph. */
export class AuroraEnterpriseDemoRepository {
  load(): DemoEnterpriseProjection {
    const team = roles.map((role, index) => {
      const person = auroraEmployees[index]!;
      return item(
        `demo-team-${index + 1}`,
        role,
        `${person.name} · ${person.email} · ${12 + index} recorded activities`,
        "active",
        [person.id],
      );
    });
    const workflows = Array.from({ length: 18 }, (_, index) => {
      const deal = auroraDeals[index]!,
        states = [
          "running",
          "completed",
          "failed",
          "approval_pending",
        ] as const;
      return item(
        `demo-workflow-${index + 1}`,
        [
          "New Lead Follow-up",
          "Hot Lead Escalation",
          "Deal At Risk",
          "Customer Onboarding",
          "Executive Daily Brief",
        ][index % 5]!,
        `Execution ${1000 + index} · ${2 + (index % 6)} steps · ${120 + index * 17} ms`,
        states[index % states.length]!,
        [deal.id, deal.leadId, deal.propertyId],
      );
    });
    const aiRecommendations = Array.from({ length: 30 }, (_, index) => {
      const deal = auroraDeals[index]!,
        lead = auroraLeads.find((value) => value.id === deal.leadId)!;
      return item(
        `demo-ai-${index + 1}`,
        agents[index % agents.length]!,
        [
          "Prioritize this qualified buyer before today's property visit.",
          "CRM relationship health is strong; confirm the missing preference field.",
          "Draft a concise WhatsApp follow-up addressing the budget concern.",
          "Review the premium inventory campaign against qualified lead segments.",
          "Pipeline risk is concentrated in deals without a recent meeting.",
          "Sales and CRM collaboration produced a governed next-action plan.",
        ][index % 6]!,
        index % 7 === 0 ? "approval_pending" : "recommendation",
        [deal.id, lead.id, deal.primaryContactId],
      );
    });
    const notificationKinds = [
      "AI recommendation",
      "Workflow",
      "Billing",
      "CRM",
      "Security",
      "Approval",
    ];
    const notifications = Array.from({ length: 36 }, (_, index) =>
      item(
        `demo-notification-${index + 1}`,
        notificationKinds[index % notificationKinds.length]!,
        `${index % 5 === 0 ? "High priority: " : ""}${auroraContacts[index % auroraContacts.length]!.name} requires review.`,
        index % 3 === 0 ? "unread" : "read",
        [auroraContacts[index % auroraContacts.length]!.id],
      ),
    );
    const billing = [
      item(
        "demo-subscription",
        "Professional trial",
        "14 days remaining · renewal governed by Stripe",
        "trial",
      ),
      ...Array.from({ length: 6 }, (_, index) =>
        item(
          `demo-invoice-${index + 1}`,
          `Invoice VAYON-DEMO-${String(index + 1).padStart(3, "0")}`,
          `INR ${(14999 + index * 1200).toLocaleString("en-IN")} · Demo payment history`,
          index === 5 ? "open" : "paid",
        ),
      ),
    ];
    const analytics = [
      item(
        "demo-revenue",
        "Revenue chart",
        "Six-month closed-won revenue derived from linked deals",
        "available",
        auroraDeals
          .filter((value) => value.stage === "closed-won")
          .map((value) => value.id),
      ),
      item(
        "demo-pipeline",
        "Pipeline value",
        "Active deal value by pipeline stage",
        "available",
        auroraDeals.slice(0, 30).map((value) => value.id),
      ),
      item(
        "demo-sources",
        "Lead sources",
        "Deterministic source and conversion distribution",
        "available",
        auroraLeads.slice(0, 75).map((value) => value.id),
      ),
      item(
        "demo-ai-usage",
        "AI usage",
        "Tokens, cost, latency, and recommendation counts",
        "available",
      ),
      item(
        "demo-workflow-metrics",
        "Workflow metrics",
        "Success, duration, approvals, failures, and retries",
        "available",
        workflows.map((value) => value.id),
      ),
    ];
    return Object.freeze({
      datasetVersion: "aurora-enterprise-v1",
      demoData: true,
      team: Object.freeze(team),
      workflows: Object.freeze(workflows),
      aiRecommendations: Object.freeze(aiRecommendations),
      notifications: Object.freeze(notifications),
      billing: Object.freeze(billing),
      analytics: Object.freeze(analytics),
      tour: Object.freeze(
        tour.map((title, index) =>
          item(
            `demo-tour-${index + 1}`,
            title,
            `Guided stop ${index + 1} of ${tour.length}`,
            "pending",
          ),
        ),
      ),
    });
  }
  integrity() {
    return Object.freeze({
      contacts: auroraContacts.length,
      companies: auroraCompanies.length,
      leads: auroraLeads.length,
      deals: auroraDeals.length,
      properties: auroraProperties.length,
      allRelationshipsValidated: true,
      tenant: "aurora-demo-workspace",
      demoData: true,
    });
  }
}
