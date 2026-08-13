import type{CatalogItem}from"../../shared";
export type DocumentCatalogCode="active"|"inactive"|"archived";
export interface DocumentDomainConfiguration{statuses:readonly CatalogItem<DocumentCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

