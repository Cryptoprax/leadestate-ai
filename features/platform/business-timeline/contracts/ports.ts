import type { AppendResult, CanonicalBusinessEvent, EventProposal } from "../domain/contracts";
import type { ProjectionDefinition, ProjectionResult } from "../projections/contracts";
import type { TimelineSearchQuery, TimelineSearchResult } from "../search/contracts";
import type { SubscriptionDefinition, SubscriptionReplay } from "../subscriptions/contracts";
export interface TimelineStore { append(proposal: EventProposal): AppendResult; get(eventId: string): CanonicalBusinessEvent | undefined; read(partitionKey: string, afterSequence?: number, limit?: number): readonly CanonicalBusinessEvent[]; replay(partitionKey: string, fromSequence?: number): readonly CanonicalBusinessEvent[]; all(): readonly CanonicalBusinessEvent[] }
export interface TimelineValidator { validate(proposal: EventProposal, context: TimelineValidationContext): TimelineValidationResult }
export interface TimelineValidationContext { readonly organizationId: string; readonly workspaceId: string; readonly allowedVisibilities: readonly EventProposal["visibility"][]; readonly allowedClassifications: readonly EventProposal["classification"][] }
export interface TimelineValidationResult { readonly valid: boolean; readonly errors: readonly TimelineValidationError[] }
export interface TimelineValidationError { readonly field: string; readonly code: "required" | "tenant" | "workspace" | "envelope" | "version" | "idempotency" | "visibility" | "classification" | "taxonomy"; readonly message: string }
export interface TimelineProjectionEngine { project(definition: ProjectionDefinition, events: readonly CanonicalBusinessEvent[]): ProjectionResult }
export interface TimelineSearch { search(query: TimelineSearchQuery): TimelineSearchResult }
export interface TimelineSubscriptions { subscribe(definition: SubscriptionDefinition): SubscriptionDefinition; replay(request: SubscriptionReplay): readonly CanonicalBusinessEvent[]; checkpoint(subscriptionId: string, cursor: string): void }

