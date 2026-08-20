# Enterprise Documentation Platform

Sprint 68 extends the Enterprise Knowledge Platform with a public, versioned documentation catalog. Product documentation is read-only catalog content; tenant-uploaded knowledge, cited AI help, and document lifecycle management remain owned by Sprint 63.

The runtime preserves `Repository → Service → Provider`: `DocumentationRepository` owns catalog discovery, `DocumentationService` composes search and related content, and the observability provider records sanitized aggregate events through a validated RPC. Browser bookmarks, reading history, reading progress, and recent searches stay local to the browser.

Every reader surface uses VAYON semantic design tokens, so callouts, code examples, search, and navigation remain dark-mode compatible without a separate theme implementation.

API entries are OpenAPI-ready contracts and do not claim that an endpoint is live. Videos are an explicit future presentation extension. Public telemetry contains no secrets or tenant records; authenticated organization knowledge continues to rely on workspace-scoped repositories and RLS.
