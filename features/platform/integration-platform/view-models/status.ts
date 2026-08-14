import type { IntegrationPlatformService } from "../services/platform.service";
export type IntegrationPlatformDashboardModel = Awaited<
  ReturnType<IntegrationPlatformService["dashboard"]>
>;
export function integrationPlatformSummary(
  model: IntegrationPlatformDashboardModel,
) {
  return {
    total: model.providers.length,
    healthy: model.providers.filter(
      (value) => value.health.status === "healthy",
    ).length,
    connected: model.providers.filter(
      (value) => value.connection?.status === "connected",
    ).length,
    capabilities: model.providers.reduce(
      (count, value) => count + value.capabilities.length,
      0,
    ),
    auditEvents: model.audit.length,
  };
}
