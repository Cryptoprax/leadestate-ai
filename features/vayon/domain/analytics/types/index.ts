import type{DomainId,EntityRef}from"../../shared";
export interface MetricDefinition{key:string;name:string;description:string;unit:string;aggregation:string;dimensions:readonly string[]}
export interface MetricObservation extends EntityRef{metricKey:string;value:number;observedAt:string;dimensions:Readonly<Record<string,string>>}
export interface DashboardWidget extends EntityRef{dashboardId:DomainId;widgetType:string;title:string;query:Readonly<Record<string,unknown>>;layout:Readonly<Record<string,number>>}
export interface AnalyticsSnapshot extends EntityRef{periodStart:string;periodEnd:string;metrics:Readonly<Record<string,number>>}

