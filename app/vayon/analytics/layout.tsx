import type { ReactNode } from "react";
import { AnalyticsShell } from "@/features/vayon/analytics-platform/components/AnalyticsViews";
export default function Layout({ children }: { children: ReactNode }) {
  return <AnalyticsShell>{children}</AnalyticsShell>;
}
