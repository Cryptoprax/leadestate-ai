import type { CredentialReference } from "@/features/platform/integration-platform/contracts/provider";

export type LiveProviderId =
  | "whatsapp-cloud"
  | "google-calendar"
  | "gmail"
  | "microsoft-outlook"
  | "microsoft-365";

export type ConnectionState =
  "connected" | "disconnected" | "expired" | "pending" | "validation-failed";

export type AuthorizationState =
  "not-authorized" | "pending" | "authorized" | "expired" | "invalid";

export interface OAuthState {
  readonly id: string;
  readonly providerId: LiveProviderId;
  readonly workspaceId: string;
  readonly redirectPath: string;
  readonly stateDigest: string;
  readonly codeChallenge: string;
  readonly nonceDigest: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly consumedAt: string | null;
  readonly version: 1;
}

export interface LiveProviderCapability {
  readonly id: string;
  readonly label: string;
  readonly access: "metadata" | "read" | "write";
  readonly enabled: false;
  readonly reason: string;
}

export interface LiveProviderDefinition {
  readonly id: LiveProviderId;
  readonly name: string;
  readonly family: "meta" | "google" | "microsoft";
  readonly authorization: "oauth2";
  readonly requiredScopes: readonly string[];
  readonly capabilities: readonly LiveProviderCapability[];
  readonly version: string;
}

export interface SandboxValidation {
  readonly valid: boolean;
  readonly issues: readonly string[];
  readonly externalRequestMade: false;
  readonly checkedAt: string | null;
}

export interface ProviderHealthSnapshot {
  readonly state: "ready" | "attention" | "unavailable" | "unknown";
  readonly latencyMs: number | null;
  readonly authorization: AuthorizationState;
  readonly lastValidation: string | null;
  readonly message: string;
  readonly externalRequestMade: false;
}

export interface LiveProviderConnection {
  readonly providerId: LiveProviderId;
  readonly state: ConnectionState;
  readonly credential: CredentialReference | null;
  readonly authorization: AuthorizationState;
  readonly lastValidation: string | null;
}

export interface ProviderDiagnosticModel {
  readonly definition: LiveProviderDefinition;
  readonly connection: LiveProviderConnection;
  readonly health: ProviderHealthSnapshot;
  readonly validation: SandboxValidation;
}

export interface LiveProviderConnectionRepository {
  connection(providerId: LiveProviderId): Promise<LiveProviderConnection>;
}
