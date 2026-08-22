import { TeamsManagement } from "@/features/platform/organization/components/OrganizationAdmin";
import { OrganizationHeader } from "@/features/platform/organization/components/OrganizationUI";
import { EnterpriseOrganizationService } from "@/features/platform/organization";
export default async function Page(){const snapshot=await new EnterpriseOrganizationService().snapshot();return <main className="mx-auto max-w-[96rem] px-5 py-8"><OrganizationHeader title="Teams" description="Create, staff, manage capacity, and archive teams inside tenant-scoped departments."/><TeamsManagement snapshot={snapshot}/></main>}
