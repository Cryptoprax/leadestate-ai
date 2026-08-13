import type{CatalogItem}from"../../shared";
export type CompanyCatalogCode="active"|"inactive"|"archived";
export interface CompanyDomainConfiguration{statuses:readonly CatalogItem<CompanyCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

