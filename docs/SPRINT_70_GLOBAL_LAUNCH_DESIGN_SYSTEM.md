# Sprint 70 — Global Launch Experience and Enterprise Design System

Sprint 70 establishes Vayon's permanent visual language without changing backend behavior, authentication contracts, provider integrations, database schema, or tenant governance.

## Brand system

Vayon is positioned as **the AI operating system for modern businesses**. The launch experience explains the connected AI workforce, CRM, communications, knowledge, automation, analytics, and governance within the opening viewport.

The dark foundation uses the approved near-black surfaces, deep emerald primary action, restrained cyan secondary accent, and semantic success, warning, and error colors. Colors, spacing, radii, elevation, typography, and motion remain centralized in VDS tokens. Product and public surfaces inherit the same system.

## Experience changes

- Rebuilt sticky global navigation and responsive mobile menu.
- Rebuilt the homepage hero, animated product preview, trust strip, AI workforce explorer, comparison, capabilities, workflow, security, and final conversion section.
- Expanded the global footer into platform, resources, developer, enterprise, company, and legal navigation.
- Rebuilt authentication presentation as a responsive split layout while retaining the existing Supabase actions.
- Added Framer Motion only to isolated reveal and workflow components; server rendering remains the default.
- Honored `prefers-reduced-motion`, semantic focus states, keyboard navigation, and labelled navigation landmarks.
- Preserved canonical metadata, Open Graph, JSON-LD, sitemap, and robots contracts.

Microsoft login and magic-link controls were not fabricated because those actions do not exist in the current authentication service. They should appear only when their real provider-backed flows are implemented.

## Performance boundary

The page is server-rendered except for small motion islands. It uses no remote imagery, avoids layout-dependent image downloads, and preserves Next.js font self-hosting. Motion is viewport-triggered and runs once. Existing route code splitting remains unchanged.
