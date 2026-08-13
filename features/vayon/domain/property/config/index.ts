import type{CatalogItem}from"../../shared";
export type PropertyCatalogCode="draft"|"available"|"reserved"|"under_offer"|"sold"|"rented"|"withdrawn"|"archived";
export interface PropertyDomainConfiguration{statuses:readonly CatalogItem<PropertyCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

