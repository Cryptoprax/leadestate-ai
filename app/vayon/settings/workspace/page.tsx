import{IdentityWorkspaceService,SettingsShell,TenantSettingsPanel}from"@/features/identity-workspace";
export default async function Page(){const{tenant}=await new IdentityWorkspaceService().snapshot();return <SettingsShell title="Workspace" description="Review the active operating workspace and its organization boundary."><TenantSettingsPanel tenant={tenant} scope="workspace"/></SettingsShell>}
