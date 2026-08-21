import { notFound } from "next/navigation";
import {
  ProviderDetail,
  ProviderReadinessService,
} from "@/features/platform/live-providers";

interface ProviderPageProps {
  params: Promise<{ provider: string }>;
}

export default async function ProviderPage({
  params,
}: ProviderPageProps) {
  const { provider } = await params;
  const model = await new ProviderReadinessService().model(provider);
  if (!model) notFound();
  return <ProviderDetail model={model} />;
}
