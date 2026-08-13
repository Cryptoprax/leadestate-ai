import type{UniversalObject,UniversalObjectRef}from"../domain/models";
export interface UniversalObjectListItem{id:string;type:string;title:string;subtitle:string;status:string;tags:readonly string[];aiAvailable:boolean}
export interface RelationshipGraphViewModel{nodes:readonly UniversalObjectRef[];edges:readonly{id:string;source:string;target:string;label:string}[]}
export function toListItem(object:UniversalObject):UniversalObjectListItem{return{id:object.id,type:object.type,title:object.displayName,subtitle:`${object.type} · Updated ${new Date(object.updatedAt).toLocaleDateString()}`,status:object.status,tags:object.tags,aiAvailable:object.ai.status==="ready"}}
