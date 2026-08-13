export type Aggregation="count"|"sum"|"average"|"minimum"|"maximum"|"distinct";
export interface MetricDefinition{id:string;name:string;field:string;aggregation:Aggregation;format:"number"|"currency"|"percent"|"duration"}
export interface DimensionDefinition{id:string;name:string;field:string;type:"category"|"date"|"number"|"boolean"}
export interface AnalyticsFilter{dimension:string;operator:"equals"|"not-equals"|"in"|"greater-than"|"less-than"|"between";value:unknown}
export interface DateRange{from:string;to:string;preset?:string}
export interface AnalyticsQuery{metrics:readonly string[];dimensions:readonly string[];filters:readonly AnalyticsFilter[];segments:readonly string[];dateRange:DateRange;compareTo?:DateRange;includeGrowth?:boolean;includeTrend?:boolean;includeForecast?:boolean}
export interface AnalyticsPoint{dimensions:Readonly<Record<string,string|number|boolean>>;metrics:Readonly<Record<string,number>>}
export interface AnalyticsResult{points:readonly AnalyticsPoint[];totals:Readonly<Record<string,number>>;growth?:Readonly<Record<string,number>>;trend?:"up"|"down"|"flat";forecastStatus:"placeholder"|"ready"}
export interface AnalyticsProvider{query(request:AnalyticsQuery):Promise<AnalyticsResult>;export?(request:AnalyticsQuery,format:"csv"|"xlsx"|"pdf"):Promise<Blob>}
export class PlaceholderAnalyticsProvider implements AnalyticsProvider{async query():Promise<AnalyticsResult>{return{points:[],totals:{},forecastStatus:"placeholder"}}}
export class AnalyticsService{constructor(private provider:AnalyticsProvider){}run(query:AnalyticsQuery){return this.provider.query(query)}}
export interface DashboardWidgetDefinition{id:string;title:string;metricIds:readonly string[];dimensionIds:readonly string[];size:"sm"|"md"|"lg";refreshSeconds?:number;exportEnabled:boolean}
