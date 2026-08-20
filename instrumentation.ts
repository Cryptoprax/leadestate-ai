import type { Instrumentation } from "next";
import { captureException, log } from "./lib/observability/logger";
import { assertProductionEnvironment } from "./lib/infrastructure/environment";

export function register() {
  const environment = assertProductionEnvironment();
  log("runtime.started", { runtime: process.env.NEXT_RUNTIME ?? "nodejs", environment: environment.environment, startupMs: Math.round(performance.now()), observabilityProvider: process.env.OBSERVABILITY_PROVIDER ?? "console" });
}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  captureException(error, { method: request.method, routePath: context.routePath, routeType: context.routeType });
};
