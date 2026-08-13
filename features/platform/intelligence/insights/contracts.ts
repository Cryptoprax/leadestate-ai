import type{BusinessInsight,InsightType}from"../domain/types";
export interface BusinessInsightEngine{generate(types:readonly InsightType[],period:string):Promise<readonly BusinessInsight[]>}
export class PlaceholderBusinessInsightEngine implements BusinessInsightEngine{async generate(types:readonly InsightType[],period:string){return types.map(type=>({id:crypto.randomUUID(),type,title:type.replaceAll("-"," "),summary:"Awaiting an approved analytics and intelligence source.",severity:"info" as const,evidence:[],confidence:0,period,status:"placeholder" as const}))}}
