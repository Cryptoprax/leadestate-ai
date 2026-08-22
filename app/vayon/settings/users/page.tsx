import { EnterpriseUserDirectory } from "@/features/platform/organization/components/OrganizationAdmin";
import { OrganizationHeader } from "@/features/platform/organization/components/OrganizationUI";
import { EnterpriseOrganizationService } from "@/features/platform/organization";
export default async function Page(){const snapshot=await new EnterpriseOrganizationService().snapshot();return <main className="mx-auto max-w-[110rem] px-5 py-8"><OrganizationHeader title="Employee Directory" description="Search, filter, and review roles, departments, teams, status, activity, permissions, and workforce assignments."/><EnterpriseUserDirectory snapshot={snapshot}/></main>}
