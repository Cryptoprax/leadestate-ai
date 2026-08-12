import type{CatalogItem}from"../../shared";
export type BillingCatalogCode="active"|"inactive"|"archived";
export interface BillingDomainConfiguration{statuses:readonly CatalogItem<BillingCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

