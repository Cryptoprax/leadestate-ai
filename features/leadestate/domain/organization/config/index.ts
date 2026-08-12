import type{CatalogItem}from"../../shared";
export type OrganizationCatalogCode="active"|"suspended"|"archived";
export interface OrganizationDomainConfiguration{statuses:readonly CatalogItem<OrganizationCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

