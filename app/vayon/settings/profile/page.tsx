import{IdentityWorkspaceService,ProfileSettings,SettingsShell}from"@/features/identity-workspace";
export default async function Page({searchParams}:{searchParams:Promise<{error?:string;success?:string}>}){const[{profile},query]=await Promise.all([new IdentityWorkspaceService().snapshot(),searchParams]);return <SettingsShell title="Profile" description="Manage your production identity, regional preferences, notifications, and session security."><ProfileSettings profile={profile} error={query.error} success={query.success}/></SettingsShell>}

