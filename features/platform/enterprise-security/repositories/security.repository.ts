import "server-only";
import type { SecurityContext } from "../contracts";
import type {
  LoginHistory,
  OrganizationChoice,
  PersonalAccessToken,
  SecurityAlert,
  SecurityDashboard,
  SecuritySession,
  TrustedDevice,
} from "../types";
type Row = Record<string, unknown>;
const s = (v: unknown) => (v == null ? "" : String(v));
export class EnterpriseSecurityRepository {
  constructor(private context: SecurityContext) {}
  async snapshot(mfa: SecurityDashboard["mfa"]): Promise<SecurityDashboard> {
    const c = this.context,
      [
        sessions,
        devices,
        history,
        tokens,
        alerts,
        memberships,
        events,
        profile,
      ] = await Promise.all([
        c.client
          .from("identity_sessions")
          .select("id,device_name,last_seen_at,expires_at,revoked_at")
          .eq("user_id", c.userId)
          .order("last_seen_at", { ascending: false })
          .limit(50),
        c.client
          .from("trusted_devices")
          .select("id,device_name,trusted_at,last_seen_at,expires_at")
          .eq("user_id", c.userId)
          .is("removed_at", null)
          .order("last_seen_at", { ascending: false }),
        c.client
          .from("authentication_attempts")
          .select("id,outcome,auth_method,latency_ms,mfa_used,occurred_at")
          .eq("user_id", c.userId)
          .order("occurred_at", { ascending: false })
          .limit(100),
        c.client
          .from("personal_access_tokens")
          .select(
            "id,name,token_prefix,scopes,expires_at,last_used_at,revoked_at,created_at",
          )
          .eq("user_id", c.userId)
          .order("created_at", { ascending: false }),
        c.client
          .from("security_alerts")
          .select("id,alert_type,severity,title,resolved_at,created_at")
          .eq("user_id", c.userId)
          .order("created_at", { ascending: false })
          .limit(100),
        c.client
          .from("organization_members")
          .select(
            "organization_id,roles(code),organizations(id,name,workspaces(id,name))",
          )
          .eq("user_id", c.userId)
          .eq("status", "active"),
        c.client
          .from("identity_audit_events")
          .select("event_type,outcome,occurred_at")
          .eq("user_id", c.userId)
          .order("occurred_at", { ascending: false })
          .limit(100),
        c.client
          .from("user_profiles")
          .select("security_settings")
          .eq("user_id", c.userId)
          .maybeSingle(),
      ]);
    for (const result of [
      sessions,
      devices,
      history,
      tokens,
      alerts,
      memberships,
      events,
      profile,
    ])
      if (result.error) throw result.error;
    const sessionRows = (sessions.data ?? []) as unknown as Row[],
      loginRows = (history.data ?? []) as unknown as Row[],
      tokenRows = (tokens.data ?? []) as unknown as Row[],
      settings = (profile.data?.security_settings ?? {}) as Record<
        string,
        unknown
      >;
    const sessionList = sessionRows.map((r, i): SecuritySession => ({
        id: s(r.id),
        device: s(r.device_name),
        lastSeenAt: s(r.last_seen_at),
        expiresAt: s(r.expires_at),
        revokedAt: r.revoked_at ? s(r.revoked_at) : null,
        current: i === 0 && !r.revoked_at,
      })),
      deviceList = ((devices.data ?? []) as unknown as Row[]).map(
        (r): TrustedDevice => ({
          id: s(r.id),
          name: s(r.device_name),
          trustedAt: s(r.trusted_at),
          lastSeenAt: s(r.last_seen_at),
          expiresAt: s(r.expires_at),
        }),
      ),
      loginList = loginRows.map((r): LoginHistory => ({
        id: s(r.id),
        outcome: r.outcome as LoginHistory["outcome"],
        method: s(r.auth_method),
        latencyMs: Number(r.latency_ms),
        mfaUsed: Boolean(r.mfa_used),
        occurredAt: s(r.occurred_at),
      })),
      tokenList = tokenRows.map((r): PersonalAccessToken => ({
        id: s(r.id),
        name: s(r.name),
        prefix: s(r.token_prefix),
        scopes: (r.scopes ?? []) as string[],
        expiresAt: r.expires_at ? s(r.expires_at) : null,
        lastUsedAt: r.last_used_at ? s(r.last_used_at) : null,
        revokedAt: r.revoked_at ? s(r.revoked_at) : null,
        createdAt: s(r.created_at),
      })),
      alertList = ((alerts.data ?? []) as unknown as Row[]).map(
        (r): SecurityAlert => ({
          id: s(r.id),
          type: s(r.alert_type),
          severity: r.severity as SecurityAlert["severity"],
          title: s(r.title),
          resolvedAt: r.resolved_at ? s(r.resolved_at) : null,
          createdAt: s(r.created_at),
        }),
      );
    const organizations: OrganizationChoice[] = [];
    for (const row of (memberships.data ?? []) as unknown as Row[]) {
      const org = row.organizations as {
          id: string;
          name: string;
          workspaces: { id: string; name: string }[];
        } | null,
        role = row.roles as { code: string } | null;
      if (org)
        for (const w of org.workspaces ?? [])
          organizations.push({
            id: org.id,
            name: org.name,
            workspaceId: w.id,
            workspaceName: w.name,
            role: role?.code ?? "read_only",
            isOwner: role?.code === "organization_owner",
            current: org.id === c.organizationId && w.id === c.workspaceId,
          });
    }
    const success = loginList.filter((i) => i.outcome === "success"),
      failed = loginList.filter((i) => i.outcome !== "success"),
      eventRows = events.data ?? [],
      passwordEvent = eventRows.find((event) =>
        ["password.changed", "password.reset"].includes(event.event_type),
      ),
      latency = loginList.length
        ? Math.round(
            loginList.reduce((n, i) => n + i.latencyMs, 0) / loginList.length,
          )
        : null;
    return {
      sessions: sessionList,
      devices: deviceList,
      loginHistory: loginList,
      mfa,
      tokens: tokenList,
      alerts: alertList,
      organizations,
      password: {
        lastChangedAt: passwordEvent?.occurred_at ??
          (settings.password_changed_at ? s(settings.password_changed_at) : null),
        emailVerified: c.emailVerified,
      },
      events: eventRows.map((e) => ({
        eventType: e.event_type,
        outcome: e.outcome,
        occurredAt: e.occurred_at,
      })),
      observability: {
        authenticationLatencyMs: latency,
        failedLogins: failed.length,
        successfulLogins: success.length,
        mfaUsage: loginList.filter((i) => i.mfaUsed).length,
        sessionCount: sessionList.filter((i) => !i.revokedAt).length,
        tokenUsage: tokenList.filter((i) => i.lastUsedAt).length,
      },
    };
  }
  async rpc(name: string, args: Record<string, unknown>) {
    const { data, error } = await this.context.client.rpc(name, args);
    if (error) throw error;
    return data;
  }
}
