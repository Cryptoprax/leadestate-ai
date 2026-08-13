import type{DomainId,EntityRef,ISODateTime}from"../../shared";
export interface Activity extends EntityRef{type:string;subject:{type:string;id:DomainId};actorId?:DomainId;occurredAt:ISODateTime;summary:string;metadata:Readonly<Record<string,unknown>>;visibility:string}
export interface Timeline{subjectId:DomainId;subjectType:string;activities:readonly Activity[];cursor?:string}

