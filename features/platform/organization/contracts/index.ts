export interface InvitationProvider{send(input:{email:string;redirectTo:string;organizationId:string;workspaceId:string}):Promise<void>}
