import type { IntegrationPlatformRepository } from "../contracts/repository";
import type {
  IntegrationAuditEntry,
  ProviderConnection,
} from "../domain/contracts";
export class InMemoryIntegrationPlatformRepository implements IntegrationPlatformRepository {
  private connections = new Map<string, ProviderConnection>();
  private entries: IntegrationAuditEntry[] = [];
  connection(providerId: string, workspaceId: string) {
    const value = this.connections.get(`${workspaceId}:${providerId}`);
    return value && structuredClone(value);
  }
  saveConnection(value: ProviderConnection) {
    this.connections.set(
      `${value.workspaceId}:${value.providerId}`,
      structuredClone(value),
    );
  }
  appendAudit(value: IntegrationAuditEntry) {
    this.entries.push(structuredClone(value));
  }
  audit(workspaceId: string) {
    return Object.freeze(
      this.entries
        .filter((value) => value.workspaceId === workspaceId)
        .map((value) => structuredClone(value)),
    );
  }
}
