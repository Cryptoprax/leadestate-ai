import { BrowserDemoObservabilityProvider } from "../providers/browser-demo-observability.provider";
export class DemoObservabilityService {
  constructor(private provider = new BrowserDemoObservabilityProvider()) {}
  launch(page: string) {
    const value = this.provider.read();
    this.provider.write({
      ...value,
      launches: value.launches + 1,
      pageViews: {
        ...value.pageViews,
        [page]: (value.pageViews[page] ?? 0) + 1,
      },
    });
  }
  view(page: string) {
    const value = this.provider.read();
    this.provider.write({
      ...value,
      pageViews: {
        ...value.pageViews,
        [page]: (value.pageViews[page] ?? 0) + 1,
      },
    });
  }
  reset() {
    const value = this.provider.read();
    this.provider.write({ ...value, resets: value.resets + 1 });
  }
  completeTour() {
    const value = this.provider.read();
    this.provider.write({
      ...value,
      tourCompletions: value.tourCompletions + 1,
    });
  }
}
