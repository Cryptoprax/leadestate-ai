import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Pipeline extends EntityRef,AuditStamp{name:string;entityType:string;default:boolean;stageIds:readonly DomainId[]}
export interface PipelineStage extends EntityRef,AuditStamp{pipelineId:DomainId;name:string;order:number;terminal:boolean;winProbability?:number;limits?:Readonly<Record<string,number>>}
export interface PipelineEntry extends EntityRef,AuditStamp{pipelineId:DomainId;stageId:DomainId;entityId:DomainId;entityType:string;enteredAt:string;previousStageId?:DomainId}

