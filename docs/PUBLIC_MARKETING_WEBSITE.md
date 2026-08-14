# Vayon Public Marketing Website

## Scope

The public website is isolated in `features/marketing` and the `app/(marketing)` route group. It shares no repositories, services, business models, authentication components, or application layouts with authenticated Vayon modules.

The existing `/`, `/platform`, and `/demo` routes were preserved. `/platform` remains internal Mission Control and is intentionally excluded from public indexing. `/demo` remains the certified read-only Aurora experience. The existing `/` landing route remains unchanged to honor the no-existing-route-modification boundary.

## Components

- `MarketingShell` provides accessible navigation, skip link, responsive mobile navigation, sales actions, and footer.
- `MarketingPage` provides shared hero, capability, product-preview, architecture, enterprise, CTA, and JSON-LD surfaces.
- `PricingTable` provides an accessible monthly/annual presentation and comparison table without inventing commercial prices.
- Content-specific states cover customers, resources, documentation, blog, careers, and contact without fabricating customers, articles, openings, contact channels, or form handling.

## SEO

Each new page exports static Next.js metadata with title, description, canonical URL, Open Graph fields, and Twitter card fields. Static JSON-LD uses `WebPage` and `WebSite` vocabulary. `app/sitemap.ts` includes indexable public routes, while `app/robots.ts` blocks authenticated Vayon, internal platform, and API paths.

No claim of SOC 2 certification is made. Security messaging describes readiness and architecture only.

## Performance

Pages are Server Components by default. Only the pricing period control is a Client Component. Content is static and build-time renderable, with no data requests, third-party scripts, image payloads, or duplicated per-page layouts.

## Accessibility

The shell includes a skip link, semantic header/navigation/main/footer landmarks, labeled desktop and mobile navigation, keyboard-native disclosure, visible focus treatments, semantic headings, accessible comparison-table structure, and screen-reader alternatives for visual indicators.

## Future CMS strategy

A future CMS adapter should implement a read-only content repository beneath the current immutable page model. Content should be fetched in Server Components, schema-validated, cached with explicit revalidation, previewed through authenticated editorial tooling, and promoted through draft/review/approved/published states. Customer claims, pricing, careers, and security certifications require separate approval workflows. CMS HTML must be sanitized and structured blocks should be preferred over unrestricted rich text.

Blog posts should add stable slugs, authors, reviewed publication timestamps, reading-time calculation from approved content, Article JSON-LD, per-post Open Graph images, RSS, and sitemap entries. None are fabricated in this foundation.

## Sprint 39 recommendation

Resolve ownership of the existing `/` and `/platform` routes before a full launch cutover. Then add approved brand media, verified commercial packaging, privacy-reviewed contact capture, consent-based newsletter infrastructure, CMS-backed editorial workflow, and automated accessibility/performance/browser certification.
