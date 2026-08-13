import type { EventProposal } from "../domain/contracts";
import type { EventFactoryContext, EventFactoryInput, EventFactoryPort } from "./contracts";
import { BusinessEventMappingRegistry } from "./event-mapping.registry";

export class CanonicalEventFactory implements EventFactoryPort {
  constructor(private readonly mappings: BusinessEventMappingRegistry = new BusinessEventMappingRegistry()) {}
  create<TPayload extends Readonly<Record<string, unknown>>>(context: EventFactoryContext, input: EventFactoryInput<TPayload>): EventProposal<TPayload> {
    const mapping = this.mappings.resolve(input.action);
    if (!mapping) throw new Error(`Business action is not registered: ${input.action}`);
    if (mapping.subjectKind !== input.subject.objectType) throw new Error(`Action ${input.action} requires a ${mapping.subjectKind} subject.`);
    return immutable({
      eventName: mapping.eventName, eventVersion: mapping.eventVersion, envelopeVersion: mapping.envelopeVersion,
      organizationId: context.organizationId, workspaceId: context.workspaceId, partitionKey: context.partitionKey,
      subject: input.subject, relatedObjects: input.relatedObjects ?? [], actor: context.actor, owner: context.owner, source: context.source,
      occurredAt: input.occurredAt, correlationId: input.correlationId, causationId: input.causationId, idempotencyKey: input.idempotencyKey,
      category: mapping.category, priority: input.priority ?? "normal", severity: input.severity ?? "informational", visibility: input.visibility ?? "normal",
      summary: input.summary, payload: input.payload, classification: input.classification ?? "internal", retentionClass: input.retentionClass ?? "standard-business",
      derivedFrom: input.derivedFrom ?? [], supersedesEventId: input.supersedesEventId, traceId: input.traceId,
    });
  }
}

function immutable<T>(value: T): T { if (value && typeof value === "object" && !Object.isFrozen(value)) { Object.getOwnPropertyNames(value).forEach(key => immutable((value as Record<string, unknown>)[key])); Object.freeze(value) } return value }
