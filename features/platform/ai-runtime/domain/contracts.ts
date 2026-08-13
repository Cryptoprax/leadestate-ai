import type { BrainCitation, BrainContext, BrainExplanation } from "@/features/platform/intelligence/brain/domain/contracts";

export type AIProviderId = "openai" | "anthropic" | "google-gemini" | "azure-openai" | "ollama" | "openrouter" | "local-model" | "enterprise-model";
export type AIRuntimeCapability = "chat" | "vision" | "speech" | "embeddings" | "structured-output" | "streaming" | "tool-calling" | "function-calling";
export type AIRuntimeStatus = "queued" | "routing" | "blocked" | "unavailable" | "complete" | "failed" | "cancelled";
export interface ProviderModel { id: string; label: string; capabilities: readonly AIRuntimeCapability[]; contextWindow?: number; regions: readonly string[] }
export interface ProviderCapabilities { vision: boolean; speech: boolean; embeddings: boolean; structuredOutput: boolean; streaming: boolean; toolCalling: boolean; functionCalling: boolean }
export interface ProviderDescriptor { id: AIProviderId; name: string; capabilities: ProviderCapabilities; supportedModels: readonly ProviderModel[]; pricing: { status: "placeholder"; input?: number; output?: number }; latency: { status: "placeholder"; milliseconds?: number }; health: "disconnected" | "unknown" | "available"; enabled: false; adapterAvailable: false }

export interface AIRuntimeMetadata { workspaceId?: string; organizationId?: string; userId?: string; advisor?: string; locale?: string; region?: string; preferredProvider?: AIProviderId; tags: Readonly<Record<string, string>> }
export interface AIRuntimeContext { brain?: BrainContext; conversationId?: string; memoryReferences: readonly string[]; knowledgeReferences: readonly string[]; objectReferences: readonly string[]; permissions: readonly string[] }
export interface AIRuntimeCost { currency: string; estimated: number; status: "placeholder" | "calculated" }
export interface AIRuntimeUsage { inputTokens?: number; outputTokens?: number; totalTokens?: number; status: "placeholder" | "reported" }
export interface AIRuntimeCitation extends BrainCitation { verified: boolean }
export interface AIRuntimeExplanation extends BrainExplanation { providerSelection: string; safetySummary: string; validationSummary: string }
export interface AIRuntimeError { code: string; message: string; retryable: boolean; stage: AIRuntimeTraceStage; details?: Readonly<Record<string, unknown>> }
export type AIRuntimeTraceStage = "received" | "safety" | "route" | "prompt" | "provider-placeholder" | "normalize" | "validate" | "complete";
export interface AIRuntimeTraceStep { stage: AIRuntimeTraceStage; status: "complete" | "blocked" | "skipped" | "failed"; startedAt: string; completedAt: string; warnings: readonly string[] }
export interface AIRuntimeTrace { requestId: string; provider?: AIProviderId; model?: string; latencyMs?: number; retries: number; usage: AIRuntimeUsage; cost: AIRuntimeCost; errors: readonly AIRuntimeError[]; warnings: readonly string[]; confidence: number; safetyStatus: SafetyStatus; steps: readonly AIRuntimeTraceStep[] }
export interface AIRuntimeRequest { id: string; sessionId: string; capability: AIRuntimeCapability; input: string; context: AIRuntimeContext; metadata: AIRuntimeMetadata; promptId: string; promptVariables: Readonly<Record<string, string>>; outputSchema?: JSONSchema; tools?: readonly ToolContract[]; signal?: AbortSignal }
export interface AIRuntimeResponse<T = unknown> { requestId: string; sessionId: string; status: AIRuntimeStatus; output?: T; provider?: AIProviderId; model?: string; citations: readonly AIRuntimeCitation[]; explanation: AIRuntimeExplanation; usage: AIRuntimeUsage; cost: AIRuntimeCost; trace: AIRuntimeTrace; validation: OutputValidationResult; error?: AIRuntimeError; executable: false }
export interface AIRuntimeSession { id: string; workspaceId?: string; advisor?: string; conversationId: string; requestIds: readonly string[]; status: "open" | "closed"; createdAt: string; updatedAt: string }
export interface AIRuntimeConversation { id: string; sessionId: string; workspaceId?: string; advisor?: string; messages: readonly AIRuntimeConversationMessage[]; contextReferences: readonly string[]; memoryReferences: readonly string[]; knowledgeReferences: readonly string[]; multiAgentStatus: "unavailable" }
export interface AIRuntimeConversationMessage { id: string; role: "system" | "user" | "assistant" | "tool"; content: string; createdAt: string; status: AIRuntimeStatus }

