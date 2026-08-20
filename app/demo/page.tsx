import type { Metadata } from "next";
import { DemoExperience } from "@/features/vayon/demo-experience/components/DemoExperience";
import { DemoExperienceService } from "@/features/vayon/demo-experience/services/demo-experience.service";
import { MarketingAnalytics } from "@/features/marketing/components/MarketingAnalytics";
import { ConsentManager } from "@/features/platform/conversion-analytics/components/ConsentManager";

export const metadata: Metadata = {
  title: "Vayon OS Demo — Aurora Realty Group",
  description:
    "Explore the isolated, read-only Aurora Realty Group enterprise demo workspace.",
};
export default function DemoPage() {
  return <><MarketingAnalytics /><ConsentManager /><DemoExperience model={new DemoExperienceService().load()} /></>;
}
