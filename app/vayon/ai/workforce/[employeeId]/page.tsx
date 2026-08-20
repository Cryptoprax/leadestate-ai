import { notFound } from "next/navigation";
import { EmployeeProfile } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
import { WorkforceRuntimeService } from "@/features/platform/openai/runtime/service";
import { WorkforceChatPanel } from "@/features/platform/openai/runtime/ChatPanel";
import type { AIEmployeeCode } from "@/features/platform/openai/domain/models";
import { SalesAIDashboard, SalesAIService } from "@/features/platform/sales-ai";
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
  const runtime = await WorkforceRuntimeService.production();
  const employee = result.employee.code as AIEmployeeCode;
  const [history, health] = await Promise.all([
    runtime.history(employee).catch(() => ({ conversations: [], messages: [] })),
    runtime.health(),
  ]);
  const salesDashboard = employee === "sales-ai" ? await (await SalesAIService.production()).dashboard() : null;
  return (
    <WorkforceShell
      title={result.employee.name}
      description="Operational employee profile with deterministic memory, governed capabilities, queue visibility, and explainable activity."
    >
      {salesDashboard && <SalesAIDashboard data={salesDashboard} />}
      <EmployeeProfile
        item={result.employee}
        tasks={result.tasks}
        activity={result.activity}
      />
      <WorkforceChatPanel employee={employee} initial={history} health={health} />
    </WorkforceShell>
  );
}
