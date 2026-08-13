import type{DomainId}from"../../shared";
export interface SearchQuery{organizationId:DomainId;workspaceId?:DomainId;text:string;entityTypes:readonly string[];filters:Readonly<Record<string,unknown>>;sort:readonly{field:string;direction:"asc"|"desc"}[];cursor?:string;limit:number}
export interface SearchResult{id:DomainId;entityType:string;title:string;summary?:string;score:number;highlights:Readonly<Record<string,readonly string[]>>}
export interface SearchPage{results:readonly SearchResult[];nextCursor?:string;totalEstimate?:number}

