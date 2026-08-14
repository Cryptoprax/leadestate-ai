import {
  MarketingPage,
  marketingMetadata,
  marketingPages,
} from "@/features/marketing";
export const metadata = marketingMetadata("communications");
export default function Page() {
  return <MarketingPage content={marketingPages.communications} />;
}
