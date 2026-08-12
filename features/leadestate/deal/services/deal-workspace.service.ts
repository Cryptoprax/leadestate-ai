import type { WorkspaceModel } from "@/features/leadestate/workspace-engine/types";
import type { DealRecord } from "../types";

export function dealWorkspaceModel(deal: DealRecord): WorkspaceModel {
  return {
    id: deal.id,
    definitionId: "deal-workspace",
    title: deal.name,
    subtitle: `${deal.reference} · ${deal.propertyName ?? "Property"} · ${deal.leadName ?? "Customer"}`,
    status: deal.stageId,
    metadata: { assignedUser: deal.assignedAgentName, createdAt: deal.createdAt, updatedAt: deal.updatedAt, tags: [deal.stageName] },
    breadcrumbs: [{ label: "LeadEstate", href: "/leadestate" }, { label: "Deals", href: "/leadestate/deals" }, { label: deal.name }],
    widgets: [
      { id: "value", title: "Deal Value", value: `${deal.value?.amount ?? 0} ${deal.value?.currency ?? ""}`, order: 1, size: "medium" },
      { id: "stage", title: "Stage", value: deal.stageName, order: 2, size: "medium" },
      { id: "probability", title: "Probability", value: `${deal.probability}%`, order: 3, size: "small" },
    ],
    relations: ["Lead", "Property", "Offers", "Payments", "Commission", "Documents"].map((label, index) => ({ id: `deal-relation-${index}`, type: label.toLowerCase(), label, count: 0 })),
    events: [{ id: "deal-created", type: "created", title: "Deal Created", occurredAt: deal.createdAt }, { id: "deal-stage", type: "stage_changed", title: `Stage: ${deal.stageName}`, occurredAt: deal.updatedAt }],
    activities: [],
    sidebar: [{ id: "pinned", title: "Pinned Information", items: [{ label: "Reference", value: deal.reference }, { label: "Probability", value: `${deal.probability}%` }] }, { id: "assignment", title: "Assigned Users", items: [{ label: "Agent", value: deal.assignedAgentName ?? "Unassigned" }] }],
  };
}
