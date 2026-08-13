import type { CanonicalBusinessEvent, EventCategory, EventPriority, EventSeverity, TimelineObjectRef } from "../domain/contracts";
export interface TimelineTimeRange { readonly from?: string; readonly to?: string; readonly basis: "occurred" | "recorded" | "received" }
export interface TimelineSearchQuery { readonly organizationId: string; readonly workspaceId?: string; readonly timeRange?: TimelineTimeRange; readonly categories?: readonly EventCategory[]; readonly object?: TimelineObjectRef; readonly actorId?: string; readonly correlationId?: string; readonly severities?: readonly EventSeverity[]; readonly priorities?: readonly EventPriority[]; readonly cursor?: string; readonly limit?: number }
export interface TimelineSearchResult { readonly events: readonly CanonicalBusinessEvent[]; readonly nextCursor?: string; readonly indexStatus: "unavailable"; readonly watermark?: string }

