import type { CanonicalBusinessEvent, EventCategory, TimelineObjectRef } from "../domain/contracts";
export type ProjectionType = "workspace-timeline" | "object-timeline" | "recent-events" | "category-view" | "actor-view" | "correlation-view";
export interface ProjectionDefinition { readonly id: string; readonly type: ProjectionType; readonly organizationId: string; readonly workspaceId: string; readonly object?: TimelineObjectRef; readonly category?: EventCategory; readonly actorId?: string; readonly correlationId?: string; readonly limit?: number }
export interface ProjectionCheckpoint { readonly projectionId: string; readonly partitionKey: string; readonly sequence: number; readonly status: "idle" | "building" | "ready" | "failed"; readonly updatedAt: string }
export interface ProjectionResult { readonly definition: ProjectionDefinition; readonly events: readonly CanonicalBusinessEvent[]; readonly checkpoint?: ProjectionCheckpoint; readonly status: "architecture-preview" }

