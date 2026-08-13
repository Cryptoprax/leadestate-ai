import { NextResponse } from "next/server";
import { getBuildMetadata } from "@/lib/infrastructure/build-metadata";

export function GET() {
  return NextResponse.json({ status: "ok", build: getBuildMetadata(), timestamp: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
