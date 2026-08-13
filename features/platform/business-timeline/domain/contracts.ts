import type { UniversalObjectRef } from "@/features/platform/universal-objects/domain/models";
export type EventCategory = "sales" | "growth" | "communication" | "operations" | "finance" | "documents" | "governance" | "customer" | "integration" | "workforce" | "intelligence" | "platform" | "audit";
export type EventPriority = "low" | "normal" | "high" | "urgent";
export type EventSeverity = "informational" | "success" | "warning" | "error" | "critical";
export type EventVisibility = "normal" | "restricted" | "confidential" | "system-only";
export type DataClassification = "public" | "internal" | "confidential" | "restricted" | "regulated";
export type EventSourceKind = "user-action" | "domain-service" | "workflow" | "integration" | "import" | "workforce" | "intelligence" | "system" | "offline-client";
export type EventActorKind = "user" | "service-account" | "integration" | "workforce-employee" | "system" | "anonymous-external" | "unknown-external";
export type ObjectRole = "subject" | "actor" | "recipient" | "account" | "property" | "lead" | "deal" | "campaign" | "document" | "invoice" | "task" | "meeting" | "parent" | "affected" | string;
export type EventRelationshipType = "caused" | "correlated" | "supersedes" | "corrects" | "reverses" | "derived-from" | "approves" | "rejects" | "fulfills" | "retries" | "replays" | "duplicates";
export interface TimelineObjectRef { readonly objectId: string; readonly objectType: UniversalObjectRef["type"] | string; readonly objectVersion?: number; readonly displayHint?: string }
export interface EventObjectLink { readonly object: TimelineObjectRef; readonly role: ObjectRole }
export interface EventActor { readonly id: string; readonly kind: EventActorKind; readonly displayHint?: string }
export interface EventOwner { readonly id: string; readonly kind: "user" | "team" | "workspace" | "organization" }
export interface EventSource { readonly kind: EventSourceKind; readonly producerId: string; readonly module: string; readonly producerVersion: string; readonly connectionId?: string; readonly externalEventId?: string; readonly trust: "unverified" | "verified" | "system" }
export interface EventIntegrity { readonly algorithm: "sha256" | "signature-placeholder"; readonly digest: string; readonly signature?: string }
export interface CanonicalBusinessEvent<TPayload extends Readonly<Record<string, unknown>> = Readonly<Record<string, unknown>>> {
  readonly eventId: string; readonly eventName: string; readonly eventVersion: number; readonly envelopeVersion: number;
  readonly organizationId: string; readonly workspaceId: string; readonly partitionKey: string;
  readonly subject: TimelineObjectRef; readonly relatedObjects: readonly EventObjectLink[];
  readonly actor: EventActor; readonly owner: EventOwner; readonly source: EventSource;
  readonly occurredAt: string; readonly recordedAt: string; readonly receivedAt?: string; readonly sequence: number;
  readonly correlationId: string; readonly causationId?: string; readonly idempotencyKey: string;
  readonly category: EventCategory; readonly priority: EventPriority; readonly severity: EventSeverity; readonly visibility: EventVisibility;
  readonly summary: string; readonly payload: TPayload; readonly classification: DataClassification; readonly retentionClass: string;
  readonly derivedFrom: readonly string[]; readonly supersedesEventId?: string; readonly traceId?: string; readonly integrity?: EventIntegrity;
}
export interface EventRelation { readonly sourceEventId: string; readonly targetEventId: string; readonly type: EventRelationshipType }
export interface EventSchemaDefinition { readonly eventName: string; readonly eventVersion: number; readonly envelopeVersion: number; readonly category: EventCategory; readonly requiredPayloadFields: readonly string[]; readonly active: boolean }
export interface EventProposal<TPayload extends Readonly<Record<string, unknown>> = Readonly<Record<string, unknown>>> extends Omit<CanonicalBusinessEvent<TPayload>, "eventId" | "recordedAt" | "sequence"> { readonly eventId?: string; readonly recordedAt?: string; readonly sequence?: number }
export interface AppendResult { readonly event: CanonicalBusinessEvent; readonly duplicate: boolean }

