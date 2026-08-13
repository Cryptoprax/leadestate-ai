import type { ExecutionContext, RuntimePlan } from "../domain/contracts";
export interface ManualTrigger {
  readonly type: "manual";
  readonly requestedBy: string;
  readonly requestedAt: string;
}
export interface ScheduledTrigger {
  readonly type: "schedule";
  readonly scheduleId: string;
  readonly dueAt: string;
  readonly timezone: string;
}
export interface FutureEventTrigger {
  readonly type: "event";
  readonly eventName: string;
  readonly eventVersion: number;
  readonly enabled: false;
}
export interface TriggerResolver {
  resolve(
    trigger: ManualTrigger | ScheduledTrigger | FutureEventTrigger,
    plan: RuntimePlan,
    context: ExecutionContext,
  ): Promise<boolean>;
}
