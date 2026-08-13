# Release 1.6 — Vayon Universal Bar

## Overview

The Vayon Universal Bar is the single global entry point for search, navigation, quick-create routing, commands, local history, previews, and a reserved future AI mode. It is always visible in the authenticated Vayon header and expands into one responsive glass overlay.

Release 1.6 removes the separate Universal Objects search overlay from the global layout and replaces the previous header command palette. Existing underlying modules remain unchanged.

## Architecture

```text
Always-visible Universal Bar
           │
           ▼
Deterministic Intent Router
 Search / Open / Create / Navigate / Recent / Favorites
           │
      ┌────┴─────────┐
      ▼              ▼
Provider-neutral   Local history
search contracts   metadata only
      │
      ▼
Navigation / quick-create results → existing routes only
```

The feature package separates domain contracts, provider ports, deterministic services, static configuration, local storage, provider implementations, components, and public types. It has no database, index, API, or AI dependency.

## Interaction model

The collapsed bar is permanently visible between the Vayon identity and notifications. Clicking it or pressing Ctrl+K/Cmd+K opens the same overlay and focuses its input.

The overlay has three modes:

- Search combines local provider-neutral navigation and search results.
- Actions emphasizes quick-create routes and commands.
- Ask is visible but disabled until future workspace AI activation.

There is no parallel search modal or command palette mounted in the Vayon layout.

## Search architecture

`UniversalSearchProvider` accepts a query, allowed scopes, and result limit. Supported scopes include Properties, Leads, Deals, Contacts, Companies, Campaigns, Meetings, Tasks, Documents, Communications, Universal Objects, Business Timeline, Executive Home, Growth, and Settings.

Release 1.6 registers only `StaticNavigationSearchProvider`, which searches authorized navigation definitions and quick-create definitions already supplied to the component. It does not query records. Future record providers can return existing view models without changing the bar.

## Intent routing

`DeterministicIntentRouter` uses ordered, anchored rules:

- `search`, `find`, or `look for` → Search
- `open` → Open
- `create`, `new`, or `add` → Create
- `navigate` or `go to` → Navigate
- `recent` → Recent
- `favorite` or `favourite` → Favorites
- unmatched input → Search

No NLP, model, prompt, probability, inference, or external service is used.

## Quick Create

Quick Create contains New Lead, Deal, Property, Campaign, Meeting, Task, Contact, Company, and Document. Each result performs client navigation to an existing workflow only. Where no dedicated creation route exists, the action opens its current module workspace. It never submits a form or changes business state.

## Recent activity and favorites

`LocalUniversalBarHistory` stores bounded navigation metadata in `localStorage`: recently viewed, recently opened, recently searched, pinned items, and favorites. Stored values contain an identifier, label, optional route/query, kind, and timestamp. No business record payload is stored.

Storage failures are ignored safely. No data leaves the browser, and no database persistence exists.

## Universal Preview

`UniversalPreviewModel` supports Property, Lead, Deal, Company, Contact, Campaign, Meeting, Task, Document, and Timeline Event previews. A provider may supply a preview assembled from an existing view model. The preview card never loads data itself. Without a supplied preview, it displays “Awaiting connected business data.”

## Adaptive suggestions

Configurable suggestions rotate while the input is empty. Defaults cover property search, lead creation, Executive Home, documents, meetings, Timeline, and Growth. Suggestions contain navigation or query intent only and do not represent business activity.

## Keyboard model

- Ctrl+K or Cmd+K opens and focuses the Universal Bar.
- Escape closes it and restores focus to the collapsed bar.
- Arrow Down and Arrow Up move the active result.
- Enter opens the active result.
- Tab follows native accessible focus order.
- Mouse hover and click select results.

The overlay uses dialog, combobox, tablist, listbox, option, expanded-state, active-descendant, selection, and pressed-state semantics.

## Future AI mode

AI is reserved as the third interaction mode rather than a separate product entry point. Ask is disabled and displays: “AI mode will become available after workspace AI activation.” There are no AI provider calls or hidden runtime integration.

## Security and boundaries

- No authentication, billing, onboarding, database, migration, or RLS changes.
- No CRM, Hub, Universal Object, Timeline, Brain, Cognitive Engine, AI Runtime, or Workforce changes.
- No external APIs, indexing engine, AI provider, or database writes.
- No fabricated records, metrics, or search results.
- Quick Create only navigates to existing workflows.

## Future readiness

Future releases can register authorized record-search providers, supply existing preview view models, synchronize history under an approved policy, add permission-aware actions, and enable governed Ask mode through a dedicated provider boundary. Search, actions, and AI remain modes of one universal entry surface.
