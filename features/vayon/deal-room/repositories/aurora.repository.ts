import "server-only";
import { auroraBusinessActivity } from "@/features/vayon/demo-workspace/business-activity/activity.service";
import {
  auroraDeals,
  auroraDocuments,
  auroraMeetings,
  auroraTasks,
} from "@/features/vayon/demo-workspace/sales-operations/records";
import type { DealRoomRepository } from "../contracts/repository";
import type {
  DealChecklist,
  DealConnections,
  DealContract,
  DealOffer,
  DealRoomDeal,
  DealRoomStage,
} from "../domain/models";
const stages: readonly DealRoomStage[] = [
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
];
export class AuroraDealRoomRepository implements DealRoomRepository {
  readonly provider = "aurora" as const;
  async deals() {
    return auroraDeals.map((r, index): DealRoomDeal => ({
      id: r.id,
      referenceNumber: `AUR-D-${String(index + 1).padStart(4, "0")}`,
      title: r.title,
      customer: r.primaryContactId,
      lead: r.leadId,
      property: r.propertyId,
      assignedAgent: r.salesAgentId,
      assignedAI: "AI Workforce advisory",
      value: 10000000 + (index % 12) * 2500000,
      currency: "INR",
      probability: (index % 10) * 10,
      currentStage: stages[index % stages.length]!,
      expectedCloseDate: new Date(
        Date.parse(r.openedAt) + 45 * 86400000,
      ).toISOString(),
      source: "Aurora CRM",
      priority:
        index % 9 === 0 ? "critical" : index % 3 === 0 ? "high" : "medium",
      workflow: `workflow-${r.id}`,
      approvals: [],
      timeline: r.identity.context.timelineRef?.objectId,
      createdAt: r.openedAt,
      updatedAt: r.openedAt,
    }));
  }
  async offers() {
    return auroraDeals.map((r, index): DealOffer => ({
      id: `aurora-offer-${index + 1}`,
      dealId: r.id,
      offerNumber: `OFF-${String(index + 1).padStart(4, "0")}`,
      amount: 9500000 + (index % 12) * 2250000,
      currency: "INR",
      offerDate: r.openedAt,
      status: index % 5 === 0 ? "approved" : "pending-approval",
      approval: index % 5 === 0 ? "Approved demo state" : "Approval required",
      revisionHistory: index % 4 === 0 ? ["Revision 1 metadata"] : [],
      readOnly: true,
    }));
  }
  async contracts() {
    return auroraDeals.flatMap((r, index): DealContract[] => [
      {
        id: `aurora-contract-${index + 1}`,
        dealId: r.id,
        title: `Reservation — ${r.title}`,
        type: "reservation",
        approvalStatus: "Approval required",
        version: 1,
        readOnly: true,
      },
    ]);
  }
  async checklists() {
    return auroraDeals.map((r, index): DealChecklist => {
      const sections = [
        "KYC",
        "Documents",
        "Approvals",
        "Site Visit",
        "Finance",
        "Legal",
        "Compliance",
      ].map((name, i) => ({
        name: name as DealChecklist["sections"][number]["name"],
        completed: (index + i) % 3,
        total: 2,
      }));
      const completed = sections.reduce((s, x) => s + x.completed, 0),
        total = sections.reduce((s, x) => s + x.total, 0);
      return {
        dealId: r.id,
        sections,
        completionPercentage: Math.round((completed / total) * 100),
      };
    });
  }
  async connections() {
    return auroraDeals.map((r): DealConnections => {
      const meetings = auroraMeetings.filter((x) => x.dealId === r.id),
        tasks = auroraTasks.filter((x) => x.dealId === r.id),
        communications = auroraBusinessActivity.communications.filter(
          (x) => x.dealId === r.id,
        ),
        documents = auroraDocuments.filter((x) => x.dealId === r.id);
      return {
        dealId: r.id,
        activities: [...meetings, ...tasks].map((x) => x.id),
        communications: communications.map((x) => x.id),
        campaigns: [],
        notifications: communications.map((x) => `notification-${x.id}`),
        meetings: meetings.map((x) => x.id),
        siteVisits: meetings
          .filter((x) => x.kind === "property-visit")
          .map((x) => x.id),
        tasks: tasks.map((x) => x.id),
        reminders: meetings.map((x) => `reminder-${x.id}`),
        approvalHistory: [],
        pendingApprovals: documents.map((x) => x.id),
        workflowTimeline: [`workflow-${r.id}`],
        executionRequests: [],
      };
    });
  }
}
