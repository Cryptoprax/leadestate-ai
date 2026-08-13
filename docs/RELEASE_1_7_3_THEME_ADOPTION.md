# Release 1.7.3 — Complete Theme Adoption

## Outcome

Vayon OS application UI now consumes semantic VDS appearance tokens. Dark, light, and system modes propagate through application shells, pages, navigation, cards, forms, overlays, dialogs, loading states, and platform workbenches without changing their behavior.

## Audit and migration

The initial audit covered 868 TypeScript and CSS files. Legacy neutral utilities appeared in 163–199 files by color role, with fixed hexadecimal or RGB values in 80 files. The migration converted application UI styling to `vds-*` semantic utilities and CSS variables while retaining existing layout, component boundaries, ARIA, routes, and event handlers.

Covered surfaces include Executive Home, Universal Bar, Timeline, Unified Context, Growth, Communications, Workforce, Brain, Cognitive Engine, Runtime, Universal Objects, properties, leads, deals, calendar, settings, configuration, team, authentication, onboarding, landing, loading and error states, current navigation, dashboard shells, dialogs, drawers, search overlays, and shared VDS components.

## Semantic token rules

- Use `bg-vds-background` for the application canvas.
- Use `bg-vds-surface`, `bg-vds-elevated`, `bg-vds-hover`, and `bg-vds-input` according to elevation and interaction.
- Use `text-vds-foreground`, `text-vds-secondary`, `text-vds-muted`, and `text-vds-subtle` for hierarchy.
- Use `border-vds-border`, `border-vds-border-strong`, and `divide-vds-divider` for structure.
- Use primary, accent, success, warning, danger, and info tokens for meaning. Their `*-soft` variants provide low-emphasis backgrounds.
- Use `bg-vds-overlay`, `outline-vds-focus`, `bg-vds-skeleton`, and `bg-vds-tooltip` for overlays and feedback.
- Never add fixed Tailwind palette utilities or literal UI colors when a semantic role exists.

Theme definitions, company-configurable brand values, status-color configuration data, and manifest metadata remain explicit values because they are data rather than rendered application-theme styling.

## Global behavior

Theme-aware selection, focus rings, skeletons, shadows, and scrollbars are defined globally. The pre-hydration bootstrap applies the persisted or system-resolved theme before React hydration. Transitions use semantic variables and collapse under `prefers-reduced-motion`.

## Developer guardrail

Run `npm run audit:theme`. The audit rejects fixed Tailwind palette utilities and literal hexadecimal/RGB colors in application UI source. The narrowly documented exceptions are token definitions, theme preview data, configurable workflow colors, branding data, and manifest metadata.

## Remaining exceptions

There are no partially themed application UI components. Explicit color data remains only in the documented configuration and token-definition boundaries above.

## Future UI guidance

New components should select tokens by purpose, not by visual shade. Add a semantic token centrally when a new reusable state is required. Do not encode dark- or light-specific assumptions inside component markup.
