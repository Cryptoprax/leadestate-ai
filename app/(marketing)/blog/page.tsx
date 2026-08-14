import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("blog");
export default function Page() {
  return <MarketingPage content={marketingPages.blog} />;
}
