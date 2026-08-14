import type { AIEmployeeCode, CostEstimate, TokenUsage } from "../domain/models";

export type EmployeeRuntimeStatus = "online" | "processing" | "idle" | "error";
export interface WorkforceConversation { readonly id: string; readonly employee: AIEmployeeCode; readonly title: string; readonly createdAt: string; readonly updatedAt: string; }
export interface WorkforceMessage { readonly id: string; readonly conversationId: string; readonly role: "user" | "assistant"; readonly content: string; readonly model: string | null; readonly usage: TokenUsage | null; readonly cost: CostEstimate | null; readonly createdAt: string; readonly recommendationOnly: true; }
export interface ConversationSnapshot { readonly conversations: readonly WorkforceConversation[]; readonly messages: readonly WorkforceMessage[]; }
export interface RuntimeChatInput { readonly employee: AIEmployeeCode; readonly conversationId?: string; readonly message: string; readonly contextRefs?: readonly { type: "crm" | "gmail" | "calendar" | "whatsapp" | "deal" | "task"; id: string }[]; }
