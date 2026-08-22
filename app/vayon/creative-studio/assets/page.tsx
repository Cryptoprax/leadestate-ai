import { notFound } from "next/navigation";
import { CreativeStudioService } from "@/features/vayon/creative-studio/service";
import { AssetLibrary, StudioShell } from "@/features/vayon/creative-studio/components/StudioViews";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const service = await CreativeStudioService.production();
  if (!service) notFound();
  const raw = (await searchParams).q;
  const query = typeof raw === "string" ? raw : "";
  return (
    <StudioShell
      title="Creative Asset Library"
      description="Search draft flyers, videos, brochures, images, social posts, presentations and campaigns with complete version lineage."
    >
      <AssetLibrary snapshot={await service.snapshot()} query={query} />
    </StudioShell>
  );
}
