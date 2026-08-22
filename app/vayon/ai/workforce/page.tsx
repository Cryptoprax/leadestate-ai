import { WorkforceDirectory } from "@/features/vayon/operational-workforce/components/WorkforceDirectory";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  return (
    <WorkforceShell
      title="AI Workforce"
      description="A live directory of specialized digital employees with governed access, visible workload, workspace memory, and team collaboration."
    >
      <WorkforceDirectory items={snapshot.employees} />
    </WorkforceShell>
  );
}
