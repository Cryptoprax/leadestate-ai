import type { ProviderRegistry } from "../contracts/ports";
import type { AIRuntimeCapability, ProviderCapabilities, ProviderDescriptor } from "../domain/contracts";
const capabilities = (values: readonly AIRuntimeCapability[]): ProviderCapabilities => ({ vision: values.includes("vision"), speech: values.includes("speech"), embeddings: values.includes("embeddings"), structuredOutput: values.includes("structured-output"), streaming: values.includes("streaming"), toolCalling: values.includes("tool-calling"), functionCalling: values.includes("function-calling") });
const descriptor = (id: ProviderDescriptor["id"], name: string, values: readonly AIRuntimeCapability[]): ProviderDescriptor => ({ id, name, capabilities: capabilities(values), supportedModels: [], pricing: { status: "placeholder" }, latency: { status: "placeholder" }, health: "disconnected", enabled: false, adapterAvailable: false });
export const architectureProviders: readonly ProviderDescriptor[] = [
  descriptor("openai", "OpenAI", ["chat", "vision", "speech", "embeddings", "structured-output", "streaming", "tool-calling", "function-calling"]),
  descriptor("anthropic", "Anthropic", ["chat", "vision", "structured-output", "streaming", "tool-calling"]),
  descriptor("google-gemini", "Google Gemini", ["chat", "vision", "speech", "embeddings", "structured-output", "streaming", "function-calling"]),
  descriptor("azure-openai", "Azure OpenAI", ["chat", "vision", "speech", "embeddings", "structured-output", "streaming", "tool-calling", "function-calling"]),
  descriptor("ollama", "Ollama", ["chat", "vision", "embeddings", "structured-output", "streaming", "tool-calling"]),
  descriptor("openrouter", "OpenRouter", ["chat", "vision", "structured-output", "streaming", "tool-calling"]),
  descriptor("local-model", "Future Local Models", ["chat"]), descriptor("enterprise-model", "Future Enterprise Models", ["chat"]),
];
export class InMemoryProviderRegistry implements ProviderRegistry { private readonly providers = new Map<ProviderDescriptor["id"], ProviderDescriptor>(); constructor(initial: readonly ProviderDescriptor[] = architectureProviders) { initial.forEach(provider => this.register(provider)) } register(provider: ProviderDescriptor) { this.providers.set(provider.id, provider) } get(id: ProviderDescriptor["id"]) { return this.providers.get(id) } list() { return [...this.providers.values()] } }

