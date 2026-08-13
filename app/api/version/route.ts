import { NextResponse } from "next/server";
import { getBuildMetadata } from "@/lib/infrastructure/build-metadata";

export function GET() {
  return NextResponse.json(getBuildMetadata(), { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
}
