import type { Metadata } from "next";
import { PublicContentPage } from "@/features/marketing/components/PublicContentPage";
import { MarketingService } from "@/features/marketing/services/marketing.service";
const page = new MarketingService().page("solutions");
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: page.title,
    description: page.description,
    url: "/solutions",
  },
};
export default function Page() {
  return <PublicContentPage page={page} />;
}
