import type { BrainCitation, BrainConfidence, BrainExplanation, BrainResponse } from "../../brain/domain/contracts";
import type { CognitiveResponse } from "../../cognitive/domain/contracts";

export type AdvisorType = "executive" | "sales" | "operations";
export type AdvisorySection = "summary" | "health" | "priority" | "risk" | "opportunity" | "recommendation" | "lead-priority" | "deal-health" | "stalled-pipeline" | "follow-up" | "missing-information" | "pipeline-improvement" | "overdue-work" | "workflow-bottleneck" | "incomplete-record" | "productivity";
export type AdvisoryTone = "neutral" | "positive" | "warning" | "critical";
export interface AdvisorDefinition { id: AdvisorType; name: string; description: string; sections: readonly AdvisorySection[]; capabilities: readonly string[] }
export interface AdvisorRequest { id: string; correlationId: string; advisor: AdvisorType; prompt: string; priority: "low" | "normal" | "high"; context: Parameters<import("../../brain/gateway/brain-gateway").BrainGateway["ask"]>[0]["context"] }
export interface AdvisoryInsight { id: string; section: AdvisorySection; title: string; summary: string; tone: AdvisoryTone; confidence: BrainConfidence; citations: readonly BrainCitation[]; recommendation?: string; status: "awaiting-context" | "advisory" }
export interface AdvisorResponse { requestId: string; correlationId: string; advisor: AdvisorType; summary: string; insights: readonly AdvisoryInsight[]; explanation: BrainExplanation; citations: readonly BrainCitation[]; brain: BrainResponse; cognition: CognitiveResponse; executionAvailable: false }
export interface ConversationMessage { id: string; advisor: AdvisorType; role: "user" | "advisor"; content: string; createdAt: string; status: "draft" | "architecture-placeholder" | "complete" }
export interface RecommendationTimelineEntry { id: string; advisor: AdvisorType; title: string; description: string; createdAt?: string; status: "awaiting-context" | "recommended" | "dismissed"; executable: false }

