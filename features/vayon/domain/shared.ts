export type DomainId=string;
export type ISODateTime=string;
export interface TenantRef{organizationId:DomainId;workspaceId?:DomainId}
export interface EntityRef extends TenantRef{id:DomainId}
export interface Money{amount:number;currency:string}
export interface LocalizedText{default:string;translations?:Readonly<Record<string,string>>}
export interface Address{countryCode:string;region?:string;city:string;locality?:string;postalCode?:string;lines:readonly string[]}
export interface AuditStamp{createdAt:ISODateTime;createdBy:DomainId;updatedAt:ISODateTime;updatedBy:DomainId;version:number;archivedAt?:ISODateTime}
export interface CatalogItem<TCode extends string=string>{code:TCode;label:LocalizedText;active:boolean;sortOrder:number;metadata?:Readonly<Record<string,unknown>>}

