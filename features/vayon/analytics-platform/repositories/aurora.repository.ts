import "server-only";
import { auroraBusinessActivity } from "@/features/vayon/demo-workspace/business-activity/activity.service";
import { auroraProperties } from "@/features/vayon/demo-workspace/property-portfolio/properties";
import {
  auroraDeals,
  auroraLeads,
  auroraMeetings,
  auroraTasks,
} from "@/features/vayon/demo-workspace/sales-operations/records";
import { auroraEmployees } from "@/features/vayon/demo-workspace/people/employees";
import type { AnalyticsRepository } from "../contracts/repository";
export class AuroraAnalyticsRepository implements AnalyticsRepository {
  readonly provider = "aurora" as const;
  async load() {
    return {
      leads: auroraLeads,
      deals: auroraDeals.map((x, index) => ({
        ...x,
        value: 10000000 + (index % 12) * 2500000,
        probability: (index % 10) * 10,
      })),
      properties: auroraProperties,
      meetings: auroraMeetings,
      visits: auroraMeetings.filter((x) => x.kind === "property-visit"),
      tasks: auroraTasks,
      communications: auroraBusinessActivity.communications,
      workflows: auroraDeals.map((x) => ({
        id: `workflow-${x.id}`,
        status: x.stage === "closed-won" ? "approved" : "pending",
      })),
      providers: auroraEmployees.map((x) => ({
        id: x.id,
        status: "configured",
        provider: "deterministic",
      })),
      errors: {},
    };
  }
}
