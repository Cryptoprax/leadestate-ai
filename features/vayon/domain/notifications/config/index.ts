import type{CatalogItem}from"../../shared";
export type NotificationsCatalogCode="low"|"normal"|"high"|"urgent";
export interface NotificationsDomainConfiguration{statuses:readonly CatalogItem<NotificationsCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

