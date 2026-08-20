import { ActivityLog, OrganizationHeader } from "@/features/platform/organization/components/OrganizationUI";
import { EnterpriseOrganizationService } from "@/features/platform/organization";
export default async function Page(){const snapshot=await new EnterpriseOrganizationService().snapshot();return <main className="mx-auto max-w-6xl px-5 py-8"><OrganizationHeader title="Organization Activity" description="Immutable organization, invitation, membership, role, and ownership audit history."/><ActivityLog snapshot={snapshot}/></main>}
