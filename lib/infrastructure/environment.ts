import "server-only";

export type AppEnvironment = "development" | "staging" | "production";

const requiredPublic = ["NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;
const requiredServer = ["SUPABASE_SERVICE_ROLE_KEY", "OPENAI_API_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "EMAIL_PROVIDER", "EMAIL_FROM_ADDRESS"] as const;

export interface EnvironmentStatus {
  readonly environment: AppEnvironment;
  readonly valid: boolean;
  readonly missing: readonly string[];
}

export function getAppEnvironment(): AppEnvironment {
  const value = process.env.APP_ENV;
  return value === "staging" || value === "production" ? value : "development";
}

export function inspectEnvironment(): EnvironmentStatus {
  const names = [...requiredPublic, ...requiredServer];
  const missing = names.filter(name => !process.env[name]?.trim());
  return Object.freeze({ environment: getAppEnvironment(), valid: missing.length === 0, missing: Object.freeze(missing) });
}

export function assertProductionEnvironment() {
  const status = inspectEnvironment();
  if (status.environment !== "development" && !status.valid) throw new Error(`Deployment configuration invalid. Missing: ${status.missing.join(", ")}.`);
  return status;
}
