import type { CanonicalBusinessEvent, EventCategory } from "../domain/contracts";
export interface SubscriptionFilter { readonly eventNames?: readonly string[]; readonly categories?: readonly EventCategory[]; readonly objectTypes?: readonly string[] }
export interface SubscriptionRetryPolicy { readonly maximumAttempts: number; readonly backoff: "fixed" | "exponential"; readonly deadLetterStatus: "placeholder" }
export interface SubscriptionDefinition { readonly id: string; readonly organizationId: string; readonly workspaceId: string; readonly consumerId: string; readonly consumerIdentity: { readonly type: "service" | "projection" | "integration"; readonly permissions: readonly string[] }; readonly filter: SubscriptionFilter; readonly cursor?: string; readonly ordering: "partition"; readonly retryPolicy: SubscriptionRetryPolicy; readonly status: "active" | "paused" }
export interface SubscriptionReplay { readonly subscriptionId: string; readonly partitionKey: string; readonly fromSequence?: number; readonly toSequence?: number }
export interface SubscriptionDelivery { readonly event: CanonicalBusinessEvent; readonly subscriptionId: string; readonly attempt: number; readonly executable: false }

