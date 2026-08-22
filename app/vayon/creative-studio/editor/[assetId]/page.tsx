import { notFound } from "next/navigation";
import { CreativeEditor } from "@/features/vayon/creative-studio/components/CreativeEditor";
import { StudioShell } from "@/features/vayon/creative-studio/components/StudioViews";
import { creativeEditorDocument } from "@/features/vayon/creative-studio/editor.service";

export default async function Page({ params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await params;
  const model = await creativeEditorDocument(assetId);
  if (!model) notFound();
  return <StudioShell title={model.asset.name} description={`${model.asset.format} · ${model.asset.status} · Version ${model.asset.version}. ${model.asset.reasoningSummary ?? "AI composition summary unavailable."}`}><CreativeEditor document={model.document} imageUrl={model.asset.imageUrl} /></StudioShell>;
}
