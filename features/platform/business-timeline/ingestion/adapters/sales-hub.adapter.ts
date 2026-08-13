import type { TimelineObjectRef } from "../../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "../contracts";
import { HubEventAdapter } from "./base.adapter";
type Details = Omit<EventFactoryInput, "action" | "subject">;
export class SalesHubEventAdapter extends HubEventAdapter {
  constructor(factory: EventFactoryPort, context: EventFactoryContext) { super(factory, context) }
  leadCreated(subject: TimelineObjectRef, details: Details) { return this.event("lead-created", subject, details) }
  dealWon(subject: TimelineObjectRef, details: Details) { return this.event("deal-won", subject, details) }
  propertyPublished(subject: TimelineObjectRef, details: Details) { return this.event("property-published", subject, details) }
  contactCreated(subject: TimelineObjectRef, details: Details) { return this.event("contact-created", subject, details) }
  companyCreated(subject: TimelineObjectRef, details: Details) { return this.event("company-created", subject, details) }
  taskCompleted(subject: TimelineObjectRef, details: Details) { return this.event("task-completed", subject, details) }
  documentUploaded(subject: TimelineObjectRef, details: Details) { return this.event("document-uploaded", subject, details) }
  meetingScheduled(subject: TimelineObjectRef, details: Details) { return this.event("meeting-scheduled", subject, details) }
  noteAdded(subject: TimelineObjectRef, details: Details) { return this.event("note-added", subject, details) }
  attachmentAdded(subject: TimelineObjectRef, details: Details) { return this.event("attachment-added", subject, details) }
}
