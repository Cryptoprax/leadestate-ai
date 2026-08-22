import { notFound } from "next/navigation";
import { CampaignCalendar } from "@/features/vayon/creative-studio/components/GrowthViews";
import { StudioShell } from "@/features/vayon/creative-studio/components/StudioViews";
import { GrowthStudioService } from "@/features/vayon/creative-studio/growth.service";
import { CreativeStudioService } from "@/features/vayon/creative-studio/service";
export default async function Page() {
  if (!(await CreativeStudioService.production())) notFound();
  const snapshot = await new GrowthStudioService().dashboard();
  return (
    <StudioShell
      title="Campaign Calendar"
      description="Plan channel sequencing and internal approvals. Meta, LinkedIn, Google Ads, YouTube, WhatsApp and Email publishing remain disconnected."
    >
      <CampaignCalendar schedule={snapshot.schedule} />
    </StudioShell>
  );
}
