import "server-only";
import type { WorkforceRuntimeObservability } from "@/features/platform/openai/runtime/models";
import { WorkforceRuntimeService } from "@/features/platform/openai/runtime/service";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { WorkforceRepository } from "../contracts/repository";
import type { WorkforceSnapshot } from "../domain/models";
import { AuroraWorkforceRepository } from "../repositories/aurora.repository";
import { SupabaseWorkforceRepository } from "../repositories/supabase.repository";
import { DeterministicProvider } from "../providers/provider";
export class WorkforceService {
  readonly executionProvider = new DeterministicProvider();
  constructor(private repository: WorkforceRepository, private runtime?: Pick<WorkforceRuntimeService, "observability">) {}
  static async production() {
    const [c, runtime] = await Promise.all([operationsContext(), WorkforceRuntimeService.production()]);
    return new WorkforceService(
      new SupabaseWorkforceRepository(
        c.client,
        c.organizationId,
        c.workspaceId,
      ),
      runtime,
    );
  }
  static demo() {
    return new WorkforceService(new AuroraWorkforceRepository());
  }
  async snapshot(): Promise<WorkforceSnapshot> {
    const [storedEmployees, tasks, activity, runtime] = await Promise.all([
      this.repository.employees(),
      this.repository.tasks(),
      this.repository.activity(),
      this.runtime?.observability() ?? Promise.resolve(this.fallbackObservability()),
    ]);
    const employees = storedEmployees.map((employee) => {
      const processing = tasks.some((task) => task.employeeId === employee.id && task.status === "running");
      const status = runtime.health.state === "healthy" ? (processing ? "processing" as const : "online" as const) : runtime.health.state === "degraded" ? "error" as const : "offline" as const;
      return { ...employee, status, health: runtime.health.state, currentQueue: tasks.filter((task) => task.employeeId === employee.id && (task.status === "pending" || task.status === "running")).length };
    });
    return {
      employees,
      tasks,
      activity,
      runtimeHealth: runtime.health,
      observability: {
        health: runtime.health.state,
        provider: runtime.provider,
        model: runtime.model ?? "Unavailable",
        version: runtime.health.version,
        latency: runtime.latencyMs === null ? "Unavailable" : `${runtime.latencyMs} ms`,
        queueLength: tasks.filter(
          (x) => x.status === "pending" || x.status === "running",
        ).length,
        estimatedCost: `$${runtime.estimatedCost.toFixed(6)}`,
        lastResponse: runtime.lastResponse ?? "No responses recorded",
        failureCount: tasks.filter((x) => x.status === "failed").length,
      },
    };
  }
  private fallbackObservability(): WorkforceRuntimeObservability {
    return { provider: "deterministic", model: null, latencyMs: null, estimatedCost: 0, lastResponse: null, health: { state: "unavailable", connected: false, model: "deterministic", latencyMs: null, quota: "unknown", version: this.executionProvider.version, diagnostic: "provider_exception", reason: "Runtime unavailable" } };
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
