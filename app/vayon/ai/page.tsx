import { CommandCenter } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  return (
    <WorkforceShell
      title="AI Command Center"
      description="Mission control for live, governed Vayon AI employees with workspace-attributed conversations and provider health."
    >
      <CommandCenter snapshot={snapshot} />
    </WorkforceShell>
  );
}
