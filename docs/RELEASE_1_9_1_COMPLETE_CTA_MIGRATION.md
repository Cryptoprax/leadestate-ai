# Release 1.9.1 — Complete CTA Migration

## Outcome

All application-owned button elements now consume VDS. The migration converted 151 native button instances and redirected 26 legacy shared-button instances, for 177 button instances in total. Nine navigation CTAs were additionally migrated to `ButtonLink`, which shares the exact VDS action class contract while preserving anchor navigation semantics.

The only native `<button>` implementations left are inside the VDS primitives themselves. `components/ui/Button.tsx` is now a deprecated compatibility re-export and contains no implementation.

## Semantic behavior

Primary actions use the accent background and `onAccent` foreground token. Icons inherit that foreground. Hover, active, disabled, and focus-visible behavior are owned by VDS. Danger, outline, ghost, selected-state, tab, menu, disclosure, icon, and canvas controls use explicit variants rather than inheriting primary presentation.

`ButtonLink` uses the same class generator as `Button`, preventing link-based CTAs from drifting from button styling.

## Enforcement

`npm run audit:cta` scans application TSX for native buttons outside VDS, legacy Button imports, literal white/blue utilities, and the invalid `bg-vds-primary text-vds-foreground` pairing. The audit is included in `npm run validate` and covered by architecture tests.

## Screen coverage

The source audit covers every route and component beneath `app`, `features`, and `components`, including Executive Home, Properties, Leads, Deals, Companies, Contacts, Calendar, Growth, Communications, Timeline, Context, Runtime, Brain, Cognitive, Settings, Team, Universal Bar, dialogs, drawers, forms, and tables.

Production compilation validates every registered Next.js route. Authenticated screenshot capture is intentionally not automated by this release because the repository has no browser-test harness or isolated visual-test credentials; no screenshot result is fabricated.
