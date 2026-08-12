import type{AuditStamp,DomainId,EntityRef,Money}from"../../shared";
export interface Lead extends EntityRef,AuditStamp{contactId:DomainId;sourceId?:DomainId;status:string;assignedEmployeeId?:DomainId;pipelineEntryId?:DomainId;budget?:{minimum?:Money;maximum?:Money};propertyInterestIds:readonly DomainId[];tagIds:readonly DomainId[];score?:number;temperature?:string;nextFollowUpAt?:string;doNotContact:boolean}
export interface LeadSource extends EntityRef,AuditStamp{name:string;channel:string;campaignId?:DomainId;externalReference?:string}
export interface LeadTimeline extends EntityRef,AuditStamp{leadId:DomainId;activityIds:readonly DomainId[];lastContactAt?:string}
export interface LeadQualification{leadId:DomainId;intent?:string;timeline?:string;preferredLocations:readonly string[];confidence?:number;missingInformation:readonly string[];verifiedAt?:string}

