import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("calendar");
export default function Page() {
  return <MarketingPage content={marketingPages.calendar} />;
}
