import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { AIEmployeeCode } from "../domain/models";
import { OpenAIProvider } from "../providers/openai.provider";
import type { RuntimeChatInput } from "./models";
import { WorkforceConversationRepository } from "./repository";
import { SalesAIService } from "@/features/platform/sales-ai/services/sales-ai.service";
import { CRMAIService } from "@/features/platform/crm-ai/services/crm-ai.service";
import { WhatsAppAIService } from "@/features/platform/whatsapp-ai/services/whatsapp-ai.service";
import { MarketingAIService } from "@/features/platform/marketing-ai/services/marketing-ai.service";

const employees: readonly AIEmployeeCode[] = ["sales-ai", "crm-ai", "marketing-ai", "whatsapp-ai", "voice-ai", "operations-ai", "finance-ai", "executive-ai"];
const allowedSources = new Set(["crm", "gmail", "calendar", "whatsapp", "deal", "task"]);

export class WorkforceRuntimeService {
  constructor(private repository: WorkforceConversationRepository, private provider = new OpenAIProvider(), private workspaceId: string) {}
  static async production() { const context = await operationsContext(); return new WorkforceRuntimeService(new WorkforceConversationRepository(context), new OpenAIProvider(), context.workspaceId); }
  history(employee: AIEmployeeCode, query = "") { return this.repository.snapshot(employee, query); }
  health() { return this.provider.health(); }

  async *chat(input: RuntimeChatInput) {
    if (!employees.includes(input.employee)) throw new Error("Unsupported AI employee.");
    if (!input.message.trim() || input.message.length > 20_000) throw new Error("A message between 1 and 20,000 characters is required.");
    const refs = (input.contextRefs ?? []).filter((ref) => allowedSources.has(ref.type) && /^[a-zA-Z0-9_-]{1,100}$/.test(ref.id));
    const conversationId = input.conversationId ?? await this.repository.create(input.employee, input.message.trim());
    await this.repository.append({ conversationId, role: "user", content: input.message.trim() });
    const salesEvidence = input.employee === "sales-ai" ? await (await SalesAIService.production()).runtimeContext() : null;
    const crmEvidence = input.employee === "crm-ai" ? await (await CRMAIService.production()).runtimeContext() : null;
    const whatsappEvidence = input.employee === "whatsapp-ai" ? await (await WhatsAppAIService.production()).runtimeContext() : null;
    const marketingEvidence = input.employee === "marketing-ai" ? await (await MarketingAIService.production()).runtimeContext() : null;
    const system = `You are ${input.employee}, a governed VAYON AI employee. Use only supplied workspace evidence. Never invent CRM relationships or performance. Never execute or send messages. Never publish or spend. Never edit records. Email and WhatsApp content is draft-only. Recommendations always require human approval. If evidence is absent, say so explicitly.${input.employee === "sales-ai" ? " You are an enterprise sales advisor responsible for lead qualification, pipeline risk, daily briefings, communication drafts, meeting preparation, CRM cleanup, and forecasting. Explain confidence and evidence." : ""}${input.employee === "crm-ai" ? " You are an enterprise CRM advisor responsible for customer summaries, relationship health, activity and timeline intelligence, data-quality cleanup, enrichment recommendations, and natural-language CRM discovery. Explain confidence, evidence, and unavailable sources." : ""}${input.employee === "whatsapp-ai" ? " You are an enterprise WhatsApp advisor responsible for conversation intent, sentiment, urgency, lead qualification, reply drafts, property matching, summaries, meeting recommendations, and conversation health. Every reply is a draft; never send, tag, edit CRM, or book calendars." : ""}${input.employee === "marketing-ai" ? " You are an enterprise Marketing advisor responsible for campaign strategy, Facebook and Google ad drafts, SEO, email, social content, lead generation, budgets, audiences, calendars, and evidence-backed analytics. Never publish, buy ads, or fabricate CAC, ROI, reach, or conversions." : ""}`;
    const prompt = `${input.message.trim()}\n\nAuthorized workspace references (identifiers only; do not infer their contents): ${refs.length ? JSON.stringify(refs) : "None supplied"}.${salesEvidence ? `\n\nTenant-scoped Sales AI evidence:\n${salesEvidence}` : ""}${crmEvidence ? `\n\nTenant-scoped CRM AI evidence:\n${crmEvidence}` : ""}${whatsappEvidence ? `\n\nTenant-scoped WhatsApp AI evidence:\n${whatsappEvidence}` : ""}${marketingEvidence ? `\n\nTenant-scoped Marketing AI evidence:\n${marketingEvidence}` : ""}`;
    const started = performance.now();
    let output = "";
    for await (const delta of this.provider.stream({ employee: input.employee, workspaceId: this.workspaceId, model: process.env.OPENAI_MODEL ?? "gpt-5", system, prompt })) { output += delta; yield { type: "delta" as const, value: delta, conversationId }; }
    const usage = await this.provider.countTokens(`${system}\n${prompt}\n${output}`);
    const cost = this.provider.estimateCost(process.env.OPENAI_MODEL ?? "gpt-5", usage.promptTokens, Math.ceil(output.length / 4));
    const latencyMs = Math.round(performance.now() - started);
    await this.repository.append({ conversationId, role: "assistant", content: output, model: cost.model, usage: { ...usage, completionTokens: Math.ceil(output.length / 4), totalTokens: usage.promptTokens + Math.ceil(output.length / 4) }, cost, latencyMs });
    yield { type: "complete" as const, conversationId, usage, cost, model: cost.model, latencyMs, recommendationOnly: true as const };
  }
}
