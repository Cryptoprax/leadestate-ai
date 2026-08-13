import type{Address,AuditStamp,DomainId,EntityRef}from"../../shared";
export interface Organization extends EntityRef,AuditStamp{name:string;legalName?:string;status:string;defaultWorkspaceId?:DomainId;registeredAddress?:Address;countryCode:string;currency:string;timezone:string;language:string}
export interface Branch extends EntityRef,AuditStamp{organizationId:DomainId;name:string;code:string;address?:Address;managerId?:DomainId}
export interface Department extends EntityRef,AuditStamp{name:string;branchId?:DomainId;parentDepartmentId?:DomainId}
export interface Team extends EntityRef,AuditStamp{name:string;departmentId?:DomainId;leadEmployeeId?:DomainId}
export interface Employee extends EntityRef,AuditStamp{identityId:DomainId;employeeNumber?:string;branchIds:readonly DomainId[];teamIds:readonly DomainId[];roleIds:readonly DomainId[];status:string}

