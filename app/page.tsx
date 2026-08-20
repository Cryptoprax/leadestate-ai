import { MarketingShell } from "@/features/marketing";
import { Homepage } from "@/features/marketing/components/Homepage";
import { MarketingAnalytics } from "@/features/marketing/components/MarketingAnalytics";

export default function Home() {
  return <MarketingShell><MarketingAnalytics /><Homepage /></MarketingShell>;
}
