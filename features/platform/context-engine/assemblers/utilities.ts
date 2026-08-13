import type { ContextReference, ContextSectionId, ContextSlice, ContextSource } from "../domain/contracts";
export const AWAITING_CONTEXT_DATA = "Awaiting connected business data.";
export function unavailableSlice(id: ContextSectionId, title: string, source: ContextSource): ContextSlice { return Object.freeze({ id, title, source, state: "awaiting-data", items: Object.freeze([]) as readonly ContextReference[], message: AWAITING_CONTEXT_DATA }) }
export function referenceSlice(id: ContextSectionId, title: string, source: ContextSource, items?: readonly ContextReference[]): ContextSlice { return items?.length ? Object.freeze({ id, title, source, state: "available", items: Object.freeze([...items]), message: "" }) : unavailableSlice(id, title, source) }
