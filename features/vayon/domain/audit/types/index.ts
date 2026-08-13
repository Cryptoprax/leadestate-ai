import type{DomainId,EntityRef,ISODateTime}from"../../shared";
export interface AuditEvent extends EntityRef{eventType:string;actorId?:DomainId;actorType:string;subject:{type:string;id:DomainId};occurredAt:ISODateTime;correlationId:string;reason?:string;changes?:readonly AuditChange[];metadata:Readonly<Record<string,unknown>>}
export interface AuditChange{path:string;before?:unknown;after?:unknown}
export interface AuditRetentionPolicy{eventTypes:readonly string[];retentionDays:number;legalHold:boolean}

