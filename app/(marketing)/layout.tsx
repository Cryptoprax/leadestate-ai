import type { ReactNode } from "react";
import { MarketingShell } from "@/features/marketing";
import { MarketingAnalytics } from "@/features/marketing/components/MarketingAnalytics";
export default function MarketingLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <MarketingShell><MarketingAnalytics />{children}</MarketingShell>;
}
