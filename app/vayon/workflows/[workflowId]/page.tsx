import { notFound } from "next/navigation";
import {
  GovernanceHeader,
  GovernanceNav,
  WorkflowDetail,
} from "@/features/vayon/workflow-approval/components/GovernanceViews";
import { GovernanceService } from "@/features/vayon/workflow-approval/services/governance.service";
export default async function Page({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const result = new GovernanceService().workflow(workflowId);
  if (!result.workflow) notFound();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GovernanceHeader
        title={result.workflow.name}
        description={result.workflow.description}
      />
      <GovernanceNav />
      <WorkflowDetail item={result.workflow} audit={result.audit} />
    </main>
  );
}
