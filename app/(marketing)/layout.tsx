import type { ReactNode } from "react";
import { MarketingShell } from "@/features/marketing";
export default function MarketingLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <MarketingShell>{children}</MarketingShell>;
}
