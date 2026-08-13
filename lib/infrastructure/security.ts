export interface RateLimitBoundary {
  readonly name: string;
  readonly scope: "ip" | "user" | "workspace";
  readonly limit: number;
  readonly windowSeconds: number;
}

export const rateLimitBoundaries: readonly RateLimitBoundary[] = Object.freeze([
  { name: "authentication", scope: "ip", limit: 20, windowSeconds: 60 },
  { name: "server-actions", scope: "user", limit: 120, windowSeconds: 60 },
  { name: "provider-webhooks", scope: "ip", limit: 300, windowSeconds: 60 },
  { name: "workspace-exports", scope: "workspace", limit: 10, windowSeconds: 3600 },
]);

export function isTrustedOrigin(origin: string | null, configured = process.env.TRUSTED_ORIGINS): boolean {
  if (!origin || !configured) return false;
  return configured.split(",").map(value => value.trim()).filter(Boolean).includes(origin);
}
