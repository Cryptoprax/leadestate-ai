import type { BrainContext, BrainDecision, BrainExplanation, BrainReference } from "../domain/contracts";

export function contextReferences(context: BrainContext): readonly BrainReference[] {
  return [
    ...context.objects.map(item => ({ id: `${item.type}:${item.id}`, kind: "object" as const, label: item.label, source: "universal-objects" })),
    ...context.memory.map(item => ({ id: item.id, kind: "memory" as const, label: item.scope, source: "memory-resolver" })),
    ...context.knowledge.map(item => ({ id: item.id, kind: "knowledge" as const, label: item.target.label, source: item.source })),
    ...context.events.map(item => ({ id: item.id, kind: "event" as const, label: item.type, source: item.source })),
    ...context.recommendations.map(item => ({ id: item.id, kind: "recommendation" as const, label: item.title, source: "recommendation-resolver" })),
    ...context.predictions.map(item => ({ id: item.id, kind: "prediction" as const, label: item.type, source: "prediction-resolver" })),
  ];
}
export function explainDecision(decision: BrainDecision, context: BrainContext): BrainExplanation {
  const references = contextReferences(context);
  return { why: decision.reasons.map(reason => reason.statement).join(" ") || "No decision was generated because no intelligence provider is connected.", evidence: references, dataSources: [...new Set(references.map(item => item.source))], objectsUsed: context.objects, memoryUsed: context.memory.map(item => item.id), knowledgeUsed: context.knowledge.map(item => item.id), recommendationsUsed: context.recommendations.map(item => item.id), predictionsUsed: context.predictions.map(item => item.id), limitations: ["Architecture preview only.", "No AI or ML provider is connected.", "No production decision has been generated."] };
}

