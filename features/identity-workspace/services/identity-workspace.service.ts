import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { IdentityWorkspaceRepository } from "../repositories/identity-workspace.repository";
export class IdentityWorkspaceService {async context(){const ctx=await operationsContext(),{data:{user}}=await ctx.client.auth.getUser();if(!user)throw new Error("Authentication required.");const repository=new IdentityWorkspaceRepository(ctx.client,ctx.organizationId,ctx.workspaceId);return{ctx,user,repository}}async snapshot(){const{user,repository}=await this.context();const[profile,tenant,google]=await Promise.all([repository.profile(user.id),repository.tenant(),repository.google()]);return{profile,tenant,google}}}

