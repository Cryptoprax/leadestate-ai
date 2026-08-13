import type { CanonicalBusinessEvent, EventCategory, EventPriority, EventSeverity, TimelineObjectRef } from "../domain/contracts";

export type WorkspaceTimelineScope =
  | { readonly kind: "workspace" }
  | { readonly kind: "department"; readonly departmentId: string }
  | { readonly kind: "user"; readonly userId: string }
  | { readonly kind: "category"; readonly category: EventCategory };

export type ObjectTimelineKind = "contact" | "company" | "property" | "lead" | "deal" | "document" | "task" | "campaign";

export interface LiveTimelineFilters {
  readonly from?: string;
  readonly to?: string;
  readonly categories?: readonly EventCategory[];
  readonly priorities?: readonly EventPriority[];
  readonly severities?: readonly EventSeverity[];
  readonly actorId?: string;
  readonly workspaceId?: string;
  readonly object?: TimelineObjectRef;
  readonly correlationId?: string;
}

export interface TimelineProjectionView {
  readonly events: readonly CanonicalBusinessEvent[];
  readonly order: "chronological";
  readonly watermark?: string;
  readonly empty: boolean;
}

export interface CorrelationNode {
  readonly event: CanonicalBusinessEvent;
  readonly depth: number;
  readonly relation: "origin" | "caused" | "correlated";
}

export interface CorrelationExploration {
  readonly correlationId: string;
  readonly nodes: readonly CorrelationNode[];
  readonly relatedObjects: readonly TimelineObjectRef[];
  readonly complete: boolean;
}

export interface JourneyStep {
  readonly stage: "origin" | "intermediate" | "current" | "outcome";
  readonly event: CanonicalBusinessEvent;
}

export interface EventInspection {
  readonly event: CanonicalBusinessEvent;
  readonly validation: { readonly status: "valid" | "invalid"; readonly messages: readonly string[] };
}

export interface ProjectionHealth {
  readonly projectionType: string;
  readonly status: "ready" | "empty" | "unavailable";
  readonly replayReady: boolean;
  readonly sequenceStatus: "current" | "gap-detected" | "not-started";
  readonly validationStatus: "valid" | "attention" | "not-evaluated";
}
