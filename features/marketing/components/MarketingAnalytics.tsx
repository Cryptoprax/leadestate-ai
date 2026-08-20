"use client";
import { useEffect } from "react";

type EventType = "page_view" | "cta_click" | "demo_launch" | "industry_view" | "comparison_view" | "marketing_conversion";
export function MarketingAnalytics() {
  useEffect(() => {
    const key = "vayon-marketing-session", sessionId = sessionStorage.getItem(key) ?? crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
    const send = (type: EventType, metadata?: Record<string, string>) => navigator.sendBeacon("/api/marketing/events", JSON.stringify({ type, path: location.pathname, sessionId, metadata }));
    send("page_view");
    if (location.pathname.startsWith("/industries/")) send("industry_view");
    if (location.pathname.startsWith("/compare/")) send("comparison_view");
    if (location.pathname === "/demo") send("demo_launch");
    const click = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const text = link.textContent?.trim().toLowerCase() ?? "";
      if (/demo|trial|sales|launch workspace|get started|contact/.test(text)) {
        const metadata = { destination: link.getAttribute("href") ?? "unknown" };
        send("cta_click", metadata);
        send("marketing_conversion", metadata);
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
