import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("customers");
export default function Page() {
  return <MarketingPage content={marketingPages.customers} />;
}
