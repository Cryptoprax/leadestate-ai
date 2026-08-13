import type{AuditStamp,DomainId,EntityRef,Money}from"../../shared";
export interface Deal extends EntityRef,AuditStamp{reference:string;leadId?:DomainId;propertyId:DomainId;buyerContactIds:readonly DomainId[];sellerContactIds:readonly DomainId[];status:string;dealType:string;value?:Money;pipelineEntryId?:DomainId;closingDate?:string}
export interface Viewing extends EntityRef,AuditStamp{dealId?:DomainId;leadId:DomainId;propertyId:DomainId;status:string;startsAt:string;endsAt:string;attendeeIds:readonly DomainId[]}
export interface Offer extends EntityRef,AuditStamp{dealId:DomainId;status:string;amount:Money;conditions:readonly string[];expiresAt?:string}
export interface Commission extends EntityRef,AuditStamp{dealId:DomainId;recipientId:DomainId;basis:string;rate?:number;amount?:Money;status:string}

