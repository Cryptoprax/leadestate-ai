import { SubscriptionLifecycle } from "@/features/vayon/billing/components/BillingForms";
import { BillingHeader, SubscriptionStatus } from "@/features/vayon/billing/components/BillingUI";
import { StripePlanGrid } from "@/features/vayon/billing/components/StripeBilling";
import { BillingService } from "@/features/vayon/billing/services/billing.service";
export default async function Page(){const data=await new BillingService().dashboard();return <main className="mx-auto max-w-[96rem] px-5 py-8"><BillingHeader title="Subscription" description="Secure Stripe Checkout, prorated plan changes, trials, cancellation, and reactivation."/><SubscriptionStatus subscription={data.subscription}/><div className="mt-5"><SubscriptionLifecycle subscription={data.subscription}/></div><StripePlanGrid plans={data.plans} subscription={data.subscription}/></main>}
