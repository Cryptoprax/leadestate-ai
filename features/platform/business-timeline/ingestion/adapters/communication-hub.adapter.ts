import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";
import { HubEventAdapter } from "./base.adapter";
export class CommunicationHubEventAdapter extends HubEventAdapter { constructor(factory: EventFactoryPort, context: EventFactoryContext) { super(factory, context) } communicationRecorded(subject: TimelineObjectRef, details: Omit<EventFactoryInput, "action" | "subject">) { return this.event("communication-recorded", subject, details) } }
