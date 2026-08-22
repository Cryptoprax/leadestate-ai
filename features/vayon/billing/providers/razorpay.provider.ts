import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

type RazorpayMethod = "upi" | "card" | "netbanking" | "emandate";
export class RazorpayBillingProvider {
  readonly id = "razorpay";
  async createSubscription(input: {
    planId: string;
    seats: number;
    organizationId: string;
    workspaceId: string;
    customerNotify?: boolean;
  }) {
    if (!input.planId || input.seats < 1)
      throw new Error(
        "A Razorpay plan and positive seat quantity are required.",
      );
    return this.request("/subscriptions", {
      plan_id: input.planId,
      total_count: 120,
      quantity: input.seats,
      customer_notify: input.customerNotify === false ? 0 : 1,
      notes: {
        organization_id: input.organizationId,
        workspace_id: input.workspaceId,
      },
    });
  }
  async createInvoice(input: {
    customerId: string;
    amountPaise: number;
    currency?: "INR";
    description: string;
    gstin?: string;
  }) {
    if (!Number.isInteger(input.amountPaise) || input.amountPaise < 100)
      throw new Error("Invoice amount must be at least one rupee.");
    return this.request("/invoices", {
      type: "invoice",
      customer_id: input.customerId,
      line_items: [
        {
          name: input.description,
          amount: input.amountPaise,
          currency: input.currency ?? "INR",
          quantity: 1,
        },
      ],
      notes: { gstin: input.gstin ?? "" },
    });
  }
  supportedMethods(): readonly RazorpayMethod[] {
    return ["upi", "card", "netbanking", "emandate"] as const;
  }
  verifyWebhook(payload: string, signature: string) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is required.");
    const expected = createHmac("sha256", secret).update(payload).digest("hex"),
      provided = Buffer.from(signature, "utf8"),
      actual = Buffer.from(expected, "utf8");
    if (provided.length !== actual.length || !timingSafeEqual(provided, actual))
      throw new Error("Invalid Razorpay webhook signature.");
    return JSON.parse(payload) as unknown;
  }
  private async request(path: string, body: Record<string, unknown>) {
    const key = process.env.RAZORPAY_KEY_ID,
      secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key || !secret) throw new Error("Razorpay credentials are required.");
    const response = await fetch(`https://api.razorpay.com/v1${path}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(
        `Razorpay request failed with status ${response.status}.`,
      );
    return response.json() as Promise<Record<string, unknown>>;
  }
}
