import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
const read = path => readFileSync(path, "utf8");

test("hero defines the AI operating system category for real estate", () => {
  const source = read("features/marketing/components/Homepage.tsx");
  assert.match(source, /The World&apos;s Most Advanced AI Operating System for Real Estate/);
  for (const item of ["AI Employees", "CRM", "WhatsApp", "Voice AI", "Marketing Automation", "Property Intelligence", "Analytics", "Enterprise Security", "Start Free", "Book Enterprise Demo", "Watch Product Tour"]) assert.match(source, new RegExp(item));
});

test("product preview shows actual real estate operating modules", () => {
  const source = read("features/marketing/components/EnterpriseExperience.tsx");
  for (const item of ["CRM", "AI Employees", "WhatsApp", "Analytics", "Deals", "Leads", "Voice AI", "Approvals", "Executive Dashboard", "Property Intelligence"]) assert.match(source, new RegExp(item));
});

test("workforce roles explain real estate outcomes and daily work", () => {
  const source = read("features/marketing/components/EnterpriseExperience.tsx");
  for (const employee of ["AI Sales Employee", "AI Marketing Employee", "AI CRM Employee", "AI WhatsApp Employee", "AI Voice Employee", "AI Executive Assistant", "AI Property Specialist", "AI Operations Manager"]) assert.match(source, new RegExp(employee));
  for (const capability of ["Lead scoring", "Campaigns", "Data health", "Qualification", "Call prep", "Briefings", "Matching", "Bottlenecks"]) assert.match(source, new RegExp(capability));
});

test("story covers feature grid comparison audiences workflow wins and ecosystem", () => {
  const source = read("features/marketing/components/Homepage.tsx");
  for (const item of ["Everything Your Real Estate Company Needs", "Stop Paying For 15 Different Tools", "Traditional Stack", "Built Specifically For Real Estate", "Residential Developers", "Luxury Brokers", "Property Management Companies", "How Vayon Works", "AI Recommends Properties", "AI Sends WhatsApp", "Deal Closed", "Reduce response time", "Never lose a lead", "Scale without hiring", "Product ecosystem", "Document Intelligence"]) assert.match(source, new RegExp(item));
});

test("enterprise trust pricing FAQ navigation and SEO are preserved", () => {
  const homepage = read("features/marketing/components/Homepage.tsx"), pricing = read("features/marketing/components/PricingTable.tsx"), shell = read("features/marketing/components/MarketingShell.tsx"), layout = read("app/layout.tsx");
  for (const item of ["Workspace Isolation", "Role Based Access", "Approval Workflows", "Audit Logs", "Encrypted Credentials", "Enterprise APIs", "Multi Tenant Architecture"]) assert.match(homepage, new RegExp(item));
  for (const plan of ["Starter", "Growth", "Enterprise"]) assert.match(pricing, new RegExp(plan));
  for (const nav of ["Product", "AI Employees", "Solutions", "Industries", "Customers", "Pricing", "Resources", "Enterprise", "Developers"]) assert.match(shell, new RegExp(nav));
  assert.match(homepage, /FAQPage/); assert.match(homepage, /SoftwareApplication/); assert.match(layout, /real estate/i);
});

test("Sprint 72 introduces no backend or schema artifact", () => {
  assert.equal(existsSync("docs/SPRINT_72_POSITIONING_AND_CONVERSION.md"), true);
  assert.equal(existsSync("supabase/migrations/20260904000000_sprint72.sql"), false);
});
