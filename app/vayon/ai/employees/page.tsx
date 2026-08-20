import { AIEmployeeGrid, AIHeader, ProviderHealth } from "@/features/vayon/ai-workforce/components/AIWorkforceUI";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";

export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  const health = snapshot.runtimeHealth;
  return <main className="mx-auto max-w-[96rem] px-5 py-8"><AIHeader title="AI Employees" description="Live, workspace-attributed GPT workforce with streaming conversations and mandatory human governance." health={health} /><ProviderHealth health={health} observability={snapshot.observability} /><AIEmployeeGrid items={snapshot.employees} health={health} /></main>;
}
