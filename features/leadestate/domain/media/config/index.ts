import type{CatalogItem}from"../../shared";
export type MediaCatalogCode="active"|"inactive"|"archived";
export interface MediaDomainConfiguration{statuses:readonly CatalogItem<MediaCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

