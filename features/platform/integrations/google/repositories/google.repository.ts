import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { EncryptedToken } from "../services/token-crypto.service";

export interface StoredGoogleCredential { id:string; email:string; scopes:string[]; access:EncryptedToken; refresh:EncryptedToken; expiresAt:string; version:number }
type Row={id:string;email:string;scopes:string[];access_ciphertext:string;access_iv:string;access_tag:string;refresh_ciphertext:string;refresh_iv:string;refresh_tag:string;expires_at:string;version:number};

export class GoogleRepository {
  constructor(private client:SupabaseClient,private organizationId:string,private workspaceId:string){}
  async credential():Promise<StoredGoogleCredential|null>{const{data,error}=await this.client.rpc("get_google_credential",{p_organization_id:this.organizationId,p_workspace_id:this.workspaceId});if(error)throw error;const r=(data?.[0]??null)as Row|null;return r&&{id:r.id,email:r.email,scopes:r.scopes,access:{ciphertext:r.access_ciphertext,iv:r.access_iv,tag:r.access_tag},refresh:{ciphertext:r.refresh_ciphertext,iv:r.refresh_iv,tag:r.refresh_tag},expiresAt:r.expires_at,version:r.version}}
  async save(input:{email:string;scopes:string[];access:EncryptedToken;refresh:EncryptedToken;expiresAt:string}){const{error}=await this.client.rpc("upsert_google_credential",{p_organization_id:this.organizationId,p_workspace_id:this.workspaceId,p_email:input.email,p_scopes:input.scopes,p_access_ciphertext:input.access.ciphertext,p_access_iv:input.access.iv,p_access_tag:input.access.tag,p_refresh_ciphertext:input.refresh.ciphertext,p_refresh_iv:input.refresh.iv,p_refresh_tag:input.refresh.tag,p_expires_at:input.expiresAt});if(error)throw error}
  async updateAccess(access:EncryptedToken,expiresAt:string,version:number){const{error}=await this.client.rpc("refresh_google_credential",{p_organization_id:this.organizationId,p_workspace_id:this.workspaceId,p_access_ciphertext:access.ciphertext,p_access_iv:access.iv,p_access_tag:access.tag,p_expires_at:expiresAt,p_expected_version:version});if(error)throw error}
  async remove(id:string){const{error}=await this.client.from("google_oauth_credentials").update({deleted_at:new Date().toISOString()}).eq("id",id).eq("organization_id",this.organizationId).eq("workspace_id",this.workspaceId);if(error)throw error}
}
