import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("deals");
export default function Page() {
  return <MarketingPage content={marketingPages.deals} />;
}
