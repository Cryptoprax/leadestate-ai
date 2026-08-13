import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Workspace extends EntityRef,AuditStamp{name:string;slug:string;status:string;kind:string;countryCode:string;currency:string;timezone:string;language:string}
export interface WorkspaceMembership extends EntityRef,AuditStamp{workspaceId:DomainId;employeeId:DomainId;roleIds:readonly DomainId[];status:string}
export interface WorkspacePreference extends EntityRef,AuditStamp{workspaceId:DomainId;key:string;value:unknown;scope:"workspace"|"team"|"user"}

