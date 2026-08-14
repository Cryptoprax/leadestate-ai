import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("docs");
export default function Page() {
  return <MarketingPage content={marketingPages.docs} />;
}
