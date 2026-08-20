import { notFound } from "next/navigation";
import { EmployeeProfile } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
import { WorkforceRuntimeService } from "@/features/platform/openai/runtime/service";
import { WorkforceChatPanel } from "@/features/platform/openai/runtime/ChatPanel";
import type { AIEmployeeCode } from "@/features/platform/openai/domain/models";
import { SalesAIDashboard, SalesAIService } from "@/features/platform/sales-ai";
import { CRMAIDashboard, CRMAIService } from "@/features/platform/crm-ai";
import { WhatsAppAIDashboard, WhatsAppAIService } from "@/features/platform/whatsapp-ai";
import { MarketingAIDashboard, MarketingAIService } from "@/features/platform/marketing-ai";
import { ExecutiveAIDashboard, ExecutiveAIService } from "@/features/platform/executive-ai";
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
  const crmDashboard = employee === "crm-ai" ? await (await CRMAIService.production()).dashboard() : null;
  const whatsappDashboard = employee === "whatsapp-ai" ? await (await WhatsAppAIService.production()).dashboard() : null;
  const marketingDashboard = employee === "marketing-ai" ? await (await MarketingAIService.production()).dashboard() : null;
  const executiveDashboard = employee === "executive-ai" ? await (await ExecutiveAIService.production()).dashboard() : null;
  return (
    <WorkforceShell
      title={result.employee.name}
      description="Operational employee profile with deterministic memory, governed capabilities, queue visibility, and explainable activity."
    >
      {salesDashboard && <SalesAIDashboard data={salesDashboard} />}
      {crmDashboard && <CRMAIDashboard data={crmDashboard} />}
      {whatsappDashboard && <WhatsAppAIDashboard data={whatsappDashboard} />}
      {marketingDashboard && <MarketingAIDashboard data={marketingDashboard} />}
      {executiveDashboard && <ExecutiveAIDashboard data={executiveDashboard} />}
      <EmployeeProfile
        item={result.employee}
        tasks={result.tasks}
        activity={result.activity}
      />
      <WorkforceChatPanel employee={employee} initial={history} health={health} />
    </WorkforceShell>
  );
}
