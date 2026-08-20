import type { WorkforceRepository } from "../contracts/repository";
import type { WorkforceActivity, WorkforceTask } from "../domain/models";
import { configuredEmployee, definitions } from "./workforce-data";
const tasks: readonly WorkforceTask[] = definitions
  .slice(0, 5)
  .map((def, index) => ({
    id: `aurora-ai-task-${index + 1}`,
    employeeId: def[0],
    type: (
      [
        "Lead Qualification",
        "Customer Summary",
        "WhatsApp Follow-up",
        "Meeting Scheduling",
        "Campaign Suggestion",
      ] as const
    )[index],
    title: `Aurora ${def[2]} review`,
    status: index < 3 ? "completed" : "pending",
    priority: index === 0 ? "high" : "normal",
    owner: "Aurora Realty Group",
    createdAt: `2026-08-14T0${index + 3}:00:00+05:30`,
    completedAt: index < 3 ? `2026-08-14T0${index + 4}:00:00+05:30` : undefined,
    duration: index < 3 ? `${8 + index} min` : undefined,
  }));
export class AuroraWorkforceRepository implements WorkforceRepository {
  readonly provider = "aurora" as const;
  async employees() {
    return definitions.map((def, index) => ({
      ...configuredEmployee(def),
      status:
        index < 3
          ? ("online" as const)
          : index < 6
            ? ("idle" as const)
            : ("offline" as const),
      health: index < 6 ? ("healthy" as const) : ("unavailable" as const),
      currentQueue: tasks.filter(
        (task) => task.employeeId === def[0] && task.status === "pending",
      ).length,
      recentActivity: this.activityFor(def[0]),
    }));
  }
  async tasks() {
    return tasks;
  }
  async activity() {
    return tasks
      .filter((x) => x.status === "completed")
      .map((x) => ({
        id: `activity-${x.id}`,
        title: x.type,
        detail: x.title,
        occurredAt: x.completedAt!,
      }));
  }
  private activityFor(id: string): readonly WorkforceActivity[] {
    return tasks
      .filter((x) => x.employeeId === id && x.status === "completed")
      .map((x) => ({
        id: `activity-${x.id}`,
        title: x.type,
        detail: x.title,
        occurredAt: x.completedAt!,
      }));
  }
}
