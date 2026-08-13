import type{UniversalObject,UniversalObjectType,UniversalRelationship}from"../domain/models";
export interface UniversalObjectStore{list(types?:readonly UniversalObjectType[]):readonly UniversalObject[];get(id:string):UniversalObject|undefined;save(object:UniversalObject):void;remove(id:string):void}
export interface RelationshipStore{list(objectId?:string):readonly UniversalRelationship[];save(value:UniversalRelationship):void;remove(id:string):void}
export interface RecentSearchStore{list():readonly string[];push(query:string):void;clear():void}
