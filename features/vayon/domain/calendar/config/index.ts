import type{CatalogItem}from"../../shared";
export type CalendarCatalogCode="active"|"inactive"|"archived";
export interface CalendarDomainConfiguration{statuses:readonly CatalogItem<CalendarCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

