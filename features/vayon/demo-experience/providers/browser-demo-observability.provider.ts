export interface DemoTelemetry {
  launches: number;
  resets: number;
  tourCompletions: number;
  pageViews: Readonly<Record<string, number>>;
}
const key = "vayon-demo-observability";
export class BrowserDemoObservabilityProvider {
  read(): DemoTelemetry {
    if (typeof window === "undefined")
      return { launches: 0, resets: 0, tourCompletions: 0, pageViews: {} };
    try {
      return JSON.parse(sessionStorage.getItem(key) ?? "") as DemoTelemetry;
    } catch {
      return { launches: 0, resets: 0, tourCompletions: 0, pageViews: {} };
    }
  }
  write(value: DemoTelemetry) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
