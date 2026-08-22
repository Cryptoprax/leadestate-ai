export type WorkforceStatus = "online" | "processing" | "idle" | "error" | "offline";
export type WorkforceTaskStatus =
  "pending" | "running" | "completed" | "failed" | "cancelled";
export type WorkforceTaskType =
  | "Lead Qualification"
  | "Customer Summary"
  | "WhatsApp Follow-up"
  | "Meeting Scheduling"
  | "Property Recommendation"
  | "Deal Analysis"
  | "Campaign Suggestion"
  | "Document Review";
export interface WorkforceMetric {
  readonly label: string;
  readonly value: string;
  readonly available: boolean;
}
export interface WorkforceActivity {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly occurredAt: string;
}
export interface WorkforceTask {
  readonly id: string;
  readonly employeeId: string;
  readonly type: WorkforceTaskType;
  readonly title: string;
  readonly status: WorkforceTaskStatus;
  readonly priority: "low" | "normal" | "high" | "urgent";
  readonly owner: string;
  readonly createdAt: string;
  readonly completedAt?: string;
  readonly duration?: string;
  readonly deadline?: string;
  readonly dependencies?: readonly string[];
  readonly progress?: number;
  readonly approvalState?: "not_required" | "pending" | "approved" | "rejected";
  readonly history?: readonly WorkforceActivity[];
}
export interface WorkforceEmployee {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly role: string;
  readonly department: "Sales" | "Marketing" | "Support" | "Operations" | "CRM" | "Finance" | "Executive";
  readonly availability: "available" | "working" | "unavailable";
  readonly description: string;
  readonly avatar: string;
  readonly status: WorkforceStatus;
  readonly capabilities: readonly string[];
  readonly kpis: readonly WorkforceMetric[];
  readonly performance: readonly WorkforceMetric[];
  readonly currentQueue: number;
  readonly memory: {
    readonly customerContext: string;
    readonly recentDecisions: string;
    readonly learnedPreferences: string;
    readonly recentOutcomes: string;
    readonly currentObjectives: string;
    readonly conversationCount: number;
    readonly assignedCustomers: number;
    readonly pendingTasks: number;
    readonly completedActions: number;
    readonly knowledgeReferences: number;
    readonly contextUtilization: number;
  };
  readonly recentActivity: readonly WorkforceActivity[];
  readonly permissions: readonly string[];
  readonly health: "healthy" | "degraded" | "unavailable";
  readonly version: number;
}
export interface WorkforceSnapshot {
  readonly employees: readonly WorkforceEmployee[];
  readonly tasks: readonly WorkforceTask[];
  readonly activity: readonly WorkforceActivity[];
  readonly runtimeHealth: import("@/features/platform/openai/domain/models").OpenAIHealth;
  readonly observability: {
    readonly health: string;
    readonly provider: string;
    readonly model: string;
    readonly version: string;
    readonly latency: string;
    readonly queueLength: number;
    readonly estimatedCost: string;
    readonly lastResponse: string;
    readonly failureCount: number;
  };
}
