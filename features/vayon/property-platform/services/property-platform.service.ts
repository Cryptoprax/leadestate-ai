import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { PropertyAssetRepository } from "../contracts/repository";
import type {
  PropertyAnalytics,
  PropertyRecommendation,
  PropertySnapshot,
} from "../domain/models";
import { AuroraPropertyAssetRepository } from "../repositories/aurora.repository";
import { SupabasePropertyAssetRepository } from "../repositories/supabase.repository";

export const propertyGovernance = {
  executionAllowed: false,
  externalMLSConnected: false,
  approvalRequired: true,
} as const;

export class PropertyPlatformService {
  constructor(private readonly repository: PropertyAssetRepository) {}
  static async production() {
    const context = await operationsContext();
    return new PropertyPlatformService(
      new SupabasePropertyAssetRepository(
        context.client,
        context.organizationId,
        context.workspaceId,
      ),
    );
  }
  static demo() {
    return new PropertyPlatformService(new AuroraPropertyAssetRepository());
  }
  async snapshot(): Promise<PropertySnapshot> {
    const [properties, relationships, documents] = await Promise.all([
      this.repository.properties(),
      this.repository.relationships(),
      this.repository.documents(),
    ]);
    const byProperty = new Map<string, typeof documents>();
    for (const property of properties)
      byProperty.set(
        property.id,
        documents.filter((document) => document.propertyId === property.id),
      );
    return {
      properties: properties.map((property) => ({
        ...property,
        documents: byProperty.get(property.id) ?? property.documents,
      })),
      relationships,
      source: this.repository.provider,
    };
  }
  analytics(snapshot: PropertySnapshot): PropertyAnalytics {
    const buyers = new Set(
        snapshot.relationships.flatMap((item) => item.customers),
      ),
      meetings = snapshot.relationships.reduce(
        (sum, item) => sum + item.meetings.length,
        0,
      ),
      converted = snapshot.relationships.filter(
        (item) => item.deals.length > 0,
      ).length,
      now = Date.now();
    return {
      views: "Awaiting connected view data",
      interestedBuyers: buyers.size,
      conversionRate: snapshot.relationships.length
        ? `${Math.round((converted / snapshot.relationships.length) * 100)}%`
        : "Awaiting data",
      averageDaysListed: snapshot.properties.length
        ? `${Math.round(snapshot.properties.reduce((sum, item) => sum + Math.max(0, (now - Date.parse(item.createdAt)) / 86_400_000), 0) / snapshot.properties.length)} days`
        : "Awaiting data",
      meetingCount: meetings,
      offerCount: "Awaiting connected offer data",
      statusChanges: "Awaiting Timeline data",
    };
  }
  recommendations(
    snapshot: PropertySnapshot,
    propertyId: string,
  ): readonly PropertyRecommendation[] {
    const property = snapshot.properties.find((item) => item.id === propertyId),
      relationships = snapshot.relationships.find(
        (item) => item.propertyId === propertyId,
      );
    if (!property) return [];
    return [
      {
        kind: "buyer-match",
        value: relationships?.interestedLeads.length
          ? `${relationships.interestedLeads.length} linked lead candidates`
          : "Awaiting connected lead data",
        rationale: "Uses explicit preferred-property relationships only.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "pricing",
        value: property.price
          ? `${property.currency} ${property.price.toLocaleString()} recorded asking price`
          : "Pricing unavailable",
        rationale: "No market comparison or external valuation is performed.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "summary",
        value: `${property.type.replaceAll("-", " ")} in ${property.location}.`,
        rationale: "Composed only from the property record.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "recommended-buyers",
        value: relationships?.customers.length
          ? relationships.customers.slice(0, 3).join(", ")
          : "Awaiting connected customer data",
        rationale:
          "References explicitly linked contacts; no inferred identities.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "follow-up",
        value: relationships?.conversations.length
          ? "Review linked conversations before preparing a governed follow-up."
          : "No linked conversation for follow-up.",
        rationale: "Communication remains draft-only and approval controlled.",
        deterministic: true,
        executionAllowed: false,
      },
      {
        kind: "demand",
        value: relationships?.interestedLeads.length
          ? "Linked interest present"
          : "Demand unavailable",
        rationale: "Not a market forecast; reflects explicit lead links only.",
        deterministic: true,
        executionAllowed: false,
      },
    ];
  }
}
