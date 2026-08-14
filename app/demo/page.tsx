import type { Metadata } from "next";
import { DemoExperience } from "@/features/vayon/demo-experience/components/DemoExperience";
import { DemoExperienceService } from "@/features/vayon/demo-experience/services/demo-experience.service";

export const metadata: Metadata = {
  title: "Vayon OS Demo — Aurora Realty Group",
  description:
    "Explore the isolated, read-only Aurora Realty Group enterprise demo workspace.",
};
export default function DemoPage() {
  return <DemoExperience model={new DemoExperienceService().load()} />;
}
