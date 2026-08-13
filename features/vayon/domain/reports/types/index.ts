import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Report extends EntityRef,AuditStamp{name:string;reportType:string;definition:ReportDefinition;visibility:string;scheduleId?:DomainId}
export interface ReportDefinition{dataset:string;dimensions:readonly string[];measures:readonly string[];filters:Readonly<Record<string,unknown>>;visualization:string}
export interface ReportRun extends EntityRef{reportId:DomainId;status:string;startedAt:string;completedAt?:string;outputAssetId?:DomainId}
export interface ExecutiveDashboard extends EntityRef,AuditStamp{name:string;widgetIds:readonly DomainId[];audience:string}

