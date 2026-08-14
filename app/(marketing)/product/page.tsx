import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("product");
export default function Page() {
  return <MarketingPage content={marketingPages.product} />;
}
