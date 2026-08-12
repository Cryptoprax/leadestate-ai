import type{CatalogItem}from"../../shared";
export type WorkspaceCatalogCode="active"|"suspended"|"archived";
export interface WorkspaceDomainConfiguration{statuses:readonly CatalogItem<WorkspaceCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

