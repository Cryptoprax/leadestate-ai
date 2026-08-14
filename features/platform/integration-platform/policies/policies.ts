import type {
  RateLimitDecision,
  RateLimitPolicy,
  RetryPolicy,
} from "../contracts/provider";
export const deterministicRetryPolicy: RetryPolicy = Object.freeze({
  maxAttempts: 3,
  initialDelayMs: 100,
  maxDelayMs: 1000,
  backoff: "exponential",
  retryableCodes: ["SIMULATED_TRANSIENT"],
});
export const deterministicRateLimitPolicy: RateLimitPolicy = Object.freeze({
  capacity: 60,
  refillTokens: 60,
  refillIntervalMs: 60_000,
  scope: "workspace",
});
export class DeterministicRateLimiter {
  private usage = new Map<string, number>();
  decide(
    key: string,
    policy: RateLimitPolicy = deterministicRateLimitPolicy,
  ): RateLimitDecision {
    const used = this.usage.get(key) ?? 0,
      allowed = used < policy.capacity;
    if (allowed) this.usage.set(key, used + 1);
    return {
      allowed,
      remaining: Math.max(0, policy.capacity - used - (allowed ? 1 : 0)),
      retryAfterMs: allowed ? 0 : policy.refillIntervalMs,
    };
  }
}
