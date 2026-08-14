export type AssetStatus =
  | "available"
  | "reserved"
  | "under-negotiation"
  | "sold"
  | "inactive"
  | "archived";

export interface PropertyAsset {
  readonly id: string;
  readonly referenceCode: string;
  readonly title: string;
  readonly type: string;
  readonly status: AssetStatus;
  readonly price?: number;
  readonly currency: string;
  readonly area?: number;
  readonly areaUnit: string;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly parking?: number;
  readonly amenities: readonly string[];
  readonly builder?: string;
  readonly constructionStage?: string;
  readonly possessionDate?: string;
  readonly location: string;
  readonly coordinates?: Readonly<{ latitude: number; longitude: number }>;
  readonly description?: string;
  readonly gallery: readonly string[];
  readonly floorPlans: readonly string[];
  readonly videos: readonly string[];
  readonly documents: readonly PropertyDocument[];
  readonly timeline?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PropertyDocument {
  readonly id: string;
  readonly propertyId: string;
  readonly title: string;
  readonly kind:
    | "brochure"
    | "floor-plan"
    | "image"
    | "video"
    | "contract"
    | "approval"
    | "certificate";
  readonly readOnly: true;
}

export interface PropertyRelationships {
  readonly propertyId: string;
  readonly interestedLeads: readonly string[];
  readonly customers: readonly string[];
  readonly deals: readonly string[];
  readonly recentActivity: readonly string[];
  readonly meetings: readonly string[];
  readonly siteVisits: readonly string[];
  readonly tasks: readonly string[];
  readonly reminders: readonly string[];
  readonly conversations: readonly string[];
  readonly templates: readonly string[];
  readonly campaigns: readonly string[];
  readonly notifications: readonly string[];
  readonly approvalHistory: readonly string[];
  readonly workflows: readonly string[];
  readonly pendingActions: readonly string[];
}

export interface PropertyAnalytics {
  readonly views: string;
  readonly interestedBuyers: number;
  readonly conversionRate: string;
  readonly averageDaysListed: string;
  readonly meetingCount: number;
  readonly offerCount: string;
  readonly statusChanges: string;
}

export interface PropertySnapshot {
  readonly properties: readonly PropertyAsset[];
  readonly relationships: readonly PropertyRelationships[];
  readonly source: "supabase" | "aurora";
}

export interface PropertyRecommendation {
  readonly kind:
    | "buyer-match"
    | "pricing"
    | "summary"
    | "recommended-buyers"
    | "follow-up"
    | "demand";
  readonly value: string;
  readonly rationale: string;
  readonly deterministic: true;
  readonly executionAllowed: false;
}
