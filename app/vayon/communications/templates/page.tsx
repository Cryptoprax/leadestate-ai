import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { TemplateLibrary } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page() {
  const snapshot = await (
    await CommunicationsWorkspaceService.production()
  ).snapshot();
  return (
    <CommunicationsShell
      title="Template Library"
      description="Read-only governed templates for consistent customer communication."
    >
      <TemplateLibrary items={snapshot.templates} />
    </CommunicationsShell>
  );
}
