import type{AIExtension,UniversalObject,UniversalObjectRef}from"../domain/models";
export interface UniversalObjectAIProvider{summarize(object:UniversalObject):Promise<AIExtension>;recommend(object:UniversalObject):Promise<readonly string[]>;inferRelationships(object:UniversalObject):Promise<readonly UniversalObjectRef[]>}
export class PlaceholderUniversalObjectAIProvider implements UniversalObjectAIProvider{async summarize():Promise<AIExtension>{return{status:"placeholder",recommendations:[],insights:[],relationships:[]}}async recommend(){return[]}async inferRelationships(){return[]}}
