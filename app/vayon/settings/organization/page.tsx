import { OrganizationHeader, OrganizationSettingsForm } from "@/features/platform/organization/components/OrganizationUI";
import { EnterpriseOrganizationService } from "@/features/platform/organization";
export default async function Page(){const snapshot=await new EnterpriseOrganizationService().snapshot();return <main className="mx-auto max-w-6xl px-5 py-8"><OrganizationHeader title="Organization Settings" description="Profile, business identity, localization, address, logo, and VAYON branding settings."/><OrganizationSettingsForm snapshot={snapshot}/></main>}
