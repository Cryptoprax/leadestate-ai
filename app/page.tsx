import { MarketingShell } from "@/features/marketing";
import { Homepage } from "@/features/marketing/components/Homepage";
import { MarketingAnalytics } from "@/features/marketing/components/MarketingAnalytics";
import { ConsentManager } from "@/features/platform/conversion-analytics/components/ConsentManager";

export default function Home() {
  return <MarketingShell><MarketingAnalytics /><ConsentManager /><Homepage /></MarketingShell>;
}
