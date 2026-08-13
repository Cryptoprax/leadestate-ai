import type { CanonicalBusinessEvent, TimelineObjectRef } from "@/features/platform/business-timeline/domain/contracts";
import type { UniversalObject, UniversalObjectRef, UniversalRelationship } from "@/features/platform/universal-objects/domain/models";

export type SupportedContextObjectType = "contact" | "company" | "lead" | "deal" | "property" | "campaign" | "task" | "document" | "meeting" | "communication" | "calendar-event" | "universal-object";
export type ContextSource = "universal-objects" | "business-timeline" | "relationships" | "documents" | "communications" | "growth" | "executive-home" | "workforce" | "intelligence";
export type ContextSectionId = "summary" | "timeline" | "relationships" | "documents" | "communications" | "tasks" | "meetings" | "campaigns" | "attachments" | "related-objects" | "workforce" | "recommendations" | "business-health";
export type ContextTabId = "overview" | "timeline" | "relationships" | "documents" | "communications" | "activities" | "attachments" | "insights";
export type ContextAvailability = "available" | "awaiting-data" | "unavailable";

export interface ContextObjectIdentity { readonly id: string; readonly type: SupportedContextObjectType; readonly label?: string; readonly universalRef?: UniversalObjectRef; readonly timelineRef?: TimelineObjectRef }
export interface ContextReference { readonly id: string; readonly label: string; readonly kind: string; readonly source: ContextSource; readonly occurredAt?: string; readonly objectRef?: UniversalObjectRef; readonly eventId?: string }
export interface ContextSlice<T = ContextReference> { readonly id: ContextSectionId; readonly title: string; readonly source: ContextSource; readonly state: ContextAvailability; readonly items: readonly T[]; readonly message: string }

export interface ContextAssemblySnapshot {
  readonly universalObject?: UniversalObject;
  readonly timelineEvents?: readonly CanonicalBusinessEvent[];
  readonly relationships?: readonly UniversalRelationship[];
  readonly documents?: readonly ContextReference[];
  readonly communications?: readonly ContextReference[];
  readonly tasks?: readonly ContextReference[];
  readonly meetings?: readonly ContextReference[];
  readonly campaigns?: readonly ContextReference[];
  readonly attachments?: readonly ContextReference[];
  readonly relatedObjects?: readonly ContextReference[];
  readonly workforce?: readonly ContextReference[];
  readonly recommendations?: readonly ContextReference[];
  readonly businessHealth?: readonly ContextReference[];
}

export interface UnifiedBusinessContext {
  readonly target: ContextObjectIdentity;
  readonly organizationId: string;
  readonly workspaceId: string;
  readonly assembledAt?: string;
  readonly state: ContextAvailability;
  readonly slices: readonly ContextSlice[];
  readonly sourceStates: Readonly<Record<ContextSource, ContextAvailability>>;
}
