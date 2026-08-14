export type ProviderId =
  | "whatsapp"
  | "gmail"
  | "google-calendar"
  | "outlook"
  | "twilio"
  | "stripe"
  | "openai"
  | "claude"
  | "gemini"
  | string;
export type ProviderStatus =
  "disconnected" | "connecting" | "connected" | "degraded" | "unavailable";
export interface ProviderContext {
  readonly organizationId: string;
  readonly workspaceId: string;
  readonly actorId: string;
  readonly correlationId: string;
}
export interface ProviderCapability {
  readonly id: string;
  readonly name: string;
  readonly mode: "read" | "write" | "advisory";
  readonly approvalRequired: boolean;
}
export interface ProviderHealth {
  readonly status: "healthy" | "degraded" | "unavailable";
  readonly latencyMs: number;
  readonly checkedAt: string;
  readonly message: string;
}
export interface ProviderValidation {
  readonly valid: boolean;
  readonly issues: readonly string[];
  readonly checkedAt: string;
}
export interface ProviderExecutionRequest {
  readonly action: string;
  readonly input: Readonly<Record<string, unknown>>;
  readonly approvalId?: string;
  readonly idempotencyKey: string;
}
export interface ProviderExecutionResult {
  readonly status: "simulated" | "blocked";
  readonly providerId: string;
  readonly output: Readonly<Record<string, unknown>>;
  readonly externalRequestMade: false;
}
export interface ProviderConnection {
  readonly providerId: string;
  readonly workspaceId: string;
  readonly status: ProviderStatus;
  readonly connectedAt?: string;
  readonly disconnectedAt?: string;
  readonly version: number;
}
export interface IntegrationAuditEntry {
  readonly id: string;
  readonly providerId: string;
  readonly workspaceId: string;
  readonly event: string;
  readonly actorId: string;
  readonly correlationId: string;
  readonly occurredAt: string;
  readonly metadata: Readonly<Record<string, unknown>>;
}
