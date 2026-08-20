export type PublicPageId = "features" | "solutions" | "industries" | "privacy" | "terms" | "trust-center";
export interface PublicPage { slug: PublicPageId; eyebrow: string; title: string; description: string; sections: readonly { title: string; description: string }[] }
export interface BlogArticle { slug: string; title: string; excerpt: string; category: string; author: string; tags: readonly string[]; publishedAt: string; body: readonly string[] }
export type MarketingEventType = "page_view" | "cta_click" | "demo_request" | "trial_signup" | "contact_sales" | "newsletter" | "demo_launch" | "roi_calculation" | "industry_view" | "comparison_view" | "marketing_conversion" | "web_vital" | "tracking_failure";
export interface MarketingEvent { type: MarketingEventType; path: string; sessionId: string; metadata?: Record<string, string> }
export interface MarketingProvider { record(event: MarketingEvent): Promise<void>; captureLead(input: { kind: "demo" | "trial" | "sales" | "newsletter"; name?: string; email: string; company?: string; message?: string; plan?: string }): Promise<string> }
