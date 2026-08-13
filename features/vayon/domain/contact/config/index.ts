import type{CatalogItem}from"../../shared";
export type ContactCatalogCode="active"|"inactive"|"archived";
export interface ContactDomainConfiguration{statuses:readonly CatalogItem<ContactCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

