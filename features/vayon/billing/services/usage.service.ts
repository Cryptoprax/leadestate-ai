import "server-only";
import { StripeBillingProvider } from "../providers/stripe.provider";
import { UsageRepository } from "../repositories/usage.repository";
import type { BillingMetric } from "../types";
import { billingContext } from "./billing-context";
import { SubscriptionLimitService } from "./subscription-limit.service";
export class UsageService {
  constructor(private provider = new StripeBillingProvider()) {}
  async list(){const c=await billingContext();return new UsageRepository(c.client,c.organizationId,c.workspaceId).list()}
  async record(metric:BillingMetric,quantity:number,idempotencyKey:string){if(!/^[a-zA-Z0-9_-]{8,200}$/.test(idempotencyKey))throw new Error("A valid usage idempotency key is required.");const c=await billingContext("manage");await new SubscriptionLimitService().enforce(metric,quantity);const{data,error}=await c.client.from("billing_customers").select("provider_customer_id").eq("organization_id",c.organizationId).eq("workspace_id",c.workspaceId).maybeSingle();if(error)throw error;if(!data?.provider_customer_id)throw new Error("Stripe billing customer is not provisioned.");await this.provider.recordUsage(data.provider_customer_id,metric,quantity,idempotencyKey);const result=await c.client.rpc("record_billing_usage",{p_workspace_id:c.workspaceId,p_metric:metric,p_quantity:quantity,p_idempotency_key:idempotencyKey});if(result.error)throw result.error}
}
