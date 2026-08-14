import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("properties");
export default function Page() {
  return <MarketingPage content={marketingPages.properties} />;
}
