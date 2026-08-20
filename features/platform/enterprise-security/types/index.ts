export interface SecuritySession {
  readonly id: string;
  readonly device: string;
  readonly lastSeenAt: string;
  readonly expiresAt: string;
  readonly current: boolean;
  readonly revokedAt: string | null;
}
export interface TrustedDevice {
  readonly id: string;
  readonly name: string;
  readonly trustedAt: string;
  readonly lastSeenAt: string;
  readonly expiresAt: string;
}
export interface LoginHistory {
  readonly id: string;
  readonly outcome: "success" | "failure" | "locked";
  readonly method: string;
  readonly latencyMs: number;
  readonly mfaUsed: boolean;
  readonly occurredAt: string;
}
export interface PersonalAccessToken {
  readonly id: string;
  readonly name: string;
  readonly prefix: string;
  readonly scopes: readonly string[];
  readonly expiresAt: string | null;
  readonly lastUsedAt: string | null;
  readonly revokedAt: string | null;
  readonly createdAt: string;
}
export interface SecurityAlert {
  readonly id: string;
  readonly type: string;
  readonly severity: "low" | "medium" | "high" | "critical";
  readonly title: string;
  readonly createdAt: string;
  readonly resolvedAt: string | null;
}
export interface OrganizationChoice {
  readonly id: string;
  readonly name: string;
  readonly workspaceId: string;
  readonly workspaceName: string;
  readonly role: string;
  readonly isOwner: boolean;
  readonly current: boolean;
}
export interface SecurityDashboard {
  readonly sessions: readonly SecuritySession[];
  readonly devices: readonly TrustedDevice[];
  readonly loginHistory: readonly LoginHistory[];
  readonly mfa: {
    readonly enabled: boolean;
    readonly factors: number;
    readonly assuranceLevel: string | null;
  };
  readonly tokens: readonly PersonalAccessToken[];
  readonly alerts: readonly SecurityAlert[];
  readonly organizations: readonly OrganizationChoice[];
  readonly password: {
    readonly lastChangedAt: string | null;
    readonly emailVerified: boolean;
  };
  readonly events: readonly {
    eventType: string;
    outcome: string;
    occurredAt: string;
  }[];
  readonly observability: {
    authenticationLatencyMs: number | null;
    failedLogins: number;
    successfulLogins: number;
    mfaUsage: number;
    sessionCount: number;
    tokenUsage: number;
  };
}
