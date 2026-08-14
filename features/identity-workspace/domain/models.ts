export interface UserProfile {
  readonly userId:string;readonly name:string;readonly email:string;readonly avatarUrl:string|null;readonly timezone:string;readonly language:string;readonly country:string|null;readonly phone:string|null;readonly jobTitle:string|null;readonly department:string|null;readonly notificationPreferences:Record<string,boolean>;readonly securitySettings:Record<string,boolean|number>;readonly lastLoginAt:string|null;readonly version:number;
}
export interface TenantSettings {readonly organizationId:string;readonly organizationName:string;readonly workspaceId:string;readonly workspaceName:string;readonly country:string;readonly timezone:string;readonly businessType:string|null;readonly companySize:string|null;readonly phone:string|null;readonly website:string|null;readonly industry:string|null;readonly logoPath:string|null;}
export interface GoogleConnectionSummary {readonly status:"connected"|"disconnected"|"expired";readonly email:string|null;readonly scopes:readonly string[];readonly expiresAt:string|null;readonly refreshAvailable:boolean;}

