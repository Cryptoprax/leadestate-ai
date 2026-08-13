# Release 1.8.0 — Aurora Realty Group Demo Workspace Foundation

## Company

Aurora Realty Group is a fictional, full-service real estate brokerage and advisory used as Vayon OS’s durable demonstration blueprint. Its mission is to help people and businesses make confident property decisions through trusted expertise, coordinated service, and enduring relationships. Its vision is to build a trusted, regionally connected organization where every property journey feels informed and personal.

The workspace uses India as its regional context, `Asia/Kolkata`, INR, and `en-IN`. Headquarters metadata is placed in Bengaluru, with regional/division placeholders in Bengaluru, Mumbai, Hyderabad, and a multi-region remote office. These are organizational definitions, not addresses or operating records.

## Departments

The hierarchy defines Executive, Sales, Marketing, Operations, Customer Success, Finance, HR, Legal, Technology, and Administration. Every department declares a purpose, responsibilities, manager role, and reporting parent where applicable. No employees or memberships are included.

## Roles

The human role catalog contains CEO, COO, Sales Director, Sales Manager, Sales Agent, Marketing Manager, Marketing Executive, Operations Manager, Operations Executive, Customer Success Manager, Finance Manager, HR Manager, and Office Administrator.

Future AI Executive, Sales, and Operations Advisor roles are reserved as non-executing definitions. They contain no provider, inference, recommendation, or action implementation.

## Offices

The office inventory contains Headquarters, Downtown Branch, Luxury Division, Commercial Division, and Remote Workforce. Location values stop at placeholder city/state/country metadata. No street addresses, coordinates, opening hours, employees, or operational events are fabricated.

## Business Units

Aurora’s business units are Residential, Commercial, Luxury, Rentals, Land, and Investment. Each definition communicates scope only and contains no listings, leads, deals, revenue, targets, or analytics.

## Architecture

The blueprint lives under `features/vayon/demo-workspace` and separates typed domain contracts, immutable configuration, a read-only navigation-context adapter, and local assets. It is not a repository, seed, mock API, database fixture, or Supabase service.

The Product Shell and Executive Home use Aurora only when an authenticated organization is unavailable. A real organization remains authoritative. This makes the blueprint presentation-ready without changing authentication, onboarding, tenancy, or persistence.

Local placeholder assets cover the company logo, office photography, brand imagery, and workspace cover. They are intentionally simple SVG product assets and make no external requests.

Aurora's explicit brand palette is product configuration data, not application theme styling, and is therefore a documented exception to the VDS hardcoded-UI-color audit.

## Future expansion

Later releases may create separately governed demo datasets that reference this blueprint. Those records must preserve tenant isolation, explicit provenance, deterministic reset behavior, and a clear distinction between fictional demonstrations and customer data. This release provides no such records.
