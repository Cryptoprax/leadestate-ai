import { notFound } from "next/navigation";
import { EmployeeProfile } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = await params;
  const result = await (
    await WorkforceService.production()
  ).employee(employeeId);
  if (!result.employee) notFound();
  return (
    <WorkforceShell
      title={result.employee.name}
      description="Operational employee profile with deterministic memory, governed capabilities, queue visibility, and explainable activity."
    >
      <EmployeeProfile
        item={result.employee}
        tasks={result.tasks}
        activity={result.activity}
      />
    </WorkforceShell>
  );
}
