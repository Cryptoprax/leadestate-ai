import "server-only";
import { BillingRepository } from "../repositories/billing.repository";
import { CommercialBillingRepository } from "../repositories/commercial.repository";
import type { BillingDashboard } from "../types";
import { billingContext } from "./billing-context";
import { InvoiceService } from "./invoice.service";
import { SubscriptionService } from "./subscription.service";
import { UsageService } from "./usage.service";
export class BillingService {
  private async repo() { const c = await billingContext(); return new BillingRepository(c.client, c.organizationId, c.workspaceId); }
  async contact() { return (await this.repo()).contact(); }
  async updateContact(input: { companyName: string; billingEmail: string; taxId?: string }) { await billingContext("manage"); return (await this.repo()).updateContact(input); }
  async dashboard(): Promise<BillingDashboard> {
    const c = await billingContext();
    const commercial = new CommercialBillingRepository(c.client, c.organizationId, c.workspaceId);
    const [plans, subscription, usage, invoices, paymentMethods, events, contact] = await Promise.all([new SubscriptionService().plans(), new SubscriptionService().current(), new UsageService().list(), new InvoiceService().list(), commercial.paymentMethods(), commercial.events(), this.contact()]);
    return { plans, subscription, usage, invoices, paymentMethods, events, contact };
  }
}
