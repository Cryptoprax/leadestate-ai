import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Calendar extends EntityRef,AuditStamp{name:string;ownerId?:DomainId;timezone:string;provider?:string}
export interface CalendarEvent extends EntityRef,AuditStamp{calendarId:DomainId;title:string;eventType:string;startsAt:string;endsAt:string;timezone:string;attendeeIds:readonly DomainId[];relatedEntityIds:readonly DomainId[];status:string}
export interface Availability{employeeId:DomainId;timezone:string;slots:readonly{startsAt:string;endsAt:string}[]}

