import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");

test("public demo reuses the Sprint 77.1 marketing currency provider", () => {
  const page = read("app/demo/page.tsx"), experience = read("features/vayon/demo-experience/components/DemoExperience.tsx");
  assert.match(page, /MarketingCurrencyProvider/);
  assert.match(experience, /useMarketingCurrency/);
  assert.match(experience, /currency/);
  assert.match(experience, /format/);
  assert.match(experience, /toLocal/);
  assert.doesNotMatch(page, /createContext|Intl\.NumberFormat/);
});

test("demo data normalizes source fixtures to USD before browser localization", () => {
  const service = read("features/vayon/demo-experience/services/demo-experience.service.ts"), repository = read("features/vayon/demo-experience/repository/aurora-demo.repository.ts"), enterprise = read("features/vayon/demo-experience/repository/aurora-enterprise.repository.ts");
  assert.match(service, /convertToUsd/);
  assert.match(service, /currency:\s*"USD"/);
  assert.match(service, /formatMarketingCurrency/);
  assert.match(repository, /monetaryRangeUsd/);
  assert.match(enterprise, /monetaryValueUsd/);
  assert.doesNotMatch(`${service}\n${repository}\n${enterprise}`, /₹/);
  assert.doesNotMatch(service, /new Intl\.NumberFormat/);
});

test("every public demo monetary surface derives from localized numeric values", () => {
  const experience = read("features/vayon/demo-experience/components/DemoExperience.tsx");
  for (const value of ["kpis", "pipeline", "charts", "monetaryRangeUsd", "monetaryValueUsd", "aiPrompts"]) assert.match(experience, new RegExp(value));
  assert.match(experience, /format\(metric\.value, true\)/);
  assert.match(experience, /toLocal\(item\.value\)/);
  assert.doesNotMatch(experience, /₹|currency:\s*"INR"|new Intl\.NumberFormat/);
});

test("shared currency metadata remains the only localization implementation", () => {
  const currency = read("features/marketing/currency/currency.ts");
  for (const code of ["USD", "CAD", "GBP", "EUR", "AED", "INR", "SGD", "THB", "AUD", "JPY"]) assert.match(currency, new RegExp(`${code}:`));
  assert.match(currency, /defaultMarketingCurrency:\s*MarketingCurrency\s*=\s*"USD"/);
  assert.match(currency, /detectMarketingCurrency/);
  assert.match(currency, /timezoneCurrency/);
});
