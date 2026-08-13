import type{AuditStamp,DomainId,EntityRef,Money}from"../../shared";
export interface Campaign extends EntityRef,AuditStamp{name:string;status:string;channel:string;startsAt?:string;endsAt?:string;budget?:Money;audienceId?:DomainId;propertyIds:readonly DomainId[]}
export interface Audience extends EntityRef,AuditStamp{name:string;criteria:Readonly<Record<string,unknown>>;estimatedSize?:number}
export interface MarketingAttribution extends EntityRef,AuditStamp{campaignId:DomainId;contactId?:DomainId;leadId?:DomainId;touchpoint:string;occurredAt:string}

