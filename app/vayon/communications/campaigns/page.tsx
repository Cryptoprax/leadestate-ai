import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { CampaignList } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
export default async function Page() {
  const snapshot = await (
    await CommunicationsWorkspaceService.production()
  ).snapshot();
  return (
    <CommunicationsShell
      title="Communication Campaigns"
      description="Audience, progress, reach, lifecycle, and approval state without campaign execution."
    >
      <CampaignList items={snapshot.campaigns} />
    </CommunicationsShell>
  );
}
