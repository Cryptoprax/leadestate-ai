import type { Metadata } from "next";
import { DashboardShell } from "@/features/vayon/dashboard/components/DashboardShell";
import { ExecutiveDashboardService } from "@/features/vayon/dashboard/services/executive-dashboard.service";

export const metadata: Metadata = {
  title: "Dashboard | Vayon OS",
  description:
    "Executive business performance, sales, workforce, and activity.",
};

export default async function DashboardPage() {
  const data = await new ExecutiveDashboardService().load();
  return <DashboardShell data={data} />;
}
