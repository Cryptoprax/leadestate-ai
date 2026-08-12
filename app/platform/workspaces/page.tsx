import { PageContainer } from "@/features/platform/identity/components/PageContainer";
import { PageHeader } from "@/features/platform/identity/components/PageHeader";
import { WorkspaceGrid } from "@/features/platform/workspaces/components/WorkspaceGrid";

export default function WorkspacesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Identity Platform"
        title="Workspaces"
        description="Isolated operating contexts for teams, applications, environments, and delegated organization access."
      />
      <div className="pt-7">
        <WorkspaceGrid />
      </div>
    </PageContainer>
  );
}
