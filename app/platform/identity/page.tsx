import { IdentityDashboard } from "@/features/platform/identity/components/IdentityDashboard";
import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";

export default function IdentityPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="AtlasOS Identity"
        title="Identity Platform"
        description="The shared, tenant-aware identity foundation for every AtlasOS application, organization, workspace, user, role, and permission."
      />
      <div className="pt-7">
        <IdentityDashboard />
      </div>
    </PageContainer>
  );
}
