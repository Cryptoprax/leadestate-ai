import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PropertyAssetRepository } from "../contracts/repository";
import type {
  AssetStatus,
  PropertyAsset,
  PropertyDocument,
  PropertyRelationships,
} from "../domain/models";

const assetStatus = (value: string, archived: boolean): AssetStatus => {
  if (archived) return "archived";
  if (value === "reserved" || value === "sold" || value === "available")
    return value;
  if (value === "under_negotiation" || value === "under-negotiation")
    return "under-negotiation";
  return "inactive";
};

export class SupabasePropertyAssetRepository implements PropertyAssetRepository {
  readonly provider = "supabase" as const;
  constructor(
    private readonly client: SupabaseClient,
    private readonly organizationId: string,
    private readonly workspaceId: string,
  ) {}
  async properties(): Promise<readonly PropertyAsset[]> {
    const { data, error } = await this.client
      .from("properties")
      .select("*")
      .eq("organization_id", this.organizationId)
      .eq("workspace_id", this.workspaceId)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row): PropertyAsset => ({
      id: String(row.id),
      referenceCode: String(row.reference),
      title: String(row.title),
      type: String(row.property_type),
      status: assetStatus(String(row.status), Boolean(row.deleted_at)),
      price: row.sale_price === null ? undefined : Number(row.sale_price),
      currency: String(row.currency ?? "INR"),
      area: row.area === null ? undefined : Number(row.area),
      areaUnit: String(row.area_unit ?? "sq_ft"),
      bedrooms: row.bedrooms === null ? undefined : Number(row.bedrooms),
      bathrooms: row.bathrooms === null ? undefined : Number(row.bathrooms),
      parking: row.parking === null ? undefined : Number(row.parking),
      amenities: Array.isArray(row.amenities) ? row.amenities.map(String) : [],
      builder: row.builder ? String(row.builder) : undefined,
      constructionStage: row.construction_stage
        ? String(row.construction_stage)
        : undefined,
      possessionDate: row.possession_date
        ? String(row.possession_date)
        : undefined,
      location: [row.address, row.locality, row.city]
        .filter(Boolean)
        .map(String)
        .join(", "),
      description: row.description ? String(row.description) : undefined,
      gallery: [],
      floorPlans: [],
      videos: [],
      documents: [],
      timeline: String(row.id),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
  }
  async relationships(): Promise<readonly PropertyRelationships[]> {
    return [];
  }
  async documents(): Promise<readonly PropertyDocument[]> {
    return [];
  }
}
