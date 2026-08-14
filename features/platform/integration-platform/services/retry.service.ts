import type { RetryPolicy } from "../contracts/provider";
import { deterministicRetryPolicy } from "../policies/policies";
export class DeterministicRetryService {
  async run<T>(
    operation: (attempt: number) => Promise<T>,
    policy: RetryPolicy = deterministicRetryPolicy,
  ): Promise<T> {
    let last: unknown;
    for (let attempt = 1; attempt <= policy.maxAttempts; attempt++) {
      try {
        return await operation(attempt);
      } catch (error) {
        last = error;
        const code =
          typeof error === "object" && error && "code" in error
            ? String(error.code)
            : "UNKNOWN";
        if (
          !policy.retryableCodes.includes(code) ||
          attempt === policy.maxAttempts
        )
          throw error;
      }
    }
    throw last;
  }
}
