import type{UniversalObjectRef}from"@/features/platform/universal-objects/domain/models";import type{Recommendation,RecommendationType}from"../domain/types";
export interface RecommendationEngine{recommend(type:RecommendationType,target:UniversalObjectRef,context?:Readonly<Record<string,unknown>>):Promise<readonly Recommendation[]>;feedback(id:string,status:Recommendation["status"]):Promise<void>}
export class PlaceholderRecommendationEngine implements RecommendationEngine{async recommend():Promise<readonly Recommendation[]>{return[]}async feedback():Promise<void>{}}
