export type CrmProviderKind = "production" | "aurora-demo";
export interface CrmLeadListQuery {
  readonly search?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly source?: string;
  readonly assignedAgentId?: string;
  readonly sort: "updated_at" | "created_at" | "name" | "lead_score" | "budget";
  readonly direction: "asc" | "desc";
  readonly page: number;
  readonly pageSize: number;
}
export interface CrmLeadRow {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly budgetLabel: string;
  readonly source: string;
  readonly priority: string;
  readonly status: string;
  readonly assignedAgent: string;
  readonly propertyInterest: string;
  readonly lastActivity?: string;
  readonly aiScore?: number;
  readonly createdAt: string;
  readonly location?: string;
  readonly propertyType?: string;
  readonly tags: readonly string[];
}
export interface CrmPage<T> {
  readonly items: readonly T[];
  readonly count: number;
  readonly page: number;
  readonly pageSize: number;
}
export interface CrmTimelineItem {
  readonly id: string;
  readonly kind:
    | "whatsapp"
    | "email"
    | "call"
    | "meeting"
    | "site-visit"
    | "note"
    | "ai-action"
    | "status-change"
    | "payment"
    | "activity";
  readonly title: string;
  readonly detail?: string;
  readonly occurredAt: string;
}
export interface CrmRelatedItem {
  readonly id: string;
  readonly kind: string;
  readonly title: string;
  readonly status: string;
  readonly meta?: string;
}
export interface CrmInsight {
  readonly summary: string;
  readonly buyingIntent: string;
  readonly budgetConfidence: "low" | "medium" | "high";
  readonly urgency: "low" | "medium" | "high";
  readonly nextAction: string;
  readonly risk: string;
  readonly suggestedWhatsApp: string;
  readonly suggestedEmail: string;
  readonly suggestedCallScript: string;
  readonly generatedBy: "deterministic-rules";
}
export interface CrmLeadProfile {
  readonly lead: CrmLeadRow;
  readonly preferredLocations: readonly string[];
  readonly buyingPurpose?: string;
  readonly owner: string;
  readonly timeline: readonly CrmTimelineItem[];
  readonly properties: readonly CrmRelatedItem[];
  readonly deals: readonly CrmRelatedItem[];
  readonly communications: readonly CrmTimelineItem[];
  readonly meetings: readonly CrmRelatedItem[];
  readonly tasks: readonly CrmRelatedItem[];
  readonly documents: readonly CrmRelatedItem[];
  readonly insights: CrmInsight;
}
export interface CrmCompany {
  readonly id: string;
  readonly name: string;
  readonly industry: string;
  readonly location: string;
  readonly relationship: string;
}
export interface CrmDashboardModel {
  readonly provider: CrmProviderKind;
  readonly stats: readonly {
    readonly label: string;
    readonly value: string;
    readonly state: "available" | "unavailable";
  }[];
  readonly recentLeads: readonly CrmLeadRow[];
  readonly recentActivity: readonly CrmTimelineItem[];
}
