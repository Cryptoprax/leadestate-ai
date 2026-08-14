import type { CrmInsight, CrmLeadRow } from "../domain/contracts";
export class CrmRulesService {
  insight(lead: CrmLeadRow): CrmInsight {
    const score = lead.aiScore ?? 0,
      urgent = lead.priority === "urgent" || lead.priority === "vip",
      budgetKnown = lead.budgetLabel !== "Not set";
    return Object.freeze({
      summary: `${lead.name} is a ${lead.status.replaceAll("_", " ")} lead from ${lead.source}.`,
      buyingIntent:
        score >= 70
          ? "Strong demonstrated intent"
          : score >= 40
            ? "Developing intent"
            : "Intent requires qualification",
      budgetConfidence: budgetKnown ? (score >= 60 ? "high" : "medium") : "low",
      urgency: urgent ? "high" : lead.lastActivity ? "medium" : "low",
      nextAction: urgent
        ? "Contact the lead and confirm the next commitment."
        : "Review requirements and schedule the next follow-up.",
      risk: lead.lastActivity
        ? "No deterministic inactivity warning."
        : "No recent activity is recorded.",
      suggestedWhatsApp: `Hello ${lead.name}, would you like to review suitable ${lead.propertyType ?? "property"} options?`,
      suggestedEmail: `Subject: Property options for your requirements\n\nHello ${lead.name}, we have prepared options aligned with your stated preferences.`,
      suggestedCallScript: `Confirm ${lead.name}'s budget, preferred location, decision timeline, and next visit availability.`,
      generatedBy: "deterministic-rules",
    });
  }
}
