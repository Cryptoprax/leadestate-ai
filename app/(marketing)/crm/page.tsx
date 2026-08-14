import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("crm");
export default function Page() {
  return <MarketingPage content={marketingPages.crm} />;
}
