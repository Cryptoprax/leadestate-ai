import type {
  IntegrationAuditEntry,
  ProviderConnection,
} from "../domain/contracts";
export interface IntegrationPlatformRepository {
  connection(
    providerId: string,
    workspaceId: string,
  ): ProviderConnection | undefined;
  saveConnection(value: ProviderConnection): void;
  appendAudit(value: IntegrationAuditEntry): void;
  audit(workspaceId: string): readonly IntegrationAuditEntry[];
}
