import type{CatalogItem}from"../../shared";
export type LeadCatalogCode="new"|"contacted"|"qualified"|"nurturing"|"converted"|"disqualified"|"archived";
export interface LeadDomainConfiguration{statuses:readonly CatalogItem<LeadCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

