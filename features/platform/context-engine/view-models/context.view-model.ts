import type { UnifiedBusinessContext } from "../domain/contracts";
import type { ContextTabViewModel, UnifiedContextViewModel } from "./contracts";
import { AWAITING_CONTEXT_DATA } from "../assemblers/utilities";
export const contextTabs: readonly ContextTabViewModel[] = [
  { id: "overview", label: "Overview", sections: ["summary", "tasks", "meetings", "campaigns", "workforce", "recommendations", "business-health"] },
  { id: "timeline", label: "Timeline", sections: ["timeline"] },
  { id: "relationships", label: "Relationships", sections: ["relationships", "related-objects"] },
  { id: "documents", label: "Documents", sections: ["documents"] },
  { id: "communications", label: "Communications", sections: ["communications"] },
  { id: "activities", label: "Activities", sections: ["tasks", "meetings", "campaigns"] },
  { id: "attachments", label: "Attachments", sections: ["attachments"] },
  { id: "insights", label: "Insights", sections: ["workforce", "recommendations", "business-health"] },
];
export function toContextViewModel(context: UnifiedBusinessContext): UnifiedContextViewModel { return Object.freeze({ target: context.target, title: context.target.label ?? "Business context", subtitle: `${context.target.type} · unified context`, state: context.state, tabs: contextTabs, sections: context.slices.map(slice => Object.freeze({ id: slice.id, title: slice.title, state: slice.state, message: slice.message, items: slice.items.map(item => Object.freeze({ id: item.id, label: item.label, meta: `${item.source} · ${item.kind}`, occurredAt: item.occurredAt })) })) }) }
export function createUnavailableContextViewModel(): UnifiedContextViewModel { return Object.freeze({ title: "Select a business object", subtitle: "Unified read-only context", state: "awaiting-data", tabs: contextTabs, sections: ["summary", "timeline", "relationships", "documents", "communications", "tasks", "meetings", "campaigns", "attachments", "related-objects", "workforce", "recommendations", "business-health"].map(id => Object.freeze({ id: id as import("../domain/contracts").ContextSectionId, title: title(id), state: "awaiting-data" as const, message: AWAITING_CONTEXT_DATA, items: [] })) }) }
function title(id: string) { return id.split("-").map(part => part[0]?.toUpperCase() + part.slice(1)).join(" ") }
