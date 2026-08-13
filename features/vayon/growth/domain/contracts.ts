export type GrowthProvider = "linkedin" | "facebook" | "instagram" | "threads" | "x" | "tiktok" | "pinterest" | "youtube" | "google-business-profile" | "whatsapp-business" | "telegram";
export interface SocialAccount { id: string; provider: GrowthProvider; workspaceId: string; status: "disconnected" | "pending" | "connected" | "error"; permissions: readonly string[]; metadata: Readonly<Record<string, unknown>>; publishingCapabilities: readonly ("text" | "image" | "video" | "story" | "short-video")[]; oauthAvailable: false }
export type CampaignType = "social" | "email" | "sms" | "whatsapp" | "landing-page" | "referral" | "qr";
export type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "archived";
export interface Campaign { id: string; workspaceId: string; name: string; type: CampaignType; status: CampaignStatus; goalIds: readonly string[]; budget?: { amount: number; currency: string }; audience: AudienceDefinition; tags: readonly string[]; startsAt?: string; endsAt?: string; automationStatus: "unavailable" }
export interface AudienceDefinition { id: string; name: string; filters: readonly { field: string; operator: string; value: unknown }[]; estimatedSize?: number }
export type ContentKind = "post" | "template" | "media" | "campaign-asset" | "brand-asset" | "draft";
export interface ContentAsset { id: string; workspaceId: string; kind: ContentKind; title: string; body?: string; mediaType?: string; campaignId?: string; approvalStatus: "draft" | "pending" | "approved" | "rejected"; generationStatus: "unavailable"; createdAt: string }
export interface PublishingJob { id: string; workspaceId: string; contentId: string; accountIds: readonly string[]; mode: "one-click" | "scheduled" | "multi-platform"; scheduledAt?: string; approvalRequired: boolean; approvalStatus: "pending" | "approved" | "rejected"; validation: PublishingValidation; status: "draft" | "queued" | "blocked" | "published" | "failed"; publishedAt?: string; executable: false }
export interface PublishingValidation { valid: boolean; errors: readonly string[]; warnings: readonly string[]; previewAvailable: boolean }
export interface MarketingCalendarItem { id: string; workspaceId: string; kind: "campaign" | "post" | "reminder" | "milestone" | "launch"; title: string; startsAt: string; endsAt?: string; referenceId?: string }
export type CalendarView = "month" | "week" | "day";
export interface LandingPage { id: string; workspaceId: string; title: string; slug: string; status: "draft" | "review" | "published" | "archived"; sections: readonly LandingPageSection[]; seo: SEOConfiguration; analyticsStatus: "placeholder"; builderStatus: "architecture" }
export interface LandingPageSection { id: string; title: string; order: number; blocks: readonly LandingPageBlock[] }
export interface LandingPageBlock { id: string; type: "text" | "form" | "cta" | "image" | "video"; order: number; configuration: Readonly<Record<string, unknown>> }
export interface SEOConfiguration { title: string; description: string; canonical?: string; index: boolean }
export type MarketingFormType = "lead" | "property-inquiry" | "newsletter" | "contact" | "event-registration" | "custom";
export interface MarketingForm { id: string; workspaceId: string; name: string; type: MarketingFormType; fields: readonly FormField[]; conditionalRules: readonly ConditionalRule[]; status: "draft" | "active" | "archived" }
export interface FormField { id: string; label: string; key: string; type: "text" | "email" | "phone" | "number" | "select" | "multi-select" | "date" | "boolean"; required: boolean; validation: readonly { rule: string; value?: unknown; message: string }[]; options?: readonly string[] }
export interface ConditionalRule { id: string; sourceField: string; operator: "equals" | "not-equals" | "contains" | "exists"; value?: unknown; targetField: string; effect: "show" | "hide" | "require" }
export interface ReferralProgram { id: string; workspaceId: string; name: string; status: "draft" | "active" | "paused" | "completed"; codes: readonly ReferralCode[]; rewards: readonly ReferralReward[]; partnerIds: readonly string[]; trackingStatus: "placeholder"; payoutStatus: "unavailable" }
export interface ReferralCode { id: string; code: string; status: "active" | "disabled"; usageCount?: number }
export interface ReferralReward { id: string; name: string; type: "fixed" | "percentage" | "non-cash"; value?: number; currency?: string }
export type QRCodeType = "property" | "campaign" | "business-card" | "landing-page" | "event";
export interface QRCodeDefinition { id: string; workspaceId: string; type: QRCodeType; name: string; destination: string; status: "draft" | "active" | "disabled"; trackingStatus: "placeholder"; imageStatus: "placeholder" }
export type MarketingMetric = "reach" | "impressions" | "engagement" | "clicks" | "leads" | "conversions" | "revenue-attribution" | "roi" | "funnel";
export interface MarketingAnalyticsQuery { workspaceId: string; metrics: readonly MarketingMetric[]; from: string; to: string; campaignIds?: readonly string[]; providers?: readonly GrowthProvider[] }
export interface MarketingAnalyticsResult { values: Readonly<Partial<Record<MarketingMetric, number>>>; status: "placeholder" | "ready"; sources: readonly string[] }
export type GrowthObjectiveType = "increase-leads" | "increase-revenue" | "increase-website-traffic" | "increase-engagement" | "increase-referrals" | "increase-repeat-customers" | "reduce-acquisition-cost" | string;
export interface GrowthObjective { id: string; workspaceId: string; type: GrowthObjectiveType; title: string; target?: number; unit?: string; deadline?: string; progress?: number; status: "draft" | "active" | "completed" | "paused" }

