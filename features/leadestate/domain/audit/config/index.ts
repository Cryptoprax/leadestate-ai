import type{CatalogItem}from"../../shared";
export type AuditCatalogCode="active"|"inactive"|"archived";
export interface AuditDomainConfiguration{statuses:readonly CatalogItem<AuditCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

