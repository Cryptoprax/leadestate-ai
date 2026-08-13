# Release 1.9 — Commercial Readiness and UX Polish

## Executive summary

Release 1.9 establishes a shared commercial-quality presentation baseline across every authenticated Vayon route. It is a UI-only refinement: authentication, billing, onboarding, business services, persistence, routes, and platform contracts remain unchanged.

## Screen audit

The review covered the Executive Home, Sales, Properties, Contacts and Companies, Activities, Growth, Communications, Workforce, Timeline, Context, Configuration, Team, and Settings experiences. Each route continues to render through the existing product shell. Shared shell-level rules provide consistent page gutters, maximum content width, vertical rhythm, typography, interactive sizing, tables, and responsive dialogs without duplicating those rules in every feature.

## VDS standards

- Page content uses responsive 16px mobile and 24px desktop gutters with a 100rem large-monitor ceiling.
- `PageHeader` provides a reusable eyebrow, title, description, and action arrangement.
- Headings use one responsive hierarchy; descriptive copy uses the semantic muted token.
- Cards and panels use the VDS border, surface, radius, shadow, and responsive padding scale.
- Primary actions use the accent surface with the semantic `onAccent` foreground. Secondary, outline, ghost, and danger actions share one sizing and focus model.
- Inputs and actionable controls provide at least a 44px touch target. Disabled states remain visibly and semantically distinct.
- Data tables provide overflow containment, sticky headers, tabular numbers, consistent row density, and hover/focus feedback.
- Product icons use only the approved 16px, 18px, 20px, and 24px sizes.

## Themes and semantic color

Dark remains the default. Dark and warm-neutral light themes expose a dedicated `onAccent` token so text remains intentional on primary and destructive actions. Product surfaces use VDS semantic tokens rather than black/white utility colors. The existing system-theme behavior and local preference persistence are unchanged.

## Responsive behavior

The product shell retains its desktop sidebar, tablet behavior, and mobile drawer. Route content is min-width safe and centrally constrained on large monitors. Dialogs and drawers scroll within the viewport, use responsive padding, and preserve full-width mobile presentation. Tables remain horizontally navigable where their data cannot collapse safely.

## Interaction states

- `app/vayon/loading.tsx` supplies the shared route loading skeleton.
- `app/vayon/error.tsx` supplies recoverable route failure handling.
- VDS `EmptyState`, `ErrorState`, `LoadingState`, `Skeleton`, and `Toast` cover content-level feedback.
- Existing feedback query parameters continue to provide success confirmation after mutations.
- Overlay, modal, drawer, dropdown, card, loading, and success motion use the VDS motion system and respect reduced-motion preferences.

## Accessibility

The shell retains its skip link and semantic main landmark. VDS focus rings are visible in both themes. Tabs support arrow navigation; dialogs and drawers trap focus, close with Escape, and expose ARIA labels. Touch controls use a minimum 44px target. Color remains semantic and is never the only state carrier in the shared feedback components.

## Enforcement

`npm run audit:ux` scans authenticated app and platform UI sources for non-approved explicit icon sizes and hardcoded black/white appearance utilities. Architecture tests verify the product scope, VDS primitives, feedback states, responsive overlays, accessibility, semantic tokens, documentation, and absence of business/data integrations in the release infrastructure.

## Future readiness

Future screens should start with VDS `Page`, `PageHeader`, surfaces, actions, fields, data primitives, and feedback states. Feature-specific visual compositions may remain independent, but should consume semantic tokens and the shared spacing, interaction, and accessibility contracts documented here.
