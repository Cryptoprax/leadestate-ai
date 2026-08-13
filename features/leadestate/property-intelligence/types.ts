import type{PropertyRecord}from"@/features/leadestate/property/types";
export type ImportMethod="manual"|"csv"|"xlsx"|"pdf"|"images"|"url"|"voice"|"crm";
export type ImportStage="idle"|"reading"|"mapping"|"validating"|"preview"|"ready"|"complete"|"error";
export interface ImportSource{method:ImportMethod;name:string;file?:File;url?:string}
export interface ImportColumn{source:string;target:string;confidence:number;required:boolean}
export interface ImportRow{index:number;values:Record<string,string>;valid:boolean;errors:string[];duplicate:boolean}
export interface ImportPreview{source:ImportSource;columns:ImportColumn[];rows:ImportRow[];warnings:string[]}
export interface ImportProvider{readonly id:string;readonly label:string;readonly methods:readonly ImportMethod[];canHandle(source:ImportSource):boolean;preview(source:ImportSource,onProgress?:(value:number)=>void):Promise<ImportPreview>}
export interface PropertyIntelligenceData{properties:readonly PropertyRecord[];total:number;active:number;sold:number;rented:number;drafts:number;recent:number;types:{label:string;count:number}[];prices:{label:string;count:number}[];currency:string}
