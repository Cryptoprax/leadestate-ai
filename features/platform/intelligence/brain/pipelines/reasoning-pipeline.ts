import type { BrainContextAssembler } from "../contracts/resolvers";
import type { BrainDecision, BrainPipeline, BrainPipelineStage, BrainRequest, BrainResponse } from "../domain/contracts";
import { buildDecisionGraph } from "../domain/decision-graph";
import { explainDecision, contextReferences } from "../services/explainability";
import type { PromptBuilder } from "../services/prompt-builder";
import { BrainTraceRecorder, CryptoBrainIdGenerator, type BrainIdGenerator } from "../observability/trace";
import type { BrainResponseStore, BrainTraceStore } from "../storage/contracts";

const preContext: readonly BrainPipelineStage[] = ["observe", "understand", "collect-context", "resolve-memory", "resolve-knowledge", "resolve-events", "resolve-permissions", "resolve-recommendations", "resolve-predictions", "build-context"];
export interface ReasoningPipelineDependencies { context: BrainContextAssembler; prompts: PromptBuilder; traces?: BrainTraceStore; responses?: BrainResponseStore; ids?: BrainIdGenerator }
export class ArchitectureReasoningPipeline implements BrainPipeline {
  constructor(private readonly dependencies: ReasoningPipelineDependencies) {}
  async run(request: BrainRequest): Promise<BrainResponse> {
    const ids = this.dependencies.ids ?? new CryptoBrainIdGenerator(), recorder = new BrainTraceRecorder(request.correlationId);
    const context = await this.dependencies.context.assemble(request);
    preContext.forEach(stage => recorder.record(stage, "complete", stage === "build-context" ? ["context-assembler"] : [`${stage}-resolver`]));
    this.dependencies.prompts.build({ intent: request.intent, input: request.input, context }); recorder.record("build-prompt", "complete", ["prompt-builder"]);
    const decision: BrainDecision = { id: ids.create(), outcome: "No automated decision generated", reasons: [{ id: ids.create(), statement: "The Vayon Brain provider boundary is intentionally disconnected.", evidence: contextReferences(context), limitations: ["Architecture-only release"] }], actions: [], confidence: { score: 0, level: "none", rationale: "No model or rules engine evaluated this request." }, requiresHumanApproval: false };
    recorder.record("generate-decision", "complete", ["decision-placeholder"]); const explanation = explainDecision(decision, context); recorder.record("generate-explanation", "complete", ["explainability-service"]);
    const graph = buildDecisionGraph(decision, [], explanation.evidence); const result = { status: "ready" as const, summary: "Vayon Brain assembled governed context; automated intelligence remains unavailable.", data: { architectureOnly: true, decisionGraph: graph }, actions: decision.actions };
    recorder.record("generate-result", "complete", ["result-builder"]); const trace = recorder.finish("ready");
    const response: BrainResponse = { requestId: request.id, correlationId: request.correlationId, sessionId: ids.create(), result, decision, explanation, context, trace, citations: explanation.evidence.map(reference => ({ ...reference })) };
    await Promise.all([this.dependencies.traces?.append(trace), this.dependencies.responses?.save(response)]); return response;
  }
}

