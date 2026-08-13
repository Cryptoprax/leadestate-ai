export interface GrowthMetricViewModel { label: string; value: "—"; description: string; placeholder: true }
export interface GrowthDashboardViewModel { overview: readonly GrowthMetricViewModel[]; recommendations: readonly string[]; upcomingCampaigns: readonly string[]; contentCalendar: readonly string[]; goals: readonly string[] }
export const emptyGrowthDashboard: GrowthDashboardViewModel = { overview: ["Marketing overview", "Campaign health", "Lead sources", "Conversion funnel", "Revenue attribution"].map(label => ({ label, value: "—", description: "Awaiting connected, governed marketing data.", placeholder: true })), recommendations: [], upcomingCampaigns: [], contentCalendar: [], goals: [] };

