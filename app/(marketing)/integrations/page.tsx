import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("integrations");
export default function Page() {
  return <MarketingPage content={marketingPages.integrations} />;
}
