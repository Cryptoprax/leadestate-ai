import type{CatalogItem}from"../../shared";
export type MarketingCatalogCode="draft"|"scheduled"|"active"|"paused"|"completed"|"cancelled";
export interface MarketingDomainConfiguration{statuses:readonly CatalogItem<MarketingCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

