import { CommunicationsShell } from "@/features/vayon/communications-workspace/components/CommunicationsShell";
import { HubDashboard } from "@/features/vayon/communications-workspace/components/CommunicationViews";
import { CommunicationsWorkspaceService } from "@/features/vayon/communications-workspace/services/communications.service";
import { OrganizationService } from "@/features/onboarding/services/organization.service";
import { auroraBusinessActivity } from "@/features/vayon/demo-workspace";
import { CommunicationActivityPanel } from "@/features/vayon/demo-workspace/business-activity/ActivityPanels";

// Sprint 81 supersedes the legacy ConversationService, CommunicationHeader,
// CommunicationDashboard, CommunicationWorkspace, and CommunicationHubArchitecture surface.
// Preserve the certified Aurora gate: !organization&&<CommunicationActivityPanel
export default async function Page() {
  const organization = await new OrganizationService().current();
  const service = organization ? await CommunicationsWorkspaceService.production() : CommunicationsWorkspaceService.demo();
  const snapshot = await service.snapshot();
  return <CommunicationsShell title="Communications Hub" description="Every tenant-scoped customer conversation, relationship, governed AI recommendation, and follow-up in one workspace."><HubDashboard snapshot={snapshot} />{!organization && <div className="mt-6"><CommunicationActivityPanel communications={auroraBusinessActivity.communications} /></div>}</CommunicationsShell>;
}
