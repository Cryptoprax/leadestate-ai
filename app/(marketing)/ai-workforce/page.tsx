import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("ai-workforce");
export default function Page() {
  return <MarketingPage content={marketingPages["ai-workforce"]} />;
}
