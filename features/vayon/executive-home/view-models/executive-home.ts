import type { ExecutiveHomeViewModel, ExecutiveSectionId, ExecutiveWidgetModel } from "../domain/contracts";
import { AWAITING_BUSINESS_DATA, StructuredNarrativeEngine } from "../services/narrative-engine";

const widgetDefinitions: readonly [ExecutiveSectionId, string, string][] = [
  ["morning-brief", "Morning Brief", "A concise opening view of the business day."],
  ["priorities", "Today's Priorities", "The most important work requiring executive attention."],
  ["opportunities", "Opportunity Center", "Emerging commercial opportunities and positive movement."],
  ["risks", "Risk Center", "Material risks, exceptions, and decisions requiring attention."],
  ["timeline", "Timeline Highlights", "Important canonical activity across the organization."],
  ["calendar", "Calendar Snapshot", "Today's meetings, visits, calls, and commitments."],
  ["workforce", "Workforce Activity", "Advisory activity from the governed digital workforce."],
  ["growth", "Growth Snapshot", "Campaign and demand-generation context."],
  ["communication", "Communication Snapshot", "Conversation load, follow-ups, and response context."],
  ["financial", "Financial Snapshot", "Revenue, cash-flow, and commercial health context."],
];

export function createAwaitingExecutiveHome(): ExecutiveHomeViewModel {
  const narrative = new StructuredNarrativeEngine().compose([{ id: "executive-narrative", title: "Executive Narrative", state: "awaiting-data" }]);
  const widgets: readonly ExecutiveWidgetModel[] = widgetDefinitions.map(([id, title, description]) => Object.freeze({ id, title, description, state: "awaiting-data", value: undefined, items: [] }));
  return Object.freeze({
    narrative,
    health: Object.freeze({ state: "awaiting-data", calculationStatus: "not-configured", explanation: AWAITING_BUSINESS_DATA }),
    widgets,
  });
}
