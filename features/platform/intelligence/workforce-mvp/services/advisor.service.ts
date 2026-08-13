import type { BrainRequest } from "../../brain/domain/contracts";
import type { CognitiveRequest } from "../../cognitive/domain/contracts";
import type { AdvisorDependencies, WorkforceAdvisor } from "../contracts/ports";
import type { AdvisorySection, AdvisorDefinition, AdvisorRequest, AdvisorResponse, AdvisorType } from "../domain/contracts";

export const advisorDefinitions: readonly AdvisorDefinition[] = [
  { id: "executive", name: "Executive Advisor", description: "Governed business health, priority, risk and opportunity review.", sections: ["summary", "health", "priority", "risk", "opportunity", "recommendation"], capabilities: ["executive-summary", "business-health", "priorities", "risks", "opportunities", "recommended-actions"] },
  { id: "sales", name: "Sales Advisor", description: "Advisory review of lead and pipeline context.", sections: ["lead-priority", "deal-health", "stalled-pipeline", "follow-up", "missing-information", "pipeline-improvement"], capabilities: ["lead-prioritization", "deal-health", "stalled-pipeline", "follow-ups", "data-quality", "pipeline-improvement"] },
  { id: "operations", name: "Operations Advisor", description: "Advisory review of work, records and operational flow.", sections: ["overdue-work", "workflow-bottleneck", "incomplete-record", "recommendation", "productivity"], capabilities: ["overdue-work", "workflow-bottlenecks", "record-completeness", "operations-recommendations", "productivity"] },
];
const labels: Readonly<Record<AdvisorySection, string>> = { summary: "Executive summary", health: "Business health overview", priority: "Key priorities", risk: "Risks", opportunity: "Opportunities", recommendation: "Recommended actions", "lead-priority": "Lead prioritization", "deal-health": "Deal health review", "stalled-pipeline": "Stalled pipeline detection", "follow-up": "Follow-up recommendations", "missing-information": "Missing information alerts", "pipeline-improvement": "Pipeline improvement suggestions", "overdue-work": "Overdue work summary", "workflow-bottleneck": "Workflow bottleneck review", "incomplete-record": "Incomplete record detection", productivity: "Productivity suggestions" };

export class ContractWorkforceAdvisor implements WorkforceAdvisor {
  readonly type: AdvisorType;
  constructor(private readonly definition: AdvisorDefinition, private readonly dependencies: AdvisorDependencies) { this.type = definition.id }
  async advise(request: AdvisorRequest): Promise<AdvisorResponse> {
    const brainRequest: BrainRequest = { id: request.id, correlationId: request.correlationId, intent: "recommend", input: request.prompt, priority: request.priority, context: request.context, capabilities: ["context", "memory", "knowledge", "events", "permissions", "recommendations", "predictions", "analytics", "explainability"], metadata: { advisor: request.advisor, advisoryOnly: true } };
    const brain = await this.dependencies.brain.ask(brainRequest);
    const cognitiveRequest: CognitiveRequest = { id: `${request.id}:cognitive`, correlationId: request.correlationId, objective: request.prompt, context: brain.context, priority: request.priority };
    const cognition = await this.dependencies.cognitive.reason(cognitiveRequest), confidence = brain.decision.confidence;
    const insights = this.definition.sections.map((section, index) => ({ id: `${request.id}:${section}`, section, title: labels[section], summary: "Awaiting sufficient governed workspace context for an advisory assessment.", tone: "neutral" as const, confidence, citations: index === 0 ? brain.citations : [], status: "awaiting-context" as const }));
    return { requestId: request.id, correlationId: request.correlationId, advisor: this.type, summary: "Context was reviewed through Vayon Brain and the Cognitive Engine. No production recommendation was generated.", insights, explanation: cognition.explanation, citations: brain.citations, brain, cognition, executionAvailable: false };
  }
}

