import { BillingHeader } from "@/features/vayon/billing/components/BillingUI";
import { PaymentMethodList } from "@/features/vayon/billing/components/CommercialBilling";
import { BillingService } from "@/features/vayon/billing/services/billing.service";
export default async function Page(){const data=await new BillingService().dashboard();return <main className="mx-auto max-w-4xl px-5 py-8"><BillingHeader title="Payment Methods" description="Manage payment methods securely in the Stripe Customer Portal."/><PaymentMethodList items={data.paymentMethods}/></main>}
