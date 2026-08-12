import type{CatalogItem}from"../../shared";
export type AiCatalogCode="disabled"|"idle"|"running"|"waiting_for_approval"|"failed"|"suspended";
export interface AiDomainConfiguration{statuses:readonly CatalogItem<AiCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

