import type { WorkforceTask } from "../domain/models";

export type AITask = WorkforceTask;
export interface AIContext {
  readonly organizationId: string;
  readonly workspaceId: string;
  readonly subjectType?: string;
  readonly subjectId?: string;
  readonly facts: Readonly<Record<string, string | number | boolean | null>>;
}
export interface AITaskResult {
  readonly taskId: string;
  readonly status: "completed";
  readonly summary: string;
  readonly providerId: string;
}
export interface AISummary {
  readonly text: string;
  readonly source: "deterministic-rules" | "openai";
  readonly confidence: number;
}
export interface AIRecommendation {
  readonly title: string;
  readonly rationale: string;
  readonly action: "review";
  readonly executable: false;
  readonly confidence: number;
}
export interface AIHealth {
  readonly status: "healthy" | "degraded" | "unavailable";
  readonly latencyMs: number;
  readonly checkedAt: string;
}

export interface AIProvider {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  execute(task: AITask): Promise<AITaskResult>;
  summarize(context: AIContext): Promise<AISummary>;
  recommend(context: AIContext): Promise<AIRecommendation>;
  health(): Promise<AIHealth>;
}

export class DeterministicProvider implements AIProvider {
  readonly id = "deterministic";
  readonly name = "Vayon Deterministic Rules";
  readonly version = "1.0.0";
  async execute(task: AITask): Promise<AITaskResult> {
    return {
      taskId: task.id,
      status: "completed",
      summary: `${task.type} evaluated through deterministic workforce rules. No external provider was called.`,
      providerId: this.id,
    };
  }
  async summarize(context: AIContext): Promise<AISummary> {
    const count = Object.keys(context.facts).length;
    return {
      text: count
        ? `Deterministic summary assembled from ${count} supplied context facts.`
        : "No supplied context facts are available to summarize.",
      source: "deterministic-rules",
      confidence: count ? 1 : 0,
    };
  }
  async recommend(context: AIContext): Promise<AIRecommendation> {
    const ready = Object.keys(context.facts).length > 0;
    return {
      title: ready
        ? "Review supplied business context"
        : "Connect business context",
      rationale: ready
        ? "A human should review the supplied deterministic facts before taking action."
        : "No recommendation can be derived until approved business context is supplied.",
      action: "review",
      executable: false,
      confidence: ready ? 1 : 0,
    };
  }
  async health(): Promise<AIHealth> {
    return {
      status: "healthy",
      latencyMs: 0,
      checkedAt: new Date().toISOString(),
    };
  }
}

export const futureProviderContracts = Object.freeze([
  "OpenAI Provider",
  "Claude Provider",
  "Gemini Provider",
  "Azure OpenAI Provider",
]);
