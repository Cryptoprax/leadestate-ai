import type{CatalogItem}from"../../shared";
export type ReportsCatalogCode="active"|"inactive"|"archived";
export interface ReportsDomainConfiguration{statuses:readonly CatalogItem<ReportsCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

