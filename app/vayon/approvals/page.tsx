import {
  ApprovalList,
  GovernanceHeader,
  GovernanceNav,
} from "@/features/vayon/workflow-approval/components/GovernanceViews";
import { GovernanceService } from "@/features/vayon/workflow-approval/services/governance.service";
export default function Page() {
  const data = new GovernanceService().dashboard();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <GovernanceHeader
        title="Approval Center"
        description="Human decisions for AI recommendations, drafts, and execution requests. Every decision requires policy evidence and audit history."
      />
      <GovernanceNav />
      <ApprovalList items={data.approvals} />
    </main>
  );
}
