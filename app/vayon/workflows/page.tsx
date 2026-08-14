import { WorkflowDesigner } from "@/features/platform/workflows/components/WorkflowDesigner";
import {
  GovernanceNav,
  WorkflowList,
} from "@/features/vayon/workflow-approval/components/GovernanceViews";
import { GovernanceService } from "@/features/vayon/workflow-approval/services/governance.service";
export default function Page() {
  const governance = new GovernanceService().dashboard();
  return (
    <main className="mx-auto max-w-[110rem] px-4 py-8 sm:px-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
          Vayon OS · Release 2.7
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Workflow Automation Engine
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-vds-muted">
          Design, validate, and inspect deterministic workflow plans. This
          foundation cannot execute production automations.
        </p>
      </header>
      <GovernanceNav />
      <section className="mb-8">
        <h2 className="mb-3 font-semibold">Governed workflow definitions</h2>
        <WorkflowList items={governance.workflows} />
      </section>
      <WorkflowDesigner />
    </main>
  );
}
