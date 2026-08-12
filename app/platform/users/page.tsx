import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";
import { UserTable } from "@/features/platform/users/components/UserTable";

export default function UsersPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Identity Platform"
        title="Users"
        description="A unified directory of identities, organization memberships, workspace access, roles, and lifecycle status."
      />
      <div className="pt-7">
        <UserTable />
      </div>
    </PageContainer>
  );
}
