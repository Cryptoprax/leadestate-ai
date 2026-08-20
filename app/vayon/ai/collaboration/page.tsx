import {
  AICollaborationService,
  ExecutiveCollaborationDashboard,
} from "@/features/platform/ai-collaboration";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
export default async function Page() {
  const data = await (await AICollaborationService.production()).dashboard();
  return (
    <WorkforceShell
      title="AI Collaboration"
      description="Governed cross-employee recommendations, shared context, approval visibility, and collaboration observability."
    >
      <ExecutiveCollaborationDashboard data={data} />
    </WorkforceShell>
  );
}
