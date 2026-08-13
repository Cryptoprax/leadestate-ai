import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";
import { HubEventAdapter } from "./base.adapter";
export class UniversalObjectsEventAdapter extends HubEventAdapter { constructor(factory: EventFactoryPort, context: EventFactoryContext) { super(factory, context) } objectCreated(action: "contact-created" | "company-created" | "note-added" | "attachment-added" | "document-uploaded", subject: TimelineObjectRef, details: Omit<EventFactoryInput, "action" | "subject">) { return this.event(action, subject, details) } }
