import "server-only";
import { getBuildMetadata } from "@/lib/infrastructure/build-metadata";
export const featureInventory = [
  "Authentication",
  "Executive Dashboard",
  "Aurora Demo Experience",
  "CRM Engine",
  "AI Workforce",
  "Workflow & Approval",
  "Integration Platform",
  "Communications Hub",
  "Calendar Platform",
  "Property Platform",
  "Deal Room",
  "Analytics Platform",
  "Event Bus",
  "Notification Platform",
  "Administration Platform",
  "Live Provider Foundation",
  "Public Marketing Website",
  "Platform Diagnostics",
] as const;
export const authenticatedRouteInventory = Object.freeze([
  { group: "Administration", count: 9 },
  { group: "AI and Intelligence", count: 19 },
  { group: "CRM and Transactions", count: 24 },
  { group: "Communications and Calendar", count: 31 },
  { group: "Platform and Operations", count: 48 },
] as const);
export interface SystemDiagnostics {
  readonly build: ReturnType<typeof getBuildMetadata>;
  readonly modules: readonly {
    readonly name: string;
    readonly status: "registered";
  }[];
  readonly routeHealth: "registered-build-inventory";
  readonly testStatus: "not-exposed-at-runtime";
  readonly sensitiveRuntimeDataIncluded: false;
  readonly routes: typeof authenticatedRouteInventory;
  readonly routeCount: 131;
  readonly performance: {
    readonly rendering: "server-components-preferred";
    readonly hydration: "isolated-client-boundaries";
    readonly runtimeMetrics: "not-collected";
  };
}
export function getSystemDiagnostics(): SystemDiagnostics {
  return Object.freeze({
    build: getBuildMetadata(),
    modules: featureInventory.map((name) =>
      Object.freeze({ name, status: "registered" as const }),
    ),
    routeHealth: "registered-build-inventory",
    testStatus: "not-exposed-at-runtime",
    sensitiveRuntimeDataIncluded: false,
    routes: authenticatedRouteInventory,
    routeCount: 131,
    performance: Object.freeze({
      rendering: "server-components-preferred" as const,
      hydration: "isolated-client-boundaries" as const,
      runtimeMetrics: "not-collected" as const,
    }),
  });
}
