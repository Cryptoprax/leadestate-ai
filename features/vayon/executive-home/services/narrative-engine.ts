import type { ExecutiveNarrativeBlock, NarrativeSourceBlock } from "../domain/contracts";

export const AWAITING_BUSINESS_DATA = "Awaiting connected business data.";

export class StructuredNarrativeEngine {
  compose(sources: readonly NarrativeSourceBlock[]): readonly ExecutiveNarrativeBlock[] {
    return sources.map(source => Object.freeze({
      id: source.id,
      title: source.title,
      body: source.state === "available" && source.content ? source.content : AWAITING_BUSINESS_DATA,
      sourceLabel: source.sourceLabel,
      state: source.state === "available" && source.content ? "available" : "awaiting-data",
      generatedBy: "structured-rules" as const,
    }));
  }
}
