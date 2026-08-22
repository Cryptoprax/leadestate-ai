import type { CommunicationsConnectorProvider } from "../contracts/repository";

export class ArchitectureReadyConnector implements CommunicationsConnectorProvider {
  constructor(readonly provider: CommunicationsConnectorProvider["provider"]) {}
  capabilities() { return Object.freeze({ inbound: true, drafts: true, liveDelivery: false as const }); }
  prepareDraft(input: Readonly<{ conversationId: string; body: string }>) {
    if (!input.conversationId || !input.body.trim()) throw new Error("Conversation and draft body are required.");
    return Object.freeze({ state: "draft" as const, approvalRequired: true as const });
  }
}

export const communicationConnectors = Object.freeze([
  "whatsapp-cloud", "gmail", "outlook", "microsoft-365", "sms", "voice",
].map((provider) => new ArchitectureReadyConnector(provider as CommunicationsConnectorProvider["provider"])));
