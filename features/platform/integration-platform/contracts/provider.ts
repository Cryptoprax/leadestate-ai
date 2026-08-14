import type {
  ProviderCapability,
  ProviderConnection,
  ProviderContext,
  ProviderExecutionRequest,
  ProviderExecutionResult,
  ProviderHealth,
  ProviderValidation,
} from "../domain/contracts";
export interface IntegrationProvider {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  connect(context: ProviderContext): Promise<ProviderConnection>;
  disconnect(context: ProviderContext): Promise<ProviderConnection>;
  health(context: ProviderContext): Promise<ProviderHealth>;
  capabilities(): Promise<readonly ProviderCapability[]>;
  validate(context: ProviderContext): Promise<ProviderValidation>;
  execute(
    context: ProviderContext,
    request: ProviderExecutionRequest,
  ): Promise<ProviderExecutionResult>;
}
export interface CredentialReference {
  readonly id: string;
  readonly providerId: string;
  readonly workspaceId: string;
  readonly kind: "oauth" | "api-key" | "service-account" | "none";
  readonly maskedLabel: string;
  readonly version: number;
}
export interface CredentialVault {
  reference(
    providerId: string,
    workspaceId: string,
  ): Promise<CredentialReference | null>;
  store(reference: CredentialReference): Promise<void>;
  revoke(providerId: string, workspaceId: string): Promise<void>;
}
export interface RetryPolicy {
  readonly maxAttempts: number;
  readonly initialDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoff: "fixed" | "exponential";
  readonly retryableCodes: readonly string[];
}
export interface RateLimitPolicy {
  readonly capacity: number;
  readonly refillTokens: number;
  readonly refillIntervalMs: number;
  readonly scope: "workspace" | "provider" | "action";
}
export interface RateLimitDecision {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly retryAfterMs: number;
}
