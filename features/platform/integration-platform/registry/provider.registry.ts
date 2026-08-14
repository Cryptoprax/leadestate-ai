import type { IntegrationProvider } from "../contracts/provider";
import type { ProviderCapability } from "../domain/contracts";
import { DeterministicIntegrationAdapter } from "../adapters/deterministic.adapter";
const capability = (
  id: string,
  name: string,
  mode: ProviderCapability["mode"] = "write",
): ProviderCapability => ({
  id,
  name,
  mode,
  approvalRequired: mode === "write",
});
const definitions = [
  [
    "whatsapp",
    "WhatsApp",
    [
      capability("message.draft", "Draft messages", "advisory"),
      capability("message.send", "Send messages"),
    ],
  ],
  [
    "gmail",
    "Gmail",
    [
      capability("email.draft", "Draft email", "advisory"),
      capability("email.send", "Send email"),
    ],
  ],
  [
    "google-calendar",
    "Google Calendar",
    [
      capability("calendar.read", "Read calendar", "read"),
      capability("meeting.schedule", "Schedule meetings"),
    ],
  ],
  [
    "outlook",
    "Outlook",
    [
      capability("mail.read", "Read mail", "read"),
      capability("email.send", "Send email"),
    ],
  ],
  [
    "twilio",
    "Twilio",
    [
      capability("sms.send", "Send SMS"),
      capability("call.place", "Place call"),
    ],
  ],
  [
    "stripe",
    "Stripe",
    [
      capability("payment.read", "Read payment status", "read"),
      capability("payment.create", "Create payment"),
    ],
  ],
  [
    "openai",
    "OpenAI",
    [
      capability("ai.summarize", "Generate summaries", "advisory"),
      capability("ai.recommend", "Generate recommendations", "advisory"),
    ],
  ],
  [
    "claude",
    "Claude",
    [
      capability("ai.summarize", "Generate summaries", "advisory"),
      capability("document.review", "Review documents", "advisory"),
    ],
  ],
  [
    "gemini",
    "Gemini",
    [
      capability("ai.summarize", "Generate summaries", "advisory"),
      capability("multimodal.review", "Review multimodal context", "advisory"),
    ],
  ],
] as const;
export class ProviderRegistry {
  private providers = new Map<string, IntegrationProvider>();
  register(provider: IntegrationProvider) {
    if (this.providers.has(provider.id))
      throw new Error(`Provider already registered: ${provider.id}`);
    this.providers.set(provider.id, provider);
  }
  resolve(id: string) {
    const value = this.providers.get(id);
    if (!value) throw new Error(`Provider not registered: ${id}`);
    return value;
  }
  list() {
    return Object.freeze([...this.providers.values()]);
  }
}
export function createDeterministicProviderRegistry() {
  const registry = new ProviderRegistry();
  for (const [id, name, capabilities] of definitions)
    registry.register(
      new DeterministicIntegrationAdapter(id, name, "1.0.0", capabilities),
    );
  return registry;
}
