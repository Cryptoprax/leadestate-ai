import{GoogleSettings,IdentityWorkspaceService,SettingsShell}from"@/features/identity-workspace";
export default async function Page(){const{google}=await new IdentityWorkspaceService().snapshot();return <SettingsShell title="Google" description="Review Google Workspace consent, scopes, refresh readiness, and token expiry without syncing data."><GoogleSettings connection={google}/></SettingsShell>}

