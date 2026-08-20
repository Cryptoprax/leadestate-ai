import "server-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { InvitationProvider } from "../contracts";
export class SupabaseInvitationProvider implements InvitationProvider{async send(input:{email:string;redirectTo:string;organizationId:string;workspaceId:string}){const client=createSupabaseServiceClient();const{error}=await client.auth.admin.inviteUserByEmail(input.email,{redirectTo:input.redirectTo,data:{organization_id:input.organizationId,workspace_id:input.workspaceId}});if(error)throw new Error(`Invitation delivery failed: ${error.message}`)}}
