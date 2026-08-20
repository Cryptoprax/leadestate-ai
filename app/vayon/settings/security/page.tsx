import { SettingsShell } from "@/features/identity-workspace";
import {
  EnterpriseSecurityService,
  IdentitySecurityDashboard,
} from "@/features/platform/enterprise-security";
export default async function Page() {
  const data = await (await EnterpriseSecurityService.production()).dashboard();
  return (
    <SettingsShell
      title="Security"
      description="Enterprise identity, authentication, sessions, devices, MFA, organization access, and API credentials."
    >
      <IdentitySecurityDashboard data={data} />
    </SettingsShell>
  );
}
