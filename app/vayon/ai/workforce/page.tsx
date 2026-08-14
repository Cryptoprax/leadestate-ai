import { EmployeeGrid } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  return (
    <WorkforceShell
      title="AI Workforce"
      description="Eight role-specific operational advisors with explicit health, capabilities, permissions, queues, and availability."
    >
      <EmployeeGrid items={snapshot.employees} />
    </WorkforceShell>
  );
}
