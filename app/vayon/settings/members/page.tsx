import { MembersManagement, OrganizationHeader } from "@/features/platform/organization/components/OrganizationUI";
import { EnterpriseOrganizationService } from "@/features/platform/organization";
export default async function Page(){const snapshot=await new EnterpriseOrganizationService().snapshot();return <main className="mx-auto max-w-[96rem] px-5 py-8"><OrganizationHeader title="Members" description="Invite, assign, suspend, reactivate, remove, and transfer ownership within the active workspace."/><MembersManagement snapshot={snapshot}/></main>}
