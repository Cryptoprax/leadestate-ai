import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Workflow extends EntityRef,AuditStamp{name:string;status:string;version:number;trigger:WorkflowTrigger;steps:readonly WorkflowStep[]}
export interface WorkflowTrigger{eventType:string;conditions:readonly Readonly<Record<string,unknown>>[]}
export interface WorkflowStep{id:DomainId;capability:string;configuration:Readonly<Record<string,unknown>>;requiresApproval:boolean;nextStepIds:readonly DomainId[]}
export interface WorkflowExecution extends EntityRef,AuditStamp{workflowId:DomainId;status:string;currentStepId?:DomainId;correlationId:string}

