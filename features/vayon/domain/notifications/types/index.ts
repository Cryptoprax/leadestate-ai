import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Notification extends EntityRef,AuditStamp{recipientId:DomainId;category:string;priority:string;title:string;body:string;status:string;action?:{label:string;reference:string};readAt?:string}
export interface NotificationPreference extends EntityRef,AuditStamp{recipientId:DomainId;channels:readonly string[];quietHours?:{startsAt:string;endsAt:string;timezone:string};digestFrequency?:string}
export interface NotificationTemplate extends EntityRef,AuditStamp{key:string;version:number;locale:string;subject?:string;body:string;variables:readonly string[]}

