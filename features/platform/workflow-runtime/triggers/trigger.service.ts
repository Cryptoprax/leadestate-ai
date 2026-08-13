import type { ExecutionContext, RuntimePlan } from "../domain/contracts";
import type { WorkflowRuntimeEngine } from "../services/runtime-engine";
import type {
  FutureEventTrigger,
  ManualTrigger,
  ScheduledTrigger,
  TriggerResolver,
} from "./contracts";

type RuntimeTrigger = ManualTrigger | ScheduledTrigger | FutureEventTrigger;

export class LocalTriggerResolver implements TriggerResolver {
  async resolve(trigger: RuntimeTrigger) {
    if (trigger.type === "manual") return true;
    if (trigger.type === "schedule")
      return new Date(trigger.dueAt).getTime() <= Date.now();
    return false;
  }
}

export class WorkflowTriggerService {
  constructor(
    private readonly runtime: WorkflowRuntimeEngine,
    private readonly resolver: TriggerResolver = new LocalTriggerResolver(),
  ) {}

  async activate(
    trigger: RuntimeTrigger,
    plan: RuntimePlan,
    context: ExecutionContext,
  ) {
    if (!(await this.resolver.resolve(trigger, plan, context))) return undefined;
    return this.runtime.queue(plan, context);
  }
}
