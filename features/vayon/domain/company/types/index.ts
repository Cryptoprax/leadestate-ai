import type{Address,AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Company extends EntityRef,AuditStamp{name:string;legalName?:string;companyType:string;registrationNumber?:string;taxNumber?:string;addresses:readonly Address[];contactIds:readonly DomainId[];parentCompanyId?:DomainId}
export interface CompanyRelationship extends EntityRef,AuditStamp{sourceCompanyId:DomainId;targetCompanyId:DomainId;relationshipType:string;validFrom?:string;validTo?:string}

