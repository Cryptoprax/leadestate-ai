import { notFound } from "next/navigation";
import {
  ProviderDetail,
  ProviderReadinessService,
} from "@/features/platform/live-providers";

export default async function ProviderPage({
  params,
}: PageProps<"/vayon/providers/[provider]">) {
  const { provider } = await params;
  const model = await new ProviderReadinessService().model(provider);
  if (!model) notFound();
  return <ProviderDetail model={model} />;
}
