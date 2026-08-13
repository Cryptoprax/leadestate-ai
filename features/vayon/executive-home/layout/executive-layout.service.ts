import type { ExecutiveSectionId } from "../domain/contracts";
import type { ExecutiveLayoutDefinition, ExecutiveLayoutEngine, ExecutiveRole } from "./contracts";
const sections: readonly ExecutiveSectionId[] = ["morning-brief", "executive-narrative", "business-health", "priorities", "opportunities", "risks", "timeline", "calendar", "workforce", "growth", "communication", "financial"];
export class LocalExecutiveLayoutEngine implements ExecutiveLayoutEngine {
  defaultFor(role: ExecutiveRole): ExecutiveLayoutDefinition { return Object.freeze({ id: `default-${role}`, name: "Executive Home", role, sections, saved: false, persistence: "unavailable" }) }
  save(layout: ExecutiveLayoutDefinition) { void layout; return { accepted: false as const, reason: "persistence-unavailable" as const } }
}
