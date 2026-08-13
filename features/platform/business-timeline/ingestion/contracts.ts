import type { DataClassification, EventActor, EventObjectLink, EventOwner, EventPriority, EventSeverity, EventSource, EventVisibility, TimelineObjectRef } from "../domain/contracts";

export type EventSubjectKind = "lead" | "deal" | "property" | "contact" | "company" | "task" | "document" | "campaign" | "communication" | "calendar" | "note" | "attachment" | "workforce-recommendation" | "configuration";

export interface EventFactoryContext {
  readonly organizationId: string;
  readonly workspaceId: string;
  readonly partitionKey: string;
  readonly actor: EventActor;
  readonly owner: EventOwner;
  readonly source: EventSource;
}

export interface EventFactoryInput<TPayload extends Readonly<Record<string, unknown>> = Readonly<Record<string, unknown>>> {
  readonly action: string;
  readonly subject: TimelineObjectRef;
  readonly relatedObjects?: readonly EventObjectLink[];
  readonly summary: string;
  readonly payload: TPayload;
  readonly occurredAt: string;
  readonly correlationId: string;
  readonly causationId?: string;
  readonly idempotencyKey: string;
  readonly priority?: EventPriority;
  readonly severity?: EventSeverity;
  readonly visibility?: EventVisibility;
  readonly classification?: DataClassification;
  readonly retentionClass?: string;
  readonly derivedFrom?: readonly string[];
  readonly supersedesEventId?: string;
  readonly traceId?: string;
}

export interface BusinessActionMapping {
  readonly action: string;
  readonly alias: string;
  readonly eventName: string;
  readonly eventVersion: number;
  readonly envelopeVersion: number;
  readonly category: import("../domain/contracts").EventCategory;
  readonly subjectKind: EventSubjectKind;
}

export interface EventFactoryPort {
  create<TPayload extends Readonly<Record<string, unknown>>>(context: EventFactoryContext, input: EventFactoryInput<TPayload>): import("../domain/contracts").EventProposal<TPayload>;
}
