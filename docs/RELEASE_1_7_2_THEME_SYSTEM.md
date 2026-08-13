# Release 1.7.2 — Theme System

## Theme architecture

Release 1.7.2 upgrades the existing Vayon Design System theme foundation into a production appearance system. It retains one `VdsThemeProvider`, one exported `ThemeContext`, and one semantic token layer.

Supported user modes are Dark, Light, and System. Dark remains the server and first-use default. System mode follows `prefers-color-scheme` continuously, including operating-system changes made while Vayon is open.

```text
ThemeBootstrap (before hydration)
          │
          ▼
Saved browser mode ── or ── dark default
          │
          ▼
VdsThemeProvider + system media subscription
          │
     ┌────┴─────────┐
     ▼              ▼
Header Toggle   Appearance Settings
```

## Tokens

Both themes use the same semantic tokens for background, surface, elevated surface, foreground, muted and subtle text, primary, accent, success, warning, danger, info, borders, focus, and overlay.

The dark theme preserves Vayon’s existing low-light palette. The light theme uses warm parchment and stone neutrals:

- background `#eeeae2`;
- surface `#f7f3ec`;
- elevated surface `#e7e1d7`;
- foreground `#292722`.

It avoids pure black and pure white. Status and focus colors are darkened sufficiently for legibility against warm surfaces.

Global legacy aliases (`--background`, `--foreground`, `--surface`, and `--muted`) now resolve through VDS semantic tokens, allowing VDS-aware global surfaces to follow appearance without rewriting business functionality.

## Theme provider

`VdsThemeProvider` uses two external-store subscriptions:

- browser storage and a same-document theme event for persisted mode changes;
- `matchMedia('(prefers-color-scheme: dark)')` for live system resolution.

The selected mode is stored under `vayon.appearance.theme.v1` in browser `localStorage`. Storage failures degrade safely to in-memory visual state for the current browser rendering cycle. No database, API, cookie, account, organization, or workspace write occurs.

The root dataset contains only the resolved `dark` or `light` theme. Custom VDS themes remain architecture-ready but are not exposed as a production user choice in Release 1.7.2.

## Flash prevention

`ThemeBootstrap` runs in the document head before the application hydrates. It reads the saved browser preference, resolves System with `matchMedia`, and applies `data-vds-theme` and `color-scheme` to the root element. Dark is the failure fallback.

The root layout uses `suppressHydrationWarning` because appearance can legitimately differ between the server’s dark fallback and the browser’s saved/system value.

## Theme toggle

The application header contains a compact Theme Toggle. It cycles Dark → Light → System and uses Moon, Sun, or Laptop iconography for the active mode. Its accessible label announces both the current and next mode.

The toggle uses the same context as Appearance Settings, so there is no parallel theme state.

## Appearance settings

`/vayon/settings/appearance` presents Dark, Light, and System as an accessible radio group. Selection applies immediately and persists locally. The page clearly states that the setting belongs only to the current browser and does not modify workspace or database configuration.

## Motion and accessibility

Theme-aware surfaces transition background, foreground, and border colors over the VDS normal duration and standard easing curve. Transitions activate only after initial theme resolution to avoid animating first paint.

When `prefers-reduced-motion: reduce` is active, theme transitions are reduced to effectively instantaneous changes. Native `color-scheme` follows the resolved theme for browser-controlled form surfaces.

All light and dark modes expose semantic foreground, muted, status, focus, and border tokens. Interactive controls use visible focus rings and meaningful labels. Custom company themes will require future automated contrast validation before production activation.

## Boundaries

- No authentication, billing, onboarding, schema, migration, or RLS changes.
- No business-logic or backend changes.
- No external APIs or AI.
- No database writes.
- Persistence is browser-local only.