export type RoutingStrategy = "preferred" | "fallback" | "capability" | "cost" | "latency" | "region" | "workspace" | "ab-placeholder" | "load-balance-placeholder";
export interface RoutingPolicy { preferredProvider?: AIProviderId; fallbackProviders: readonly AIProviderId[]; strategyOrder: readonly RoutingStrategy[]; maximumEstimatedCost?: number; maximumLatencyMs?: number; requiredRegion?: string; workspacePreferences: Readonly<Record<string, unknown>> }
export interface RoutingDecision { provider?: ProviderDescriptor; model?: ProviderModel; strategy: RoutingStrategy; candidates: readonly AIProviderId[]; reasons: readonly string[]; status: "selected" | "unavailable" }

export interface PromptTemplate { id: string; version: number; name: string; locale: string; role?: string; kind: "system" | "role" | "workspace" | "task" | "fragment"; template: string; requiredVariables: readonly string[]; fragments: readonly string[]; workspaceId?: string; active: boolean }
export interface AssembledPrompt { templateId: string; version: number; content: string; fragments: readonly string[]; locale: string; valid: boolean; errors: readonly string[] }
export interface JSONSchema { type: "object"; required?: readonly string[]; properties?: Readonly<Record<string, { type: "string" | "number" | "boolean" | "array" | "object" }>>; additionalProperties?: boolean }
export interface OutputValidationResult { valid: boolean; normalized?: unknown; malformed: boolean; missingFields: readonly string[]; confidencePresent: boolean; citationsPresent: boolean; safetyStatus: SafetyStatus; permissionStatus: "allowed" | "denied" | "unknown"; errors: readonly string[] }

export type SafetyStatus = "safe" | "review" | "blocked" | "unknown";
export interface SafetyFinding { id: string; category: "prompt-injection" | "pii" | "tenant-isolation" | "permission" | "sensitive-data" | "blocked-content" | "rate-limit" | "human-approval"; severity: "info" | "warning" | "critical"; message: string; blocked: boolean }
export interface SafetyResult { status: SafetyStatus; findings: readonly SafetyFinding[]; sanitizedInput: string; tenantValidated: boolean; permissionValidated: boolean; humanApprovalRequired: boolean }

export type ToolType = "calendar" | "crm" | "email" | "documents" | "search" | "tasks" | "properties" | "leads" | "deals" | "analytics" | "plugin";
export interface ToolContract { id: string; name: string; type: ToolType; description: string; inputSchema: JSONSchema; outputSchema?: JSONSchema; requiredPermissions: readonly string[]; requiresApproval: boolean; executable: false }
export interface ToolCallProposal { id: string; toolId: string; arguments: Readonly<Record<string, unknown>>; status: "proposed" | "blocked"; executable: false; reason: string }

export interface StreamChunk { id: string; requestId: string; sequence: number; content: string; final: boolean; timestamp: string }
export interface StreamState { requestId: string; chunks: readonly StreamChunk[]; content: string; status: "idle" | "streaming" | "cancelled" | "timed-out" | "disconnected"; lastHeartbeat?: string; reconnectToken?: string }

