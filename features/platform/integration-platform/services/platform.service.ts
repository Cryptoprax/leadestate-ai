import "server-only";
import { integrationContext } from "@/features/platform/integrations/services/integration-context";
import { ReferenceOnlyCredentialVault } from "../credentials/in-memory.vault";
import { InMemoryIntegrationPlatformRepository } from "../repositories/in-memory.repository";
import { createDeterministicProviderRegistry } from "../registry/provider.registry";
import { IntegrationManager } from "./integration-manager";
const registry = createDeterministicProviderRegistry(),
  repository = new InMemoryIntegrationPlatformRepository(),
  credentials = new ReferenceOnlyCredentialVault(),
  manager = new IntegrationManager(registry, repository);
export class IntegrationPlatformService {
  readonly manager = manager;
  readonly credentials = credentials;
  async dashboard() {
    const context = await integrationContext(),
      {
        data: { user },
      } = await context.client.auth.getUser(),
      actorId = user?.id;
    if (!actorId) throw new Error("Authenticated actor is required.");
    const providerContext = {
        organizationId: context.organizationId,
        workspaceId: context.workspaceId,
        actorId,
        correlationId: `integration-dashboard:${context.workspaceId}`,
      },
      providers = await manager.health(providerContext);
    return {
      workspaceId: context.workspaceId,
      providers,
      audit: manager.auditHistory(context.workspaceId),
    };
  }
}
