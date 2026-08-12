import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";
import { RoleTable } from "@/features/platform/roles/components/RoleTable";

export default function RolesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Identity Platform"
        title="Roles"
        description="Compose reusable responsibility profiles from governed permissions and explicit platform, organization, or workspace scopes."
      />
      <div className="pt-7">
        <RoleTable />
      </div>
    </PageContainer>
  );
}
