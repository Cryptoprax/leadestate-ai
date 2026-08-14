import "server-only";
import type {
  AIContext,
  AIRecommendation,
  AISummary,
} from "@/features/vayon/operational-workforce/providers/provider";
import { DeterministicProvider } from "@/features/vayon/operational-workforce/providers/provider";
import type { OpenAIRepositoryContract } from "../contracts/repository";
import type {
  AIEmployeeCode,
  OpenAIRequest,
  ProviderAssignment,
} from "../domain/models";
import { OpenAIProvider } from "../providers/openai.provider";
import { OpenAIRepository } from "../repositories/openai.repository";

export const liveWorkforceCapabilities = [
  "Conversation summary",
  "Email summary",
  "WhatsApp summary",
  "Meeting summary",
  "Document summary",
  "Suggested reply",
  "Suggested follow-up",
  "Deal insights",
  "CRM insights",
  "Lead qualification",
  "Property recommendations",
  "Meeting agenda",
  "Negotiation suggestions",
  "Risk analysis",
  "Executive summaries",
  "Task generation",
] as const;
export const openAIEventTypes = [
  "ai.requested",
  "ai.completed",
  "ai.failed",
  "ai.provider.connected",
  "ai.provider.disconnected",
] as const;
export const openAINotifications = [
  "Provider failures",
  "Quota warnings",
  "Budget warnings",
  "Approval-required AI actions",
] as const;
export const openAIWorkflow = {
  recommendationOnly: true,
  executionAllowed: false,
  approvalRequired: true,
} as const;

export class OpenAIWorkforceService {
  constructor(
    private repository: OpenAIRepositoryContract = new OpenAIRepository(),
    private openai = new OpenAIProvider(),
    private deterministic = new DeterministicProvider(),
  ) {}

  health() { return this.openai.health(); }
  telemetry() { return this.repository.telemetry(); }
  assignments() { return this.repository.assignments(); }
  capabilities() { return this.openai.capabilities(); }

  async summarize(employee: AIEmployeeCode, context: AIContext): Promise<{
    result: AISummary;
    provider: "openai" | "deterministic";
    fallback: boolean;
  }> {
    const assignment = await this.assignment(employee);
    if (assignment.provider !== "openai")
      return {
        result: await this.deterministic.summarize(context),
        provider: "deterministic",
        fallback: false,
      };
    try {
      const response = await this.openai.summarize(
        this.request(employee, context, "Summarize the supplied business context for human review."),
      );
      return {
        result: { text: response.output, source: "openai", confidence: 1 },
        provider: "openai",
        fallback: false,
      };
    } catch (reason) {
      await this.failure(employee, assignment, reason);
      return {
        result: await this.deterministic.summarize(context),
        provider: "deterministic",
        fallback: true,
      };
    }
  }

  async recommend(employee: AIEmployeeCode, context: AIContext): Promise<{
    result: AIRecommendation;
    provider: "openai" | "deterministic";
    fallback: boolean;
  }> {
    const assignment = await this.assignment(employee);
    if (assignment.provider !== "openai")
      return {
        result: await this.deterministic.recommend(context),
        provider: "deterministic",
        fallback: false,
      };
    try {
      const response = await this.openai.recommend(
        this.request(employee, context, "Produce one recommendation only. It must require human review and must not execute."),
      );
      return {
        result: {
          title: response.output.title,
          rationale: response.output.rationale,
          action: "review",
          executable: false,
          confidence: 1,
        },
        provider: "openai",
        fallback: false,
      };
    } catch (reason) {
      await this.failure(employee, assignment, reason);
      return {
        result: await this.deterministic.recommend(context),
        provider: "deterministic",
        fallback: true,
      };
    }
  }

  async capability(
    employee: AIEmployeeCode,
    capability: (typeof liveWorkforceCapabilities)[number],
    context: AIContext,
  ) {
    const assignment = await this.assignment(employee);
    if (assignment.provider !== "openai")
      return {
        provider: "deterministic" as const,
        fallback: false,
        output: (await this.deterministic.summarize(context)).text,
        recommendationOnly: true as const,
        executionAllowed: false as const,
      };
    try {
      const response = await this.openai.responses(
        this.request(employee, context, `${capability}. Use only supplied facts, state uncertainty, and return advisory text only.`),
      );
      return {
        provider: "openai" as const,
        fallback: false,
        output: response.output,
        recommendationOnly: true as const,
        executionAllowed: false as const,
        usage: response.usage,
        cost: response.cost,
      };
    } catch (reason) {
      await this.failure(employee, assignment, reason);
      return {
        provider: "deterministic" as const,
        fallback: true,
        output: (await this.deterministic.summarize(context)).text,
        recommendationOnly: true as const,
        executionAllowed: false as const,
      };
    }
  }

  private async assignment(employee: AIEmployeeCode): Promise<ProviderAssignment> {
    return (await this.repository.assignments()).find((item) => item.employee === employee) ?? {
      employee,
      provider: "openai",
      model: process.env.OPENAI_MODEL ?? "gpt-5",
      source: "default",
    };
  }

  private request(employee: AIEmployeeCode, context: AIContext, instruction: string): OpenAIRequest {
    return {
      employee,
      workspaceId: context.workspaceId,
      model: process.env.OPENAI_MODEL ?? "gpt-5",
      system: "You are a governed VAYON AI employee. Never execute actions. Never invent business facts. Every action is a recommendation requiring approval.",
      prompt: `${instruction}\n\nApproved workspace facts:\n${JSON.stringify(context.facts)}`,
    };
  }

  private async failure(employee: AIEmployeeCode, assignment: ProviderAssignment, reason: unknown) {
    await this.repository.recordFailure({
      employee,
      model: assignment.model ?? "unavailable",
      latencyMs: 0,
      code: reason instanceof Error ? reason.name : "provider_error",
    });
  }
}
