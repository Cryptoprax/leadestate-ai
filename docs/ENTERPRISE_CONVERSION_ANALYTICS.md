# Enterprise Analytics and Conversion Optimization

Sprint 69.2 extends VAYON's existing analytics, marketing observability, performance, authentication, and tenant context. Public acquisition events are anonymous and consent-gated. Authenticated product events are attributed to the active organization and workspace through the existing operations context and RLS.

The dashboard composes authoritative repository evidence and renders unavailable states when privacy boundaries prevent a safe join. It does not connect anonymous visitors to tenant users. Event metadata is length-limited and removes common PII and secret keys in the database function.

Heatmaps are represented by provider-neutral interfaces for Microsoft Clarity, Hotjar, and PostHog Session Replay; the default adapter is disabled. A/B assignments are deterministic, anonymous, and provider-neutral. Landing-page, CTA, pricing, and industry experiments default to inactive.

Consent supports necessary-only operation, anonymous analytics, explicit opt-out, and separate future marketing and heatmap preferences. Core Web Vitals collect LCP, CLS, TTI, and INP only after analytics consent.
