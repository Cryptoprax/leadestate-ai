import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { NotificationList } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page() {
  const snapshot = await (
    await CommunicationsWorkspaceService.production()
  ).snapshot();
  return (
    <CommunicationsShell
      title="Notification Center"
      description="Workflow, approval, meeting, task, provider, conversation, and AI notices with governed links."
    >
      <NotificationList items={snapshot.notifications} />
    </CommunicationsShell>
  );
}
