# Release 1.7.5 — Vayon OS Product Experience

## Application shell

Every authenticated `/vayon` route is framed by one persistent VDS shell: a fixed top header, fixed collapsible sidebar, breadcrumb band, scrollable page content, navigation-only quick create, and a reserved right-rail boundary. Existing pages and domain behavior remain unchanged.

## Sidebar philosophy and hierarchy

Navigation describes customer work rather than platform implementation. Home, CRM, Operations, Growth, Communications, AI, and Platform are always discoverable. Developer Mode contains Brain, Runtime, Cognitive, Context, Intelligence, Timeline architecture, and other architecture surfaces and starts collapsed.

The desktop sidebar supports expanded and icon-only modes. Collapse state is stored under `vayon.shell.sidebar.collapsed.v1` in browser storage. Mobile uses a modal-style drawer and backdrop. Disabled destinations are visibly labelled and never navigate.

## Top header and workspace switcher

The header contains the Vayon identity, a read-only workspace selector, exactly one Universal Bar entry point, Help, notifications, theme control, and profile navigation. The switcher displays the current organization-backed workspace, an empty recent-workspace state, and a disabled creation action. No switching or persistence service is introduced.

## Universal Bar

The existing provider-neutral Universal Bar remains the only global search entry. Its trigger reads “Ask, search or create anything...” and retains mouse, Ctrl+K, Cmd+K, focus restoration, keyboard result traversal, and Escape handling.

## Developer Mode

Architecture-first pages remain routable and searchable but no longer compete with daily business navigation. The sidebar places them under a collapsed Developer section so customer workflows remain primary.

## Responsive behavior

- Desktop: fixed header, persistent sidebar, adaptive content inset.
- Tablet: compact header controls and responsive page padding.
- Mobile: off-canvas navigation, backdrop dismissal, compact Vayon mark, and fixed quick-create control.
- A future right utility rail is structurally possible without changing page content contracts.

## Accessibility

The shell provides a skip link, landmark labels, `aria-current`, expanded states, dialog/menu semantics, Escape dismissal, focus-visible VDS rings, descriptive disabled states, tooltip titles in icon-only mode, and reduced-motion behavior inherited from VDS.

## Future extensibility

Shell navigation is a typed configuration independent from business services. Future permissions, workspace switching, notification providers, utility rail widgets, and product routes can attach at the shell boundary without changing CRM modules.
