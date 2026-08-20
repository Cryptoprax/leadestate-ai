import { z } from "zod";
import { SupabaseMarketingProvider } from "@/features/marketing/providers/supabase-marketing.provider";

const schema = z.object({
  type: z.enum(["page_view", "cta_click", "demo_request", "trial_signup", "contact_sales", "newsletter", "demo_launch", "roi_calculation", "industry_view", "comparison_view", "marketing_conversion", "web_vital", "tracking_failure"]),
  path: z.string().max(300),
  sessionId: z.string().uuid(),
  metadata: z.record(z.string(), z.string().max(200)).optional(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return new Response(null, { status: 400 });
  try {
    await new SupabaseMarketingProvider().record(parsed.data);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
