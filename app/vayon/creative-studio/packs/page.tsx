import { notFound } from "next/navigation";
import { CampaignPacks } from "@/features/vayon/creative-studio/components/GrowthViews";
import { StudioShell } from "@/features/vayon/creative-studio/components/StudioViews";
import { GrowthStudioService } from "@/features/vayon/creative-studio/growth.service";
import { CreativeStudioService } from "@/features/vayon/creative-studio/service";
export default async function Page() {
  if (!(await CreativeStudioService.production())) notFound();
  const snapshot = await new GrowthStudioService().dashboard();
  return (
    <StudioShell
      title="Campaign Packs"
      description="Organize print, social, video, sales, website, landing-page and sales-kit drafts by project, language, version and approval state."
    >
      <CampaignPacks packs={snapshot.packs} />
    </StudioShell>
  );
}
