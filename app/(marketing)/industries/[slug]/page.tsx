import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryLanding } from "@/features/marketing/components/AssetPages";
import { MarketingAssetsService } from "@/features/marketing/services/marketing-assets.service";
const service = new MarketingAssetsService();
export function generateStaticParams() {
  return service.catalog().industries.map((x) => ({ slug: x.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    page = service.industry(slug);
  return page
    ? {
        title: `VAYON for ${page.name}`,
        description: page.description,
        alternates: { canonical: `/industries/${slug}` },
        openGraph: {
          title: `VAYON for ${page.name}`,
          description: page.description,
          url: `/industries/${slug}`,
        },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = service.industry((await params).slug);
  if (!page) notFound();
  return <IndustryLanding page={page} />;
}
