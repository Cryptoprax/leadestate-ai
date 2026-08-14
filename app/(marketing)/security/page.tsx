import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("security");
export default function Page() {
  return <MarketingPage content={marketingPages.security} />;
}
