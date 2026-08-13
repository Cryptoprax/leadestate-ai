import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";
import { HubEventAdapter } from "./base.adapter";
export class GrowthHubEventAdapter extends HubEventAdapter { constructor(factory: EventFactoryPort, context: EventFactoryContext) { super(factory, context) } campaignSaved(subject: TimelineObjectRef, details: Omit<EventFactoryInput, "action" | "subject">) { return this.event("campaign-saved", subject, details) } }
