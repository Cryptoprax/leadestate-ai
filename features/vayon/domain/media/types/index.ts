import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface MediaAsset extends EntityRef,AuditStamp{kind:string;fileName:string;mimeType:string;sizeBytes:number;storageReference:string;checksum:string;status:string;altText?:string}
export interface MediaVariant extends EntityRef,AuditStamp{assetId:DomainId;purpose:string;width?:number;height?:number;storageReference:string}
export interface MediaCollection extends EntityRef,AuditStamp{name:string;assetIds:readonly DomainId[]}

