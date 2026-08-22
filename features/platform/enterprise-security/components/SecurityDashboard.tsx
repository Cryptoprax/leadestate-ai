"use client";
import { useState } from "react";
import type { SecurityDashboard as Dashboard } from "../types";
import { Button } from "@/features/platform/design-system";
const card = "rounded-2xl border border-vds-border bg-vds-surface p-5";
export function IdentitySecurityDashboard({ data }: { data: Dashboard }) {
  const [notice, setNotice] = useState(""),
    [secret, setSecret] = useState("");
  async function act(payload: Record<string, unknown>) {
    setNotice("Processing…");
    const response = await fetch("/api/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
      result = await response.json();
    if (!response.ok) {
      setNotice(result.error ?? "Security operation failed.");
      return;
    }
    if (result.token) setSecret(result.token);
    if (result.recoveryCodes) setSecret(result.recoveryCodes.join("\n"));
    setNotice("Security operation completed.");
  }
  return (
    <section className="space-y-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-vds-primary">
          Enterprise identity
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Identity &amp; Security</h2>
        <p className="mt-2 text-sm text-vds-muted">
          Supabase Auth, tenant membership, sessions, devices, MFA, personal
          tokens, and security audit history.
        </p>
        {notice && (
          <p role="status" className="mt-3 text-sm text-vds-primary">
            {notice}
          </p>
        )}
        {secret && (
          <pre className="mt-3 overflow-auto rounded-xl bg-vds-elevated p-3 text-xs">
            Copy once and store securely:{"\n"}
            {secret}
          </pre>
        )}
      </header>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["MFA status", data.mfa.enabled ? "Enabled" : "Not enabled"],
          ["Active sessions", data.observability.sessionCount],
          ["Trusted devices", data.devices.length],
          ["Failed logins", data.observability.failedLogins],
          ["Successful logins", data.observability.successfulLogins],
          ["API token usage", data.observability.tokenUsage],
        ].map(([l, v]) => (
          <article className={card} key={l}>
            <p className="text-xs text-vds-muted">{l}</p>
            <p className="mt-2 text-lg font-semibold">{v}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <article className={card}><h3 className="font-semibold">Password policy</h3><p className="mt-2 text-sm text-vds-muted">Minimum 12 characters, verified identity, managed reset flow, and session revocation.</p></article>
        <article className={card}><h3 className="font-semibold">IP restrictions</h3><p className="mt-2 text-sm text-vds-muted">Policy placeholder · no restriction is currently enforced.</p></article>
        <article className={card}><h3 className="font-semibold">API keys</h3><p className="mt-2 text-sm text-vds-muted">Personal access tokens are managed below. Organization-wide key policy is a prepared placeholder.</p></article>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <article className={card}>
          <h3 className="font-semibold">MFA &amp; Password Status</h3>
          <p className="mt-3 text-sm text-vds-muted">
            Assurance: {data.mfa.assuranceLevel ?? "Not established"} · Email
            verified: {data.password.emailVerified ? "Yes" : "No"}
          </p>
          <Button
            className="mt-4"
            onClick={() =>
              act({ action: "enroll-mfa", name: "VAYON Authenticator" })
            }
          >
            Enroll TOTP
          </Button>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              void act({
                action: "change-password",
                password: f.get("password"),
              });
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-xl border border-vds-border bg-vds-background px-3"
              name="password"
              type="password"
              minLength={12}
              placeholder="New password"
              required
            />
            <Button type="submit">Change password</Button>
          </form>
        </article>
        <article className={card}>
          <h3 className="font-semibold">Organizations</h3>
          <div className="mt-3 space-y-2">
            {data.organizations.map((o) => (
              <Button
                variant="outline"
                className="flex w-full justify-between rounded-xl bg-vds-elevated p-3 text-left text-sm"
                onClick={() =>
                  act({
                    action: "switch-organization",
                    organizationId: o.id,
                    workspaceId: o.workspaceId,
                  })
                }
                key={`${o.id}-${o.workspaceId}`}
                disabled={o.current}
              >
                <span>
                  {o.name} · {o.workspaceName}
                </span>
                <span>{o.current ? "Current" : o.role}</span>
              </Button>
            ))}
          </div>
        </article>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <article className={card}>
          <h3 className="font-semibold">Active Sessions</h3>
          <Button
            className="mt-3"
            variant="outline"
            onClick={() => act({ action: "revoke-sessions" })}
          >
            Revoke other sessions
          </Button>
          <ul className="mt-3 space-y-2 text-sm">
            {data.sessions.map((s) => (
              <li key={s.id}>
                {s.device} · {s.current ? "Current" : "Active"} · expires{" "}
                {new Date(s.expiresAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h3 className="font-semibold">Devices</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.devices.map((d) => (
              <li className="flex justify-between" key={d.id}>
                <span>
                  {d.name} · trusted{" "}
                  {new Date(d.trustedAt).toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  className="text-vds-danger"
                  onClick={() => act({ action: "remove-device", id: d.id })}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <article className={card}>
        <h3 className="font-semibold">API Tokens</h3>
        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            void act({
              action: "create-token",
              name: f.get("name"),
              scopes: String(f.get("scopes"))
                .split(",")
                .map((v) => v.trim()),
            });
          }}
        >
          <input
            className="rounded-xl border border-vds-border bg-vds-background px-3"
            name="name"
            placeholder="Token name"
            required
          />
          <input
            className="min-w-64 rounded-xl border border-vds-border bg-vds-background px-3"
            name="scopes"
            placeholder="crm.read, deals.read"
            required
          />
          <Button type="submit">Create token</Button>
        </form>
        <ul className="mt-4 space-y-2 text-sm">
          {data.tokens.map((t) => (
            <li className="flex justify-between" key={t.id}>
              <span>
                {t.name} · {t.prefix}… · {t.scopes.join(", ")}
              </span>
              {!t.revokedAt && (
                <Button
                  variant="ghost"
                  className="text-vds-danger"
                  onClick={() => act({ action: "revoke-token", id: t.id })}
                >
                  Revoke
                </Button>
              )}
            </li>
          ))}
        </ul>
      </article>
      <div className="grid gap-5 xl:grid-cols-2">
        <article className={card}>
          <h3 className="font-semibold">Login History</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.loginHistory.slice(0, 20).map((i) => (
              <li key={i.id}>
                {i.outcome} · {i.method} · {i.latencyMs} ms ·{" "}
                {new Date(i.occurredAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h3 className="font-semibold">Security Alerts</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {data.alerts.map((a) => (
              <li key={a.id}>
                <span className="uppercase">{a.severity}</span> · {a.title}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <article className={card}>
        <h3 className="font-semibold">Recent Security Events</h3>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {data.events.slice(0, 20).map((e, i) => (
            <li key={`${e.occurredAt}-${i}`}>
              {e.eventType} · {e.outcome} ·{" "}
              {new Date(e.occurredAt).toLocaleString()}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-vds-muted">
          Authentication latency:{" "}
          {data.observability.authenticationLatencyMs ?? "Unavailable"} ms · MFA
          usage: {data.observability.mfaUsage}
        </p>
      </article>
    </section>
  );
}
