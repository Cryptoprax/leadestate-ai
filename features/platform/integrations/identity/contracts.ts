export const identityProviderCodes = ["google", "microsoft", "apple", "slack", "meta", "stripe", "dropbox", "box", "zoom"] as const;
export type IdentityProviderCode = (typeof identityProviderCodes)[number];

export type ConnectionStatus = "not_connected" | "connected" | "expired" | "revoked" | "disabled" | "error";
export type ScopeCapability = "identity" | "gmail" | "calendar" | "drive" | "meet" | "contacts" | "tasks";

export interface GrantedScope {
  readonly value: string;
  readonly capability: ScopeCapability;
  readonly granted: boolean;
}

export interface WorkspaceIdentityConnection {
  readonly workspaceId: string;
  readonly provider: IdentityProviderCode;
  readonly accountId: string | null;
  readonly email: string | null;
  readonly displayName: string | null;
  readonly photoUrl: string | null;
  readonly status: ConnectionStatus;
  readonly scopes: readonly GrantedScope[];
  readonly connectedAt: string | null;
  readonly updatedAt: string | null;
  readonly expiresAt: string | null;
  readonly refreshAvailable: boolean;
  readonly lastValidatedAt: string | null;
}

export interface CredentialVault {
  rotate(connectionId: string): Promise<void>;
  revoke(connectionId: string): Promise<void>;
}

export interface IdentityProviderDescriptor {
  readonly code: IdentityProviderCode;
  readonly label: string;
  readonly available: boolean;
  readonly capabilities: readonly ScopeCapability[];
}
