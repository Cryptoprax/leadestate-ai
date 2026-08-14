import type { DomainEventType } from "../domain/event";
export const moduleEventContracts = {
  crm: ["LeadCreated", "LeadUpdated"],
  properties: ["PropertyViewed", "PropertyMatched"],
  communications: ["ConversationReceived", "ConversationDrafted"],
  calendar: ["MeetingScheduled", "ReminderTriggered"],
  workflow: [
    "WorkflowSubmitted",
    "WorkflowApproved",
    "WorkflowRejected",
    "ApprovalRequested",
    "ApprovalGranted",
    "ApprovalRejected",
    "ExecutionPrepared",
  ],
  deals: ["DealUpdated", "DealClosed"],
  workforce: ["AIRecommendationGenerated", "TaskSuggested", "RiskDetected"],
  integrations: ["ProviderHealthChanged"],
  analytics: ["AnalyticsRefreshed"],
  notifications: ["NotificationCreated"],
} as const satisfies Readonly<Record<string, readonly DomainEventType[]>>;
export const moduleIntegrationPolicy = {
  publishOnly: true,
  directModuleDependencies: false,
  autonomousExecution: false,
  productionHooksEnabled: false,
} as const;
