export type ObservabilityProvider = "console" | "sentry" | "opentelemetry";

export interface TraceContext { readonly traceId: string; readonly spanId?: string; readonly correlationId?: string }
export interface PerformanceSpan { readonly name: string; readonly startedAt: number; end(attributes?: Readonly<Record<string, string | number | boolean>>): void }
export interface ObservabilityAdapter {
  readonly provider: ObservabilityProvider;
  readonly connected: boolean;
  captureException(error: unknown, context?: Readonly<Record<string, unknown>>): void | Promise<void>;
  startSpan(name: string, context?: TraceContext): PerformanceSpan;
}
