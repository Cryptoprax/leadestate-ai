import type{UniversalObjectRef}from"@/features/platform/universal-objects/domain/models";
export type PlatformEventType="lead.created"|"lead.updated"|"property.added"|"deal.won"|"task.completed"|"meeting.scheduled"|"document.uploaded"|"user.invited"|"organization.created"|string;
export interface PlatformEvent<TPayload=Readonly<Record<string,unknown>>>{id:string;type:PlatformEventType;payload:TPayload;metadata:Readonly<Record<string,unknown>>;timestamp:string;correlationId:string;source:string;target?:UniversalObjectRef;priority:"low"|"normal"|"high"|"critical";status:"published"|"processing"|"processed"|"failed";replayOf?:string}
export type EventHandler<T=Readonly<Record<string,unknown>>>=(event:PlatformEvent<T>)=>void|Promise<void>;
export interface EventBus{publish<T>(event:PlatformEvent<T>):Promise<void>;subscribe<T>(type:PlatformEventType,handler:EventHandler<T>):()=>void;history(correlationId?:string):readonly PlatformEvent[];replay(id:string):Promise<void>}
export interface EventQueueProvider{enqueue(event:PlatformEvent):Promise<void>;acknowledge(id:string):Promise<void>;reject(id:string,reason:string):Promise<void>}
export interface DistributedEventProvider extends EventQueueProvider{provider:"kafka"|"eventbridge"|"other";connect():Promise<void>;disconnect():Promise<void>}
