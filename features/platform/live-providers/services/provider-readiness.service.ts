import type {
  LiveProviderConnectionRepository,
  ProviderDiagnosticModel,
} from "../domain/contracts";
import {
  liveProviderCatalog,
  liveProviderDefinition,
} from "../registry/provider-catalog";
import { ReferenceOnlyLiveProviderRepository } from "../repositories/reference.repository";

export class ProviderReadinessService {
  constructor(
    private readonly repository: LiveProviderConnectionRepository = new ReferenceOnlyLiveProviderRepository(),
  ) {}

  async inventory() {
    const models = await Promise.all(
      liveProviderCatalog.map((provider) => this.model(provider.id)),
    );
    return models.filter(
      (model): model is ProviderDiagnosticModel => model !== null,
    );
  }

  async model(providerId: string): Promise<ProviderDiagnosticModel | null> {
    const definition = liveProviderDefinition(providerId);
    if (!definition) return null;
    const connection = await this.repository.connection(definition.id);
    const hasReference = connection.credential !== null;
    const validation = Object.freeze({
      valid: hasReference && connection.state === "connected",
      issues: Object.freeze(
        hasReference
          ? connection.state === "connected"
            ? []
            : [`Connection state is ${connection.state}.`]
          : ["No credential reference is available for this workspace."],
      ),
      externalRequestMade: false as const,
      checkedAt: connection.lastValidation,
    });
    return Object.freeze({
      definition,
      connection,
      validation,
      health: Object.freeze({
        state: hasReference ? "unknown" : "unavailable",
        latencyMs: null,
        authorization: connection.authorization,
        lastValidation: connection.lastValidation,
        message: hasReference
          ? "Awaiting an explicitly requested sandbox validation."
          : "Connect this provider before validating readiness.",
        externalRequestMade: false as const,
      }),
    });
  }
}
