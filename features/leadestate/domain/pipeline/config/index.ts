import type{CatalogItem}from"../../shared";
export type PipelineCatalogCode="active"|"inactive"|"archived";
export interface PipelineDomainConfiguration{statuses:readonly CatalogItem<PipelineCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

