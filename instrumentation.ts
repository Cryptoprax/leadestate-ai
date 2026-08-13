import type { Instrumentation } from "next";
import { captureException, log } from "./lib/observability/logger";

export function register() {
  log("runtime.started", { runtime: process.env.NEXT_RUNTIME ?? "nodejs", observabilityProvider: "none" });
}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  captureException(error, { method: request.method, routePath: context.routePath, routeType: context.routeType });
};
