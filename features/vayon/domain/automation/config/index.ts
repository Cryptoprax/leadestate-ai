import type{CatalogItem}from"../../shared";
export type AutomationCatalogCode="active"|"inactive"|"archived";
export interface AutomationDomainConfiguration{statuses:readonly CatalogItem<AutomationCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

