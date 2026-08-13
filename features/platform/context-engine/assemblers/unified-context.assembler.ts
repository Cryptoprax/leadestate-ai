import type { ContextAssembler, ContextAssemblyRequest } from "../contracts/ports";
import type { ContextAssemblySnapshot, ContextSource, UnifiedBusinessContext } from "../domain/contracts";
import { assembleTimeline } from "./timeline.assembler";
import { assembleUniversalSummary } from "./universal-object.assembler";
import { referenceSlice } from "./utilities";

const sources: readonly ContextSource[] = ["universal-objects", "business-timeline", "relationships", "documents", "communications", "growth", "executive-home", "workforce", "intelligence"];
export class UnifiedContextAssembler implements ContextAssembler {
  assemble(request: ContextAssemblyRequest, snapshot: ContextAssemblySnapshot = {}): UnifiedBusinessContext {
    const relationships = snapshot.relationships?.map(value => Object.freeze({ id: value.id, label: value.predicate, kind: "relationship", source: "relationships" as const, objectRef: value.target }));
    const slices = Object.freeze([
      assembleUniversalSummary(snapshot.universalObject), assembleTimeline(snapshot.timelineEvents), referenceSlice("relationships", "Relationships", "relationships", relationships),
      referenceSlice("documents", "Documents", "documents", snapshot.documents), referenceSlice("communications", "Communications", "communications", snapshot.communications),
      referenceSlice("tasks", "Tasks", "universal-objects", snapshot.tasks), referenceSlice("meetings", "Meetings", "universal-objects", snapshot.meetings),
      referenceSlice("campaigns", "Campaigns", "growth", snapshot.campaigns), referenceSlice("attachments", "Attachments", "documents", snapshot.attachments),
      referenceSlice("related-objects", "Related Objects", "universal-objects", snapshot.relatedObjects), referenceSlice("workforce", "Workforce", "workforce", snapshot.workforce),
      referenceSlice("recommendations", "Recommendations", "intelligence", snapshot.recommendations), referenceSlice("business-health", "Business Health", "executive-home", snapshot.businessHealth),
    ]);
    const sourceStates = Object.freeze(Object.fromEntries(sources.map(source => [source, slices.some(slice => slice.source === source && slice.state === "available") ? "available" : "awaiting-data"])) as Record<ContextSource, "available" | "awaiting-data">);
    return Object.freeze({ target: request.target, organizationId: request.organizationId, workspaceId: request.workspaceId, state: slices.some(slice => slice.state === "available") ? "available" : "awaiting-data", slices, sourceStates });
  }
}
