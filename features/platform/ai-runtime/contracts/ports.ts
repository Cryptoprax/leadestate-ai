import type { AIRuntimeConversation, AIRuntimeRequest, AIRuntimeResponse, AIRuntimeSession, AssembledPrompt, OutputValidationResult, PromptTemplate, ProviderDescriptor, RoutingDecision, RoutingPolicy, SafetyResult, StreamChunk, StreamState, ToolCallProposal, ToolContract } from "../domain/contracts";
export interface ProviderRegistry { register(provider: ProviderDescriptor): void; get(id: ProviderDescriptor["id"]): ProviderDescriptor | undefined; list(): readonly ProviderDescriptor[] }
export interface ProviderRouter { route(request: AIRuntimeRequest, policy: RoutingPolicy): RoutingDecision }
export interface PromptRegistry { register(template: PromptTemplate): void; resolve(id: string, options?: { version?: number; locale?: string; workspaceId?: string; role?: string }): PromptTemplate | undefined; list(id?: string): readonly PromptTemplate[] }
export interface PromptManager { assemble(template: PromptTemplate, variables: Readonly<Record<string, string>>, fragments?: readonly PromptTemplate[]): AssembledPrompt }
export interface OutputValidator { validate(output: unknown, schema?: AIRuntimeRequest["outputSchema"], safety?: SafetyResult): OutputValidationResult }
export interface SafetyLayer { inspect(request: AIRuntimeRequest): SafetyResult }
export interface StreamingController { start(requestId: string): StreamState; append(state: StreamState, chunk: StreamChunk): StreamState; cancel(state: StreamState): StreamState; timeout(state: StreamState): StreamState; reconnect(state: StreamState, token: string): StreamState; heartbeat(state: StreamState, timestamp: string): StreamState }
export interface ToolRegistry { register(tool: ToolContract): void; list(): readonly ToolContract[]; propose(toolId: string, args: Readonly<Record<string, unknown>>): ToolCallProposal }
export interface RuntimeObservability { record(response: AIRuntimeResponse): void; traces(requestId?: string): readonly AIRuntimeResponse["trace"][] }
export interface RuntimeStorage { saveSession(session: AIRuntimeSession): Promise<void>; getSession(id: string): Promise<AIRuntimeSession | undefined>; saveConversation(conversation: AIRuntimeConversation): Promise<void>; getConversation(id: string): Promise<AIRuntimeConversation | undefined>; saveResponse(response: AIRuntimeResponse): Promise<void>; getResponse(requestId: string): Promise<AIRuntimeResponse | undefined> }
export interface AIRuntime { run<T = unknown>(request: AIRuntimeRequest, policy: RoutingPolicy): Promise<AIRuntimeResponse<T>> }

