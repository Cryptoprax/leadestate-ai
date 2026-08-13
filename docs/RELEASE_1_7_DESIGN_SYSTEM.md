# Release 1.7 — Vayon Design System

## Overview

The Vayon Design System (VDS) is the official UI infrastructure for future Vayon OS screens. It centralizes semantic tokens, theme contracts, accessible primitives, data display, layouts, motion, icons, and component organization without changing existing business functionality.

VDS lives under `features/platform/design-system`. Existing screens are not bulk-migrated in Release 1.7. The token stylesheet and dark-default theme provider are the only global integrations, preserving the product’s current appearance while making new components theme-aware.

## Architecture

```text
Tokens ─────── Theme Engine
  │                │
  ├── Motion       ├── dark / light / system / custom
  ├── Icons        │
  └── Accessibility helpers
          │
          ▼
 Core / Forms / Disclosure / Feedback / Metrics / Data
          │
          ▼
 Responsive Layout System
```

The public `index.ts` is the stable consumption boundary. Future screens should import from VDS instead of creating screen-specific primitives.

## Design tokens

`vdsTokens` covers:

- semantic colors for background, surfaces, text, primary, accent, status, border, and focus;
- font families, sizes, weights, and line heights;
- spacing and control/content sizing;
- radius and elevation levels;
- shadows and focus elevation;
- opacity states;
- subtle, strong, and focus borders;
- motion durations and easing curves;
- responsive breakpoints;
- semantic z-index layers.

The companion CSS file exposes `--vds-*` properties. Components use semantic variables rather than business-specific colors or data states.

## Theme engine

`VdsThemeProvider` supports dark, light, system, and custom modes. Dark is the global default to prevent visual regressions. System mode uses `useSyncExternalStore` with `prefers-color-scheme`, avoiding duplicate event state. Custom themes provide a stable ID, name, dark/light base, and an allowlisted VDS variable record.

Themes are runtime presentation state only. VDS performs no database or browser persistence. Future company-theme persistence belongs to an authorized configuration provider.

## Component catalog

### Core

Button, IconButton, Card, Panel, Section, and Divider.

### Forms

Input, Textarea, Select, MultiSelect, SearchInput, Checkbox, Radio, and Switch. Components preserve native semantics and forward refs where focus and form integration require them.

### Disclosure and overlays

Tabs, Accordion, Dialog, Drawer, Popover, and Tooltip. Dialog and Drawer trap focus, restore previous focus, close on Escape, expose labelled modal semantics, and support backdrop dismissal. Tabs support Arrow Left and Arrow Right navigation.

### Feedback and identity

Toast, Badge, Avatar, Chip, Tag, Progress, Skeleton, EmptyState, ErrorState, and LoadingState. Live feedback uses status or alert roles. Progress exposes native progressbar properties.

### Executive metrics

KPI Card, Metric Card, Status Card, and Timeline Card. Values remain optional and render an em dash when callers have no authorized data.

## Data components

- `DataTable<T>` provides typed columns, stable row keys, captions, headers, and horizontal overflow.
- `VirtualTable<T>` renders an explicitly supplied visible window without installing a virtualization framework.
- Stat Cards display supplied typed values.
- Chart Placeholder represents future chart-provider boundaries without fabricating points.
- Filters groups arbitrary controls.
- Pagination is controlled and keyboard-native.
- Search Toolbar is controlled and never queries a source directly.

No data component imports repositories, APIs, indexes, business services, or domain models.

## Layout system

- Page supplies narrow, standard, and wide content bounds.
- Dashboard provides responsive metric/widget grids.
- Workspace composes main content and optional sidebar.
- Sidebar and Topbar provide semantic navigation shells.
- Split View supports balanced, primary-heavy, and secondary-heavy layouts.
- Inspector Panel provides a sticky contextual surface.

Layouts accept React content and contain no routing or business assumptions.

## Motion system

Standard motion names cover overlay, drawer, modal, tooltip, dropdown, card, hover, loading, and success. CSS animations share VDS duration and easing intent. Every animation and transition is disabled or reduced under `prefers-reduced-motion: reduce`.

## Accessibility

- Shared high-contrast focus-visible ring.
- Native form and button semantics.
- Required labels for IconButton and Switch.
- Dialog focus trapping and restoration.
- Keyboard tabs, Escape dismissal, native Tab order, and native disclosure controls.
- ARIA dialog, modal, tablist, tab, tabpanel, tooltip, progressbar, alert, and status roles.
- Semantic foreground, muted, border, and focus colors for both theme bases.
- `VisuallyHidden`, `useFocusTrap`, and `useReducedMotion` helpers.

Consumers remain responsible for meaningful labels, logical document heading order, and validating custom-theme contrast.

## Icons

`vdsIcons` defines stable semantic names mapped to the existing Lucide icon library. `registerVdsIcons` creates an immutable extended registry for future modules without mutating the standard catalog.

## Storybook readiness

Components are organized by catalog category and exported from one stable barrel. `vdsStorybookCatalog` declares names, categories, and story readiness so stories can be generated later. Storybook is not installed and no Storybook runtime or configuration is included.

## Boundaries

- No authentication, billing, onboarding, database, migration, or RLS changes.
- No business logic or protected-platform changes.
- No external APIs, AI providers, or database writes.
- No existing screens were redesigned.

## Future readiness

Future releases can add a documentation gallery, automated visual regression, contrast verification, package extraction, company theme validation, Storybook stories, component usage linting, and incremental migration of existing presentation components. Those changes can consume the stable VDS exports and tokens without redesigning the foundation.
