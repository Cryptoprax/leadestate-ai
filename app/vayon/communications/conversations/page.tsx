import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { ConversationLinks } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page() {
  const snapshot = await (
    await CommunicationsWorkspaceService.production()
  ).snapshot();
  return (
    <CommunicationsShell
      title="Conversations"
      description="Customer, lead, assignment, channel, deal, property, workflow, and task relationships in one provider-neutral directory."
    >
      <ConversationLinks items={snapshot.conversations} />
    </CommunicationsShell>
  );
}
