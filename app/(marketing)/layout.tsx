import type { ReactNode } from "react";
import { MarketingShell } from "@/features/marketing";
import { MarketingAnalytics } from "@/features/marketing/components/MarketingAnalytics";
import { ConsentManager } from "@/features/platform/conversion-analytics/components/ConsentManager";
export default function MarketingLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <MarketingShell><MarketingAnalytics /><ConsentManager />{children}</MarketingShell>;
}
