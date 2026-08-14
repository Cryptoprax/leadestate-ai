import { randomUUID } from "node:crypto";
import type { IntegrationPlatformRepository } from "../contracts/repository";
import type {
  ProviderContext,
  ProviderExecutionRequest,
} from "../domain/contracts";
import type { ProviderRegistry } from "../registry/provider.registry";
import { DeterministicRateLimiter } from "../policies/policies";
export class IntegrationManager {
  constructor(
    private registry: ProviderRegistry,
    private repository: IntegrationPlatformRepository,
    private limiter = new DeterministicRateLimiter(),
  ) {}
  providers() {
    return this.registry.list();
  }
  async connect(providerId: string, context: ProviderContext) {
    const provider = this.registry.resolve(providerId),
      validation = await provider.validate(context);
    if (!validation.valid)
      throw new Error(
        `Provider validation failed: ${validation.issues.join(", ")}`,
      );
    const connection = await provider.connect(context);
    this.repository.saveConnection(connection);
    this.audit(providerId, context, "provider.connected");
    return connection;
  }
  async disconnect(providerId: string, context: ProviderContext) {
    const connection = await this.registry
      .resolve(providerId)
      .disconnect(context);
    this.repository.saveConnection(connection);
    this.audit(providerId, context, "provider.disconnected");
    return connection;
  }
  async execute(
    providerId: string,
    context: ProviderContext,
    request: ProviderExecutionRequest,
  ) {
    const decision = this.limiter.decide(
      `${context.workspaceId}:${providerId}`,
    );
    if (!decision.allowed) throw new Error("Provider rate limit exceeded.");
    const provider = this.registry.resolve(providerId),
      capabilities = await provider.capabilities();
    if (!capabilities.some((value) => value.id === request.action))
      throw new Error("Provider capability is unavailable.");
    const result = await provider.execute(context, request);
    this.audit(providerId, context, `provider.execution.${result.status}`, {
      action: request.action,
      idempotencyKey: request.idempotencyKey,
    });
    return result;
  }
  async health(context: ProviderContext) {
    return Promise.all(
      this.registry
        .list()
        .map(async (provider) => ({
          provider,
          health: await provider.health(context),
          validation: await provider.validate(context),
          capabilities: await provider.capabilities(),
          connection: this.repository.connection(
            provider.id,
            context.workspaceId,
          ),
        })),
    );
  }
  auditHistory(workspaceId: string) {
    return this.repository.audit(workspaceId);
  }
  private audit(
    providerId: string,
    context: ProviderContext,
    event: string,
    metadata: Readonly<Record<string, unknown>> = {},
  ) {
    this.repository.appendAudit({
      id: randomUUID(),
      providerId,
      workspaceId: context.workspaceId,
      event,
      actorId: context.actorId,
      correlationId: context.correlationId,
      occurredAt: new Date().toISOString(),
      metadata,
    });
  }
}
