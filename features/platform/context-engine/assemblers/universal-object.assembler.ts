import type { UniversalObject } from "@/features/platform/universal-objects/domain/models";
import type { ContextReference, ContextSlice } from "../domain/contracts";
import { unavailableSlice } from "./utilities";
export function assembleUniversalSummary(value?: UniversalObject): ContextSlice { if (!value) return unavailableSlice("summary", "Summary", "universal-objects"); const item: ContextReference = Object.freeze({ id: value.id, label: value.displayName, kind: value.type, source: "universal-objects", objectRef: { id: value.id, type: value.type, label: value.displayName } }); return Object.freeze({ id: "summary", title: "Summary", source: "universal-objects", state: "available", items: [item], message: "" }) }
