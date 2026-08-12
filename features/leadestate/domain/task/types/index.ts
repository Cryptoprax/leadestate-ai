import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Task extends EntityRef,AuditStamp{title:string;description?:string;status:string;priority:string;dueAt?:string;reminderAt?:string;completedAt?:string;assignedEmployeeId?:DomainId;parent?:{type:"lead"|"property"|"deal"|"organization";id:DomainId};recurrence?:RecurrenceRule}
export interface RecurrenceRule{frequency:string;interval:number;until?:string;count?:number;timezone:string}

