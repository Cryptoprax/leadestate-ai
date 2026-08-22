export type IndustrySlug =
  | "residential-agencies"
  | "commercial-brokerages"
  | "property-developers"
  | "builders"
  | "luxury-property"
  | "property-management"
  | "channel-partners"
  | "real-estate-groups";
export type ComparisonSlug =
  "hubspot" | "salesforce" | "zoho-crm" | "pipedrive" | "monday";
export type AssetSlug =
  | "one-pager"
  | "executive-summary"
  | "platform-overview"
  | "ai-workforce-overview"
  | "enterprise-security-overview"
  | "workflow-overview";
export interface IndustryPage {
  slug: IndustrySlug;
  name: string;
  description: string;
  challenges: readonly string[];
  solutions: readonly string[];
  benefits: readonly string[];
  roi: string;
  workflows: readonly string[];
}
export interface ComparisonPage {
  slug: ComparisonSlug;
  competitor: string;
  summary: string;
  dimensions: readonly { label: string; vayon: string; alternative: string }[];
  disclaimer: string;
}
export interface MarketingAsset {
  slug: AssetSlug;
  title: string;
  audience: string;
  summary: string;
  sections: readonly string[];
}
export interface CustomerStory {
  slug: string;
  kind: "case-study" | "testimonial" | "success-story" | "reference-customer";
  title: string;
  industry: string;
  summary: string;
  evidenceStatus: "template" | "approved";
}
