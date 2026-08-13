import type{CatalogItem}from"../../shared";
export type AnalyticsCatalogCode="active"|"inactive"|"archived";
export interface AnalyticsDomainConfiguration{statuses:readonly CatalogItem<AnalyticsCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

