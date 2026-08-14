import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("resources");
export default function Page() {
  return <MarketingPage content={marketingPages.resources} />;
}
