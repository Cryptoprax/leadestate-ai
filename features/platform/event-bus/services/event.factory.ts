import type { DomainEvent, DomainEventType } from "../domain/event";
export interface EventProposal {
  readonly eventType: DomainEventType;
  readonly sourceModule: string;
  readonly workspaceId: string;
  readonly organizationId: string;
  readonly correlationId: string;
  readonly actorId?: string;
  readonly payloadMetadata?: DomainEvent["payloadMetadata"];
  readonly evidenceReference?: string;
  readonly severity?: DomainEvent["severity"];
  readonly visibility?: DomainEvent["visibility"];
}
export function createDomainEvent(
  proposal: EventProposal,
  id: string,
  timestamp: string,
): DomainEvent {
  if (
    !proposal.organizationId ||
    !proposal.workspaceId ||
    !proposal.correlationId
  )
    throw new Error(
      "Organization, workspace, and correlation IDs are required.",
    );
  return Object.freeze({
    eventId: id,
    eventType: proposal.eventType,
    sourceModule: proposal.sourceModule,
    workspaceId: proposal.workspaceId,
    organizationId: proposal.organizationId,
    correlationId: proposal.correlationId,
    actorId: proposal.actorId,
    timestamp,
    payloadMetadata: Object.freeze({ ...proposal.payloadMetadata }),
    evidenceReference: proposal.evidenceReference,
    severity: proposal.severity ?? "info",
    visibility: proposal.visibility ?? "workspace",
  });
}
