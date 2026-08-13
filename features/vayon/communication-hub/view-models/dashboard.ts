export interface CommunicationHubMetric { label: string; value: "—"; description: string; placeholder: true }
export const emptyCommunicationHubMetrics: readonly CommunicationHubMetric[] = ["Unified inbox", "Recent conversations", "Unread summary", "Communication channels", "Pending replies", "Follow-up queue", "Conversation health", "Communication insights"].map(label => ({ label, value: "—", description: "Awaiting connected, permitted communication sources.", placeholder: true }));

