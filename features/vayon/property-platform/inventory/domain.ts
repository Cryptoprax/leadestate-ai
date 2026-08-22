export type ProjectStatus = "upcoming" | "launching" | "active" | "sold-out" | "completed";
export type UnitStatus = "available" | "reserved" | "booked" | "sold" | "blocked" | "cancelled";
export type InventoryRole = "administrator" | "sales-manager" | "sales-agent" | "project-manager" | "marketing" | "read-only";

export interface InventoryProject {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly developer: string;
  readonly status: ProjectStatus;
  readonly description: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly country: string;
  readonly zipCode: string;
  readonly coordinates?: Readonly<{ latitude: number; longitude: number }>;
  readonly launchDate?: string;
  readonly possessionDate?: string;
  readonly projectType: string;
  readonly coverImage?: string;
  readonly gallery: readonly string[];
  readonly assignedSalesTeam: readonly string[];
  readonly constructionProgress: number;
}

export interface InventoryTower {
  readonly id: string;
  readonly projectId: string;
  readonly name: string;
  readonly floors: number;
  readonly totalUnits: number;
  readonly status: string;
  readonly constructionProgress: number;
  readonly notes?: string;
}

export interface InventoryUnit {
  readonly id: string;
  readonly projectId: string;
  readonly towerId: string;
  readonly unitNumber: string;
  readonly floor: number;
  readonly bhkType: string;
  readonly bedrooms: number;
  readonly bathrooms: number;
  readonly area: number;
  readonly areaUnit: "sqft" | "sqm";
  readonly balcony: boolean;
  readonly parking: number;
  readonly facing?: string;
  readonly view?: string;
  readonly price: number;
  readonly offerPrice?: number;
  readonly bookingAmount: number;
  readonly currency: string;
  readonly status: UnitStatus;
  readonly buyerId?: string;
}

export interface PriceRevision {
  readonly id: string;
  readonly projectId: string;
  readonly unitId?: string;
  readonly effectiveFrom: string;
  readonly basePrice: number;
  readonly offerPrice?: number;
  readonly currency: string;
  readonly discountRule?: string;
  readonly overrideApprovalId?: string;
}

export interface InventoryDocument {
  readonly id: string;
  readonly projectId: string;
  readonly title: string;
  readonly kind: "floor-plan" | "master-plan" | "brochure" | "elevation" | "construction" | "image" | "video";
  readonly storagePath?: string;
  readonly placeholder: boolean;
}

export interface InventoryAuditEvent {
  readonly id: string;
  readonly projectId: string;
  readonly unitId?: string;
  readonly action: string;
  readonly actorLabel: string;
  readonly occurredAt: string;
}

export interface InventorySnapshot {
  readonly projects: readonly InventoryProject[];
  readonly towers: readonly InventoryTower[];
  readonly units: readonly InventoryUnit[];
  readonly prices: readonly PriceRevision[];
  readonly documents: readonly InventoryDocument[];
  readonly audit: readonly InventoryAuditEvent[];
  readonly provider: "supabase" | "aurora";
}

export interface InventoryFilters {
  readonly search?: string;
  readonly city?: string;
  readonly developer?: string;
  readonly projectStatus?: ProjectStatus;
  readonly unitStatus?: UnitStatus;
  readonly bhk?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly minArea?: number;
  readonly maxArea?: number;
  readonly possessionBefore?: string;
}

export interface InventoryMetrics {
  readonly availableUnits: number;
  readonly reservedUnits: number;
  readonly bookedUnits: number;
  readonly soldUnits: number;
  readonly inventoryValue: number;
  readonly expectedRevenue: number;
  readonly occupancy: number;
  readonly fastestSellingProjects: readonly string[];
  readonly topPerformingProjects: readonly string[];
  readonly currency: string;
}

export interface InventoryAIContext {
  readonly projectId: string;
  readonly availableUnits: readonly Pick<InventoryUnit, "id" | "unitNumber" | "bhkType" | "area" | "areaUnit" | "price" | "offerPrice" | "currency" | "status">[];
  readonly capabilities: readonly ["recommend-properties", "find-alternatives", "suggest-upgrades", "suggest-cheaper-options", "detect-unavailable-inventory", "generate-summaries"];
  readonly recommendationOnly: true;
  readonly autonomousActions: false;
}
