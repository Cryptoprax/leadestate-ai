import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AIEmployeeCode, CostEstimate, TokenUsage } from "../domain/models";
import type { ConversationSnapshot, WorkforceConversation, WorkforceMessage } from "./models";

type Context = { client: SupabaseClient; organizationId: string; workspaceId: string };
type Row = Record<string, unknown>;

export class WorkforceConversationRepository {
  constructor(private context: Context) {}

  async search(employee: AIEmployeeCode, query = ""): Promise<readonly WorkforceConversation[]> {
    let request = this.context.client.from("ai_workforce_conversations").select("id,employee_code,title,created_at,updated_at").eq("organization_id", this.context.organizationId).eq("workspace_id", this.context.workspaceId).eq("employee_code", employee).is("deleted_at", null).order("updated_at", { ascending: false }).limit(50);
    if (query.trim()) request = request.ilike("title", `%${query.trim().slice(0, 100)}%`);
    const { data, error } = await request;
    if (error) throw error;
    return ((data ?? []) as Row[]).map((row) => ({ id: String(row.id), employee: String(row.employee_code) as AIEmployeeCode, title: String(row.title), createdAt: String(row.created_at), updatedAt: String(row.updated_at) }));
  }

  async snapshot(employee: AIEmployeeCode, query = ""): Promise<ConversationSnapshot> {
    const conversations = await this.search(employee, query);
    if (!conversations.length) return { conversations, messages: [] };
    const ids = conversations.map((item) => item.id);
    const { data, error } = await this.context.client.from("ai_workforce_messages").select("id,conversation_id,role,content,model,input_tokens,output_tokens,cost_estimate,latency_ms,created_at").eq("organization_id", this.context.organizationId).eq("workspace_id", this.context.workspaceId).in("conversation_id", ids).order("created_at");
    if (error) throw error;
    const messages = ((data ?? []) as Row[]).map((row): WorkforceMessage => {
      const input = Number(row.input_tokens ?? 0), output = Number(row.output_tokens ?? 0), model = row.model ? String(row.model) : null, cost = Number(row.cost_estimate ?? 0);
      return { id: String(row.id), conversationId: String(row.conversation_id), role: row.role === "assistant" ? "assistant" : "user", content: String(row.content), model, usage: model ? { promptTokens: input, completionTokens: output, totalTokens: input + output, estimated: false } : null, cost: model ? { model, inputUsd: 0, outputUsd: 0, totalUsd: cost, estimated: true, pricingVersion: "stored-total" } : null, latencyMs: row.latency_ms === null || row.latency_ms === undefined ? null : Number(row.latency_ms), createdAt: String(row.created_at), recommendationOnly: true };
    });
    return { conversations, messages };
  }

  async create(employee: AIEmployeeCode, title: string) {
    const { data: auth } = await this.context.client.auth.getUser();
    if (!auth.user) throw new Error("Authentication required.");
    const { data, error } = await this.context.client.from("ai_workforce_conversations").insert({ organization_id: this.context.organizationId, workspace_id: this.context.workspaceId, employee_code: employee, title: title.slice(0, 120), created_by: auth.user.id }).select("id").single();
    if (error) throw error;
    return String(data.id);
  }

  async append(input: { conversationId: string; role: "user" | "assistant"; content: string; model?: string; usage?: TokenUsage; cost?: CostEstimate; latencyMs?: number }) {
    const { data: auth } = await this.context.client.auth.getUser();
    if (!auth.user) throw new Error("Authentication required.");
    const { error } = await this.context.client.from("ai_workforce_messages").insert({ organization_id: this.context.organizationId, workspace_id: this.context.workspaceId, conversation_id: input.conversationId, role: input.role, content: input.content, model: input.model ?? null, input_tokens: input.usage?.promptTokens ?? 0, output_tokens: input.usage?.completionTokens ?? 0, cost_estimate: input.cost?.totalUsd ?? 0, latency_ms: input.latencyMs ?? null, recommendation_only: true, created_by: auth.user.id });
    if (error) throw error;
    await this.context.client.from("ai_workforce_conversations").update({ updated_at: new Date().toISOString() }).eq("id", input.conversationId).eq("organization_id", this.context.organizationId).eq("workspace_id", this.context.workspaceId);
  }
}
