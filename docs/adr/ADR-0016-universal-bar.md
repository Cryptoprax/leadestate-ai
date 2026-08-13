# ADR-0016: Universal Bar

## Status

Accepted for Release 1.6.

## Context

Vayon had separate global command and Universal Object search overlays, both responding to Ctrl+K/Cmd+K. Competing entry points create shortcut conflicts, inconsistent discovery, duplicated history, and uncertainty about where future conversational interaction belongs.

## Decision

Adopt one always-visible Universal Bar in the Vayon header. Search, commands, navigation, and quick-create are interaction modes and result kinds inside the same overlay. Remove the separate global Search Overlay mount and replace the previous Product Experience command palette.

Use deterministic intent routing and provider-neutral local search contracts. Store only bounded local history metadata. Quick-create results navigate to existing workflows and perform no business action.

Reserve Ask as a disabled third mode in the same bar.

## Why one universal entry point

One visible entry point establishes a stable interaction habit, eliminates keyboard conflicts, centralizes accessibility and history, and allows every module to become discoverable without expanding header navigation.

## Why search and commands are unified

Users often express the same goal as either a noun or a verb: “deals,” “open deals,” or “create deal.” Deterministic intent routing can classify these forms while providers return one consistent result contract. Separate systems would duplicate ranking, navigation, keyboard behavior, and recents.

## Why AI is a mode

Future Ask behavior should not become a competing product surface. Treating Ask as a mode preserves a single entry habit and lets governance decide when the same context may be searched, acted upon, or discussed. Release 1.6 keeps Ask disabled and makes no provider call.

## Consequences

- The global header contains one search-and-command surface.
- Ctrl+K/Cmd+K has one owner.
- Static navigation and quick-create are available without data access.
- Local history stays browser-bound and contains no record payloads.
- Future search and preview providers implement stable contracts.
- Existing Universal Object search code remains untouched but is no longer globally mounted.

## Future decisions

Later ADRs must define permission-aware result providers, ranking, provider timeouts, record preview redaction, history synchronization and retention, workspace activation, Ask-mode governance, citations, and audit behavior.
