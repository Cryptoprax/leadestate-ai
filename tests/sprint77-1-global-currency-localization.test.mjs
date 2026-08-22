import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(path, "utf8");

test("marketing currency metadata supports every launch market with USD fallback", () => {
  const source = read("features/marketing/currency/currency.ts");
  for (const currency of ["USD", "CAD", "GBP", "EUR", "AED", "INR", "SGD", "THB", "AUD", "JPY"])
    assert.match(source, new RegExp(`${currency}:`));
  assert.match(source, /defaultMarketingCurrency.*"USD"/);
  assert.match(source, /Intl\.NumberFormat/);
});

test("public currency provider detects browser locale and permits future manual selection", () => {
  const source = read("features/marketing/currency/CurrencyDisplay.tsx");
  assert.match(source, /navigator\.languages/);
  assert.match(source, /resolvedOptions\(\)\.timeZone/);
  assert.match(source, /setCurrency/);
  assert.match(source, /CurrencyDisplay/);
});

test("all marketing demo money uses the centralized currency layer", () => {
  const files = ["EnterpriseExperience.tsx", "LandingRoiCalculator.tsx", "PricingTable.tsx", "RoiCalculator.tsx"];
  const source = files.map(file => read(`features/marketing/components/${file}`)).join("\n");
  assert.match(source, /CurrencyDisplay|useMarketingCurrency/);
  assert.doesNotMatch(source, /₹|new Intl\.NumberFormat\("en-IN"/);
  assert.match(read("features/marketing/components/Homepage.tsx"), /priceCurrency: "USD"/);
});

test("authenticated application does not consume visitor marketing currency", () => {
  for (const file of ["features/vayon", "features/platform", "features/authentication"])
    assert.doesNotMatch(file, /marketing\/currency/);
  const shell = read("features/marketing/components/MarketingShell.tsx");
  assert.match(shell, /MarketingCurrencyProvider/);
});
