import { redirect } from "next/navigation";
import { AuthenticationService } from "@/features/authentication/services/authentication.service";
import { OrganizationService } from "@/features/onboarding/services/organization.service";
import { EnterpriseOnboardingService } from "@/features/onboarding/services/enterprise-onboarding.service";
import { EnterpriseOnboardingWizard } from "@/features/onboarding/components/EnterpriseOnboardingWizard";

export default async function Page() {
  const user = await new AuthenticationService().user();
  if (!user) redirect("/login");
  const [organization, session] = await Promise.all([
    new OrganizationService().current(),
    new EnterpriseOnboardingService().session(),
  ]);
  if (organization && session?.completed_at) redirect("/vayon");
  return <main className="grid min-h-dvh place-items-center bg-vds-background px-4 py-8"><EnterpriseOnboardingWizard session={session} provisioned={Boolean(organization)}/></main>;
}
