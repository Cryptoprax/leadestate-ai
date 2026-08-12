import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";
import { PermissionGroups } from "@/features/platform/permissions/components/PermissionGroups";

export default function PermissionsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Identity Platform"
        title="Permissions"
        description="A capability-based permission catalog designed for default-deny authorization, explicit scope, and future multi-tenant enforcement."
      />
      <div className="pt-7">
        <PermissionGroups />
      </div>
    </PageContainer>
  );
}
