import type{CatalogItem}from"../../shared";
export type ActivityCatalogCode="active"|"inactive"|"archived";
export interface ActivityDomainConfiguration{statuses:readonly CatalogItem<ActivityCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

