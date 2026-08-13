import type{Address,AuditStamp,DomainId,EntityRef,Money}from"../../shared";
export interface Property extends EntityRef,AuditStamp{reference:string;title:string;description?:string;status:string;propertyType:string;listingType:string;address:Address;location?:{latitude:number;longitude:number};ownerIds:readonly DomainId[];pricingId?:DomainId;featured:boolean;published:boolean}
export interface PropertyImage extends EntityRef,AuditStamp{propertyId:DomainId;mediaAssetId:DomainId;primary:boolean;displayOrder:number;caption?:string;altText:string}
export interface PropertyDocument extends EntityRef,AuditStamp{propertyId:DomainId;documentId:DomainId;category:string}
export interface PropertyOwner extends EntityRef,AuditStamp{propertyId:DomainId;contactId?:DomainId;companyId?:DomainId;ownershipPercent?:number}
export interface PropertyPricing extends EntityRef,AuditStamp{propertyId:DomainId;askingPrice:Money;rentPeriod?:string;serviceCharges?:Money;validFrom:string;validTo?:string}
export interface PropertySpecification{bedrooms?:number;bathrooms?:number;parking?:number;area?:number;areaUnit?:string;amenities:readonly string[];developerId?:DomainId;completionStatus?:string}

