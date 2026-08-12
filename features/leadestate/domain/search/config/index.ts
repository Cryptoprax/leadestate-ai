import type{CatalogItem}from"../../shared";
export type SearchCatalogCode="active"|"inactive"|"archived";
export interface SearchDomainConfiguration{statuses:readonly CatalogItem<SearchCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

