import type { UniversalIntent, UniversalIntentType } from "../domain/contracts";
import type { UniversalIntentRouter } from "../contracts/ports";
const rules: readonly {
  readonly type: UniversalIntentType;
  readonly pattern: RegExp;
}[] = [
  { type: "favorites", pattern: /^(favorites?|favourites?)\b/i },
  { type: "recent", pattern: /^recent\b/i },
  { type: "create", pattern: /^(create|new|add)\b/i },
  { type: "navigate", pattern: /^(navigate|go to)\b/i },
  { type: "open", pattern: /^open\b/i },
  { type: "search", pattern: /^(search|find|look for)\b/i },
];
export class DeterministicIntentRouter implements UniversalIntentRouter {
  resolve(input: string): UniversalIntent {
    const raw = input.trim(),
      rule = rules.find((candidate) => candidate.pattern.test(raw));
    return Object.freeze({
      type: rule?.type ?? "search",
      query: rule ? raw.replace(rule.pattern, "").trim() : raw,
      raw,
    });
  }
}
