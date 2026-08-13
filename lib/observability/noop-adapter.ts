import type { ObservabilityAdapter, PerformanceSpan } from "./contracts";
import { captureException } from "./logger";

export class NoopObservabilityAdapter implements ObservabilityAdapter {
  readonly provider = "console" as const;
  readonly connected = false;
  captureException(error: unknown, context: Readonly<Record<string, unknown>> = {}) { captureException(error, { ...context }); }
  startSpan(name: string): PerformanceSpan {
    const startedAt = performance.now();
    return Object.freeze({ name, startedAt, end: () => undefined });
  }
}
