import type { BusinessActionMapping } from "./contracts";

const mappings = [
  ["lead-created", "lead.created", "sales.lead.created", "sales", "lead"],
  ["deal-won", "deal.closed", "sales.deal.closed", "sales", "deal"],
  ["property-published", "property.published", "sales.property.published", "sales", "property"],
  ["contact-created", "contact.created", "customer.contact.created", "customer", "contact"],
  ["company-created", "company.created", "customer.company.created", "customer", "company"],
  ["task-completed", "task.completed", "operations.task.completed", "operations", "task"],
  ["document-uploaded", "document.uploaded", "documents.document.uploaded", "documents", "document"],
  ["campaign-saved", "campaign.saved", "growth.campaign.saved", "growth", "campaign"],
  ["communication-recorded", "communication.recorded", "communication.message.recorded", "communication", "communication"],
  ["meeting-scheduled", "meeting.scheduled", "operations.meeting.scheduled", "operations", "calendar"],
  ["note-added", "note.added", "customer.note.added", "customer", "note"],
  ["attachment-added", "attachment.added", "documents.attachment.added", "documents", "attachment"],
  ["workforce-recommendation-created", "workforce-recommendation.created", "workforce.recommendation.created", "workforce", "workforce-recommendation"],
  ["configuration-changed", "configuration.changed", "platform.configuration.changed", "platform", "configuration"],
] as const;

export class BusinessEventMappingRegistry {
  private readonly values: readonly BusinessActionMapping[] = mappings.map(([action, alias, eventName, category, subjectKind]) => Object.freeze({ action, alias, eventName, category, subjectKind, eventVersion: 1, envelopeVersion: 1 }));
  resolve(actionOrAlias: string) { return this.values.find(value => value.action === actionOrAlias || value.alias === actionOrAlias); }
  all() { return this.values; }
}
