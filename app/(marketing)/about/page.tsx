import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("about");
export default function Page() {
  return <MarketingPage content={marketingPages.about} />;
}
