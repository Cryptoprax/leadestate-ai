import type{Address,AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Contact extends EntityRef,AuditStamp{displayName:string;givenName?:string;familyName?:string;emailAddresses:readonly string[];phoneNumbers:readonly string[];addresses:readonly Address[];preferredLanguage?:string;preferredContactMethod?:string;consentIds:readonly DomainId[]}
export interface Buyer{contactId:DomainId;requirements:Readonly<Record<string,unknown>>}
export interface Seller{contactId:DomainId;propertyIds:readonly DomainId[]}
export interface Investor{contactId:DomainId;investmentGoals:readonly string[];riskProfile?:string}
export interface Developer{contactId?:DomainId;companyId?:DomainId;projectIds:readonly DomainId[]}

