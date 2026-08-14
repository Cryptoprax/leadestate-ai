import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { WorkforceRepository } from "../contracts/repository";
import type { WorkforceSnapshot } from "../domain/models";
import { AuroraWorkforceRepository } from "../repositories/aurora.repository";
import { SupabaseWorkforceRepository } from "../repositories/supabase.repository";
import { DeterministicProvider } from "../providers/provider";
export class WorkforceService {
  readonly executionProvider = new DeterministicProvider();
  constructor(private repository: WorkforceRepository) {}
  static async production() {
    const c = await operationsContext();
    return new WorkforceService(
      new SupabaseWorkforceRepository(
        c.client,
        c.organizationId,
        c.workspaceId,
      ),
    );
  }
  static demo() {
    return new WorkforceService(new AuroraWorkforceRepository());
  }
  async snapshot(): Promise<WorkforceSnapshot> {
    const [employees, tasks, activity] = await Promise.all([
      this.repository.employees(),
      this.repository.tasks(),
      this.repository.activity(),
    ]);
    return {
      employees,
      tasks,
      activity,
      observability: {
        health: employees.some((x) => x.health === "degraded")
          ? "Needs attention"
          : employees.some((x) => x.health === "healthy")
            ? "Healthy"
            : "Awaiting provisioning",
        latency: "Local deterministic",
        queueLength: tasks.filter(
          (x) => x.status === "pending" || x.status === "running",
        ).length,
        failureCount: tasks.filter((x) => x.status === "failed").length,
        processingRate: "Awaiting runtime data",
      },
    };
  }
  async employee(id: string) {
    const snapshot = await this.snapshot();
    return {
      employee:
        snapshot.employees.find((x) => x.id === id || x.code === id) ?? null,
      tasks: snapshot.tasks.filter((x) => x.employeeId === id),
      activity: snapshot.activity.filter((x) =>
        snapshot.tasks.some(
          (t) => t.id === x.id.replace("activity-", "") && t.employeeId === id,
        ),
      ),
    };
  }
}
