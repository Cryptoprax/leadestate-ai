import { OrganizationTable } from "@/features/platform/organizations/components/OrganizationTable";
import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";

export default function OrganizationsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Identity Platform"
        title="Organizations"
        description="Govern tenant lifecycle, regional footprint, workspaces, applications, and membership from one operational directory."
      />
      <div className="pt-7">
        <OrganizationTable />
      </div>
    </PageContainer>
  );
}
