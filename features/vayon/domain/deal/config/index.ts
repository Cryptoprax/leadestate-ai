import type{CatalogItem}from"../../shared";
export type DealCatalogCode="open"|"negotiation"|"reserved"|"won"|"lost"|"cancelled";
export interface DealDomainConfiguration{statuses:readonly CatalogItem<DealCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

