import type { IntegrationProvider } from "../contracts/provider";
import type {
  ProviderCapability,
  ProviderConnection,
  ProviderContext,
  ProviderExecutionRequest,
} from "../domain/contracts";
export class DeterministicIntegrationAdapter implements IntegrationProvider {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly version: string,
    private readonly advertised: readonly ProviderCapability[],
  ) {}
  async connect(context: ProviderContext): Promise<ProviderConnection> {
    return {
      providerId: this.id,
      workspaceId: context.workspaceId,
      status: "connected",
      connectedAt: new Date().toISOString(),
      version: 1,
    };
  }
  async disconnect(context: ProviderContext): Promise<ProviderConnection> {
    return {
      providerId: this.id,
      workspaceId: context.workspaceId,
      status: "disconnected",
      disconnectedAt: new Date().toISOString(),
      version: 1,
    };
  }
  async health(context: ProviderContext) {
    const available = !!context.organizationId && !!context.workspaceId;
    return {
      status: available ? ("healthy" as const) : ("unavailable" as const),
      latencyMs: 0,
      checkedAt: new Date().toISOString(),
      message: "Deterministic adapter ready; no external connection exists.",
    };
  }
  async capabilities() {
    return this.advertised.map((value) => Object.freeze({ ...value }));
  }
  async validate(context: ProviderContext) {
    const issues = [
      !context.organizationId ? "Organization context is required." : null,
      !context.workspaceId ? "Workspace context is required." : null,
      !context.actorId ? "Actor context is required." : null,
      !context.correlationId ? "Correlation ID is required." : null,
    ].filter((value): value is string => !!value);
    return {
      valid: issues.length === 0,
      issues: Object.freeze(issues),
      checkedAt: new Date().toISOString(),
    };
  }
  async execute(_context: ProviderContext, request: ProviderExecutionRequest) {
    const approved = !!request.approvalId;
    return {
      status: approved ? ("simulated" as const) : ("blocked" as const),
      providerId: this.id,
      output: Object.freeze({
        action: request.action,
        idempotencyKey: request.idempotencyKey,
        message: approved
          ? "Deterministic simulation completed."
          : "Approval is required.",
      }),
      externalRequestMade: false as const,
    };
  }
}
