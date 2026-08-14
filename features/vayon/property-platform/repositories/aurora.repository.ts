import "server-only";
import { auroraBusinessActivity } from "@/features/vayon/demo-workspace/business-activity/activity.service";
import { auroraProperties } from "@/features/vayon/demo-workspace/property-portfolio/properties";
import {
  auroraDeals,
  auroraDocuments,
  auroraLeads,
  auroraMeetings,
  auroraTasks,
} from "@/features/vayon/demo-workspace/sales-operations/records";
import type { PropertyAssetRepository } from "../contracts/repository";
import type {
  AssetStatus,
  PropertyAsset,
  PropertyDocument,
  PropertyRelationships,
} from "../domain/models";

const status = (value: string): AssetStatus =>
  value === "available" || value === "reserved"
    ? value
    : value === "off-market"
      ? "inactive"
      : "available";

export class AuroraPropertyAssetRepository implements PropertyAssetRepository {
  readonly provider = "aurora" as const;
  async properties(): Promise<readonly PropertyAsset[]> {
    return auroraProperties.map((item, index): PropertyAsset => ({
      id: item.id,
      referenceCode: `AUR-${String(index + 1).padStart(4, "0")}`,
      title: item.name,
      type: item.propertyType,
      status: status(item.status),
      price: item.priceRange.minimum,
      currency: item.priceRange.currency,
      area: item.areaSquareFeet,
      areaUnit: "sq_ft",
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      parking: item.parking,
      amenities: item.amenities,
      builder: item.builderCompanyId,
      constructionStage: item.constructionStatus,
      location: `${item.locality}, ${item.city}`,
      description: item.description,
      gallery: item.galleryPlaceholders,
      floorPlans: [],
      videos: [],
      documents: auroraDocuments
        .filter((document) => document.propertyId === item.id)
        .map((document) => ({
          id: document.id,
          propertyId: item.id,
          title: document.title,
          kind:
            document.kind === "floor-plan"
              ? "floor-plan"
              : document.kind === "agreement"
                ? "contract"
                : document.kind === "brochure"
                  ? "brochure"
                  : "approval",
          readOnly: true,
        })),
      timeline: item.identity.context.timelineRef?.objectId,
      createdAt: new Date(Date.UTC(2026, 0, 1 + (index % 180))).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 7, 1 + (index % 13))).toISOString(),
    }));
  }
  async relationships(): Promise<readonly PropertyRelationships[]> {
    return auroraProperties.map((property) => {
      const leads = auroraLeads.filter(
          (item) => item.preferredPropertyId === property.id,
        ),
        deals = auroraDeals.filter((item) => item.propertyId === property.id),
        dealIds = new Set(deals.map((item) => item.id)),
        meetings = auroraMeetings.filter(
          (item) => item.propertyId === property.id,
        ),
        tasks = auroraTasks.filter((item) => dealIds.has(item.dealId)),
        conversations = auroraBusinessActivity.communications.filter((item) =>
          dealIds.has(item.dealId),
        ),
        campaigns = auroraBusinessActivity.campaigns.filter((item) =>
          item.relatedPropertyIds.includes(property.id),
        );
      return {
        propertyId: property.id,
        interestedLeads: leads.map((item) => item.id),
        customers: leads.map((item) => item.contactId),
        deals: deals.map((item) => item.id),
        recentActivity: [
          ...meetings.slice(-3).map((item) => item.id),
          ...tasks.slice(-3).map((item) => item.id),
        ],
        meetings: meetings.map((item) => item.id),
        siteVisits: meetings
          .filter((item) => item.kind === "property-visit")
          .map((item) => item.id),
        tasks: tasks.map((item) => item.id),
        reminders: meetings.map((item) => `aurora-reminder-${item.id}`),
        conversations: conversations.map((item) => item.id),
        templates: [],
        campaigns: campaigns.map((item) => item.id),
        notifications: conversations.map((item) => `notification-${item.id}`),
        approvalHistory: [],
        workflows: deals.map((item) => `workflow-${item.id}`),
        pendingActions: [],
      };
    });
  }
  async documents(): Promise<readonly PropertyDocument[]> {
    return auroraDocuments.map((item) => ({
      id: item.id,
      propertyId: item.propertyId,
      title: item.title,
      kind:
        item.kind === "floor-plan"
          ? "floor-plan"
          : item.kind === "agreement"
            ? "contract"
            : item.kind === "brochure"
              ? "brochure"
              : "approval",
      readOnly: true,
    }));
  }
}
