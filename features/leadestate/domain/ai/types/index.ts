import type{AuditStamp,DomainId,EntityRef}from"../../shared";
export interface AIEmployee extends EntityRef,AuditStamp{name:string;status:string;role:string;capabilityIds:readonly DomainId[];modelPolicyId:DomainId;approvalPolicyId:DomainId;knowledgeBaseIds:readonly DomainId[]}
export interface KnowledgeBase extends EntityRef,AuditStamp{name:string;status:string;sourceIds:readonly DomainId[];locale:string}
export interface AICapability{key:string;description:string;inputSchema:Readonly<Record<string,unknown>>;outputSchema:Readonly<Record<string,unknown>>;riskLevel:string;readOnly:boolean}
export interface AIRecommendation extends EntityRef,AuditStamp{employeeId:DomainId;subjectId:DomainId;capability:string;confidence:number;evidence:readonly DomainId[];output:Readonly<Record<string,unknown>>;approvalStatus:string}

