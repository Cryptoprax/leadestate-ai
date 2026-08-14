import { ActivityList } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  return (
    <WorkforceShell
      title="Workforce History"
      description="A read-only timeline of governed workforce outcomes derived from existing workspace tasks and conversations."
    >
      <ActivityList items={snapshot.activity} />
    </WorkforceShell>
  );
}
