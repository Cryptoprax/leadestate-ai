import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";
import { HubEventAdapter } from "./base.adapter";
export class ConfigurationEventAdapter extends HubEventAdapter { constructor(factory: EventFactoryPort, context: EventFactoryContext) { super(factory, context) } configurationChanged(subject: TimelineObjectRef, details: Omit<EventFactoryInput, "action" | "subject">) { return this.event("configuration-changed", subject, details) } }
