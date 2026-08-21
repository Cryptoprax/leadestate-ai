import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "./config";
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/demo",
  "/product",
  "/ai-workforce",
  "/crm",
  "/properties",
  "/deals",
  "/communications",
  "/calendar",
  "/workflows",
  "/integrations",
  "/security",
  "/enterprise",
  "/pricing",
  "/customers",
  "/resources",
  "/blog",
  "/docs",
  "/about",
  "/careers",
  "/contact",
];
export async function refreshSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/api/webhooks" || path.startsWith("/api/webhooks/")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const { url, key } = getSupabaseConfig();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        values.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isPublic = PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(route + "/"),
  );
  if (!user && !isPublic) {
    const target = request.nextUrl.clone();
    target.pathname = "/login";
    target.searchParams.set("next", path);
    return NextResponse.redirect(target);
  }
  if (user && (path === "/login" || path === "/signup")) {
    const target = request.nextUrl.clone();
    target.pathname = "/vayon";
    target.search = "";
    return NextResponse.redirect(target);
  }
  if (user && path !== "/onboarding" && !path.startsWith("/auth/")) {
    const { data: membership, error } = await supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .limit(1)
      .maybeSingle();
    if (!error && !membership) {
      const target = request.nextUrl.clone();
      target.pathname = "/onboarding";
      target.search = "";
      return NextResponse.redirect(target);
    }
  }
  return response;
}
