export type MicrosoftCapability="identity"|"outlook_mail"|"outlook_calendar"|"onedrive"|"people"|"teams";
export interface MicrosoftProviderDescriptor{readonly code:string;readonly label:string;readonly capability:MicrosoftCapability;readonly status:"active"|"contract-only";readonly scopes:readonly string[];readonly executable:false}
export interface StoredMicrosoftCredential{readonly accountId:string;readonly email:string;readonly displayName:string|null;readonly tenantId:string;readonly organization:string|null;readonly scopes:readonly string[];readonly accessToken:string;readonly refreshToken:string;readonly expiresAt:string;readonly version:number;readonly validatedAt:string}
export interface MicrosoftCredentialVault{load(workspaceId:string):Promise<StoredMicrosoftCredential|null>;save(workspaceId:string,credential:StoredMicrosoftCredential):Promise<void>;remove():Promise<void>}
export interface MicrosoftGraphRequest{readonly path:string;readonly method?:"GET"|"POST"|"PUT"|"PATCH"|"DELETE";readonly body?:unknown;readonly requiredCapability:MicrosoftCapability}
export interface MicrosoftGraphGateway{request<T>(request:MicrosoftGraphRequest):Promise<T>}
