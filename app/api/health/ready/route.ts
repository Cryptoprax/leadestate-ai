import { NextResponse } from "next/server";
import { getBuildMetadata } from "@/lib/infrastructure/build-metadata";
import { inspectEnvironment } from "@/lib/infrastructure/environment";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function GET() {
  const started = performance.now();
  const environment = inspectEnvironment();
  try {
    const { error } = await createSupabaseServiceClient().from("subscription_plans").select("id", { head: true, count: "exact" }).limit(1);
    if (error) throw error;
    return NextResponse.json({ status: environment.valid ? "ready" : "degraded", build: getBuildMetadata(), environment: { valid: environment.valid, missingCount: environment.missing.length }, database: { status: "up", latencyMs: Math.round(performance.now() - started) }, providers: { stripe: Boolean(process.env.STRIPE_SECRET_KEY), whatsapp: Boolean(process.env.WHATSAPP_APP_SECRET), openai: Boolean(process.env.OPENAI_API_KEY) } }, { status: environment.valid ? 200 : 503, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ status: "not_ready", build: getBuildMetadata(), environment: { valid: environment.valid, missingCount: environment.missing.length }, database: { status: "down" } }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
