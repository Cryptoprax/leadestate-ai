import { TaskList } from "@/features/vayon/operational-workforce/components/WorkforceViews";
import { WorkforceShell } from "@/features/vayon/operational-workforce/components/WorkforceShell";
import { WorkforceService } from "@/features/vayon/operational-workforce/services/workforce.service";
export default async function Page() {
  const snapshot = await (await WorkforceService.production()).snapshot();
  return (
    <WorkforceShell
      title="Workforce Task Queue"
      description="Pending, running, completed, failed, and cancelled work across the tenant-scoped operational workforce."
    >
      <div className="grid gap-6 xl:grid-cols-5">
        {["pending", "running", "completed", "failed", "cancelled"].map(
          (status) => (
            <section key={status}>
              <h2 className="mb-3 font-semibold capitalize">{status}</h2>
              <TaskList
                items={snapshot.tasks.filter((x) => x.status === status)}
              />
            </section>
          ),
        )}
      </div>
    </WorkforceShell>
  );
}
