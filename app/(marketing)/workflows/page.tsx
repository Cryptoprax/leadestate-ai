import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("workflows");
export default function Page() {
  return <MarketingPage content={marketingPages.workflows} />;
}
