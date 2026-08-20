"use client";
import { useEffect } from "react";
import { readConsent } from "@/features/platform/conversion-analytics/components/ConsentManager";

type EventType = "page_view" | "cta_click" | "demo_launch" | "industry_view" | "comparison_view" | "marketing_conversion" | "web_vital" | "tracking_failure";
export function MarketingAnalytics() {
  useEffect(() => {
    let observers: PerformanceObserver[] = [];
    const start = () => {
      if (!readConsent()?.analytics) return;
      const key = "vayon-marketing-session", sessionId = sessionStorage.getItem(key) ?? crypto.randomUUID();
      sessionStorage.setItem(key, sessionId);
      const send = (type: EventType, metadata?: Record<string, string>) => navigator.sendBeacon("/api/marketing/events", JSON.stringify({ type, path: location.pathname, sessionId, metadata }));
      send("page_view");
      if (location.pathname.startsWith("/industries/")) send("industry_view");
      if (location.pathname.startsWith("/compare/")) send("comparison_view");
      if (location.pathname === "/demo") send("demo_launch");
      const metric = (name:string,value:number) => send("web_vital",{name,value:String(Math.round(value))});
      try {
        let cls=0;
        for(const type of ["largest-contentful-paint","layout-shift","event"]){const observer=new PerformanceObserver(list=>{for(const entry of list.getEntries()){if(type==="largest-contentful-paint")metric("LCP",entry.startTime);else if(type==="layout-shift"&&!((entry as PerformanceEntry&{hadRecentInput?:boolean}).hadRecentInput)){cls+=(entry as PerformanceEntry&{value?:number}).value??0;metric("CLS",cls)}else if(type==="event"&&(entry as PerformanceEntry&{duration?:number}).duration)metric("INP",(entry as PerformanceEntry&{duration:number}).duration)}});observer.observe({type,buffered:true});observers.push(observer)}
        const navigation=performance.getEntriesByType("navigation")[0]as PerformanceNavigationTiming|undefined;if(navigation)metric("TTI",navigation.domInteractive);
      } catch { send("tracking_failure",{component:"web-vitals"}) }
      const click = (event: MouseEvent) => {const link=(event.target as Element|null)?.closest("a");if(!link)return;const text=link.textContent?.trim().toLowerCase()??"";if(/demo|trial|sales|launch workspace|get started|contact|download/.test(text)){const metadata={destination:link.getAttribute("href")??"unknown"};send("cta_click",metadata);send("marketing_conversion",metadata)}};
      document.addEventListener("click",click);
      return()=>document.removeEventListener("click",click);
    };
    let cleanup=start();
    const consent=()=>{cleanup?.();observers.forEach(observer=>observer.disconnect());observers=[];cleanup=start()};
    addEventListener("vayon:consent",consent);
    return()=>{cleanup?.();observers.forEach(observer=>observer.disconnect());removeEventListener("vayon:consent",consent)};
  }, []);
  return null;
}
