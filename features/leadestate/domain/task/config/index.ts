import type{CatalogItem}from"../../shared";
export type TaskCatalogCode="open"|"in_progress"|"blocked"|"completed"|"cancelled";
export interface TaskDomainConfiguration{statuses:readonly CatalogItem<TaskCatalogCode>[];extensions?:Readonly<Record<string,unknown>>}

