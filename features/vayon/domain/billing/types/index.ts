import type{AuditStamp,DomainId,EntityRef,Money}from"../../shared";
export interface Plan extends EntityRef,AuditStamp{name:string;status:string;entitlements:readonly string[];prices:readonly Money[]}
export interface Subscription extends EntityRef,AuditStamp{planId:DomainId;status:string;startsAt:string;renewsAt?:string;cancelsAt?:string}
export interface UsageRecord extends EntityRef{metric:string;quantity:number;periodStart:string;periodEnd:string}
export interface Invoice extends EntityRef,AuditStamp{subscriptionId:DomainId;status:string;total:Money;dueAt?:string;paidAt?:string}

