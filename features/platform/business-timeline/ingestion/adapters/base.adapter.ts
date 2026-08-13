import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";

export abstract class HubEventAdapter {
  protected constructor(protected readonly factory: EventFactoryPort, protected readonly context: EventFactoryContext) {}
  protected event(action: string, subject: TimelineObjectRef, input: Omit<EventFactoryInput, "action" | "subject">) { return this.factory.create(this.context, { ...input, action, subject }); }
}
