import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { WorkforceRuntimeService } from "@/features/platform/openai/runtime/service";
import type { AIEmployeeCode } from "@/features/platform/openai/domain/models";
import { GmailPlatformService } from "@/features/platform/gmail/services/gmail-platform.service";
import { GoogleCalendarPlatformService, calendarWorkflowGovernance } from "@/features/platform/google-calendar/services/google-calendar.service";
import type { CollaborationRepositoryContract } from "../contracts/repository";
import { SupabaseCollaborationRepository } from "../repositories/supabase-collaboration.repository";
import type { CollaborationRequest, CollaborationScenario } from "../types";

const scenarioAgents: Record<
  Exclude<CollaborationScenario, "custom">,
  readonly AIEmployeeCode[]
> = {
  "lead-created": [
    "sales-ai",
    "crm-ai",
    "marketing-ai",
    "whatsapp-ai",
    "executive-ai",
  ],
  "deal-at-risk": ["crm-ai", "sales-ai", "whatsapp-ai", "executive-ai"],
  "new-customer": ["crm-ai", "marketing-ai", "sales-ai", "executive-ai"],
};
const validAgents = new Set<AIEmployeeCode>([
  "sales-ai",
  "crm-ai",
  "marketing-ai",
  "whatsapp-ai",
  "voice-ai",
  "operations-ai",
  "finance-ai",
  "executive-ai",
]);
export class AICollaborationService {
  constructor(
    private repository: CollaborationRepositoryContract,
    private runtime: WorkforceRuntimeService,
  ) {}
  static async production() {
    const c = await operationsContext();
    return new AICollaborationService(
      new SupabaseCollaborationRepository(
        c.client,
        c.organizationId,
        c.workspaceId,
      ),
      await WorkforceRuntimeService.production(),
    );
  }
  memory() {
    return this.repository.memory();
  }
  dashboard() {
    return this.repository.dashboard();
  }
  async collaborate(input: CollaborationRequest) {
    if (!validAgents.has(input.requestedBy))
      throw new Error("Unsupported requesting employee.");
    const agents =
      input.agents?.filter((a) => validAgents.has(a)) ??
      (input.scenario === "custom"
        ? [input.requestedBy]
        : scenarioAgents[input.scenario]);
    if (!agents.length || agents.length > 8)
      throw new Error(
        "A collaboration requires between one and eight configured employees.",
      );
    const runId = await this.repository.createRun(input),
      [memory, gmail, calendar] = await Promise.all([this.repository.memory(), new GmailPlatformService().health(), new GoogleCalendarPlatformService().health()]);
    let prior = "No prior recommendation.";
    try {
      for (const agent of agents) {
        await this.repository.addEvent({
          runId,
          agent,
          summary: `${input.requestedBy} requested ${agent} recommendation.`,
        });
        let output = "",
          completion: {
            usage?: { promptTokens: number; completionTokens?: number };
            cost?: { totalUsd: number };
            model?: string;
            latencyMs?: number;
          } | null = null;
        const prompt = `Collaboration scenario: ${input.scenario}. Objective: ${input.objective}. Provide one evidence-backed recommendation for the next employee. This is recommendation-only and requires approval. Prior recommendation: ${prior}\n\nConnected platform health: ${JSON.stringify({gmail:gmail.connection,calendar:calendar.connection,calendarGovernance:calendarWorkflowGovernance})}\n\nTenant-scoped shared enterprise memory:\n${JSON.stringify(memory)}`;
        for await (const event of this.runtime.chat({
          employee: agent,
          message: prompt,
        })) {
          if (event.type === "delta") output += event.value;
          else if (event.type === "complete") completion = event;
        }
        prior = output.slice(0, 4000);
        await this.repository.addRecommendation({
          runId,
          employee: agent,
          requestedRecommendation: input.objective,
          provider: "openai",
          confidence: null,
          approvalStatus: "pending",
          relatedCustomer: input.relatedCustomerId ?? null,
          promptTokens: completion?.usage?.promptTokens ?? 0,
          completionTokens:
            completion?.usage?.completionTokens ?? Math.ceil(output.length / 4),
          latencyMs: completion?.latencyMs ?? null,
          estimatedCost: completion?.cost?.totalUsd ?? 0,
          model: completion?.model ?? null,
        });
        await this.repository.addEvent({
          runId,
          agent,
          summary: `${agent} returned governed intelligence for ${input.scenario}.`,
        });
      }
      await this.repository.completeRun(runId, "completed");
      return {
        runId,
        status: "completed" as const,
        recommendationOnly: true as const,
        approvalRequired: true as const,
      };
    } catch (error) {
      await this.repository.completeRun(runId, "error").catch(() => undefined);
      throw error;
    }
  }
}
