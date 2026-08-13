import type { BrainContext, BrainIntent } from "../domain/contracts";

export interface PromptSection { kind: "system" | "workspace" | "role" | "context" | "memory" | "knowledge" | "output-contract" | "tool-contract"; content: string }
export interface BrainPrompt { sections: readonly PromptSection[]; providerFormat: "unformatted"; executable: false }
export interface PromptBuilderInput { intent: BrainIntent; input: string; context: BrainContext }
export interface PromptBuilder { build(input: PromptBuilderInput): BrainPrompt }
export class ContractPromptBuilder implements PromptBuilder {
  build({ intent, input, context }: PromptBuilderInput): BrainPrompt {
    return { executable: false, providerFormat: "unformatted", sections: [
      { kind: "system", content: "Vayon Brain architecture contract. No provider is connected." },
      { kind: "workspace", content: `Workspace: ${context.identity.workspaceId ?? "unavailable"}; organization: ${context.identity.organizationId ?? "unavailable"}.` },
      { kind: "role", content: `Roles: ${context.identity.roleIds.join(", ") || "unavailable"}.` },
      { kind: "context", content: `Intent: ${intent}. Request: ${input}. Objects: ${context.objects.length}. Events: ${context.events.length}.` },
      { kind: "memory", content: `Resolved memory references: ${context.memory.length}.` },
      { kind: "knowledge", content: `Resolved knowledge references: ${context.knowledge.length}.` },
      { kind: "output-contract", content: "Return a typed BrainResponse with decision, explanation, result, citations, and trace." },
      { kind: "tool-contract", content: "No tools or external providers are enabled." },
    ] };
  }
}

