import { BillingHeader } from "@/features/vayon/billing/components/BillingUI";
import { StripePlanGrid } from "@/features/vayon/billing/components/StripeBilling";
import { BillingService } from "@/features/vayon/billing/services/billing.service";
export default async function Page(){const data=await new BillingService().dashboard();return <main className="mx-auto max-w-[96rem] px-5 py-8"><BillingHeader title="Plans" description="Choose a production Stripe subscription plan with tenant-scoped entitlements."/><StripePlanGrid plans={data.plans} subscription={data.subscription}/></main>}
