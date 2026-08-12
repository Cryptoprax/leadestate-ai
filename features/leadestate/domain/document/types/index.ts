import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Document extends EntityRef,AuditStamp{name:string;documentType:string;status:string;currentVersionId:DomainId;ownerId?:DomainId;relatedEntities:readonly{type:string;id:DomainId}[];classification:string}
export interface DocumentVersion extends EntityRef,AuditStamp{documentId:DomainId;versionNumber:number;mediaAssetId:DomainId;checksum:string;mimeType:string;sizeBytes:number}
export interface DocumentSignature extends EntityRef,AuditStamp{documentId:DomainId;signerId:DomainId;status:string;signedAt?:string}

