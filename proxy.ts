import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshSession } from "@/lib/supabase/proxy";

const WEBHOOK_PATH_PREFIX = "/api/webhooks/";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/api/webhooks" || path.startsWith(WEBHOOK_PATH_PREFIX)) {
    return NextResponse.next();
  }

  return refreshSession(request);
}

export const config = {
  matcher: [
    "/((?!api/webhooks(?:/|$)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
