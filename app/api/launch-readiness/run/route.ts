import { LaunchReadinessService } from "@/features/platform/launch-readiness/services/launch-readiness.service";
export const dynamic = "force-dynamic";
export async function POST() { try { const result = await new LaunchReadinessService().snapshot({ record: true }); return Response.json({ score: result.score, state: result.state, generatedAt: result.generatedAt }, { headers: { "Cache-Control": "private, no-store" } }); } catch { return Response.json({ error: "Launch readiness audit unavailable." }, { status: 403, headers: { "Cache-Control": "private, no-store" } }); } }
