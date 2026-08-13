# Release 0.9 — Vayon Growth Hub

## Overview

Vayon Growth Hub is a modular, provider-neutral marketing department architecture. It provides customer-ready surfaces for marketing overview, social accounts, campaigns, content, publishing, calendars, landing pages, forms, referrals, QR destinations, analytics, and objectives.

Release 0.9 is architecture and UI only. It performs no OAuth, social publishing, external API requests, AI generation, payouts, QR generation, tracking, or production analytics. Empty dashboards show explicit placeholders rather than invented metrics.

## Architecture

```text
/vayon/growth dashboard
        │ view models
        ▼
Growth capability ports
 ├─ Social account registry
 ├─ Campaign service
 ├─ Content studio
 ├─ Publishing center (always blocked)
 ├─ Marketing calendar
 ├─ Landing page service
 ├─ Marketing form service
 ├─ Referral service
 ├─ QR service
 ├─ Analytics provider (empty placeholder)
 └─ Growth objective service
        │
        ▼
Local architecture storage only
```

The module is isolated under `features/vayon/growth`. It does not depend on CRM repositories, Universal Objects, Brain, Cognitive Engine, AI Runtime, Workforce, Supabase, or provider SDKs. Future adapters can implement individual ports without coupling the rest of Growth Hub to a channel vendor.

## Social Media Hub

The social account contract supports LinkedIn, Facebook, Instagram, Threads, X, TikTok, Pinterest, YouTube, Google Business Profile, WhatsApp Business, and Telegram. Each account records workspace ownership, connection state, permissions, metadata, and publishing capabilities. `oauthAvailable` is permanently false in this release.

## Campaign Manager

Campaigns support social, email, SMS, WhatsApp, landing-page, referral, and QR types. The lifecycle includes draft, scheduled, running, paused, completed, and archived. Models include goals, optional budget and currency, audiences, tags, dates, and an unavailable automation status.

## Content Studio and Publishing Center

Content models cover libraries, post templates, media, campaign assets, brand assets, drafts, and approval status. AI generation remains unavailable.

Publishing models cover one-click, scheduled, and multi-platform requests, approval, history, queue, preview, and validation. `ArchitecturePublishingCenter` validates required content, destinations, and approvals, then always stores a blocked non-executable job. No transport or publishing handler exists.

## Marketing Calendar

Calendar contracts support month, week, and day views along with campaign timelines, scheduled posts, reminders, milestones, and launch events. The local service can filter explicit items by date range without importing the CRM calendar.

## Landing pages and forms

Landing-page architecture includes pages, ordered sections and blocks, forms, CTAs, images, videos, SEO, analytics placeholders, and a future drag-and-drop status. It does not create public routes or publish pages.

Reusable forms support lead, property inquiry, newsletter, contact, event registration, and custom types. Fields include required rules, options, validation messages, and conditional show, hide, or require logic. No form submission writes CRM data.

## Referrals and QR

Referral programs model codes, rewards, partner references, status, and tracking placeholders. Payouts are unavailable.

QR definitions support properties, campaigns, business cards, landing pages, and events. Destination and lifecycle data are modeled, while image generation and tracking remain placeholders.

## Marketing analytics

Provider-neutral analytics queries support reach, impressions, engagement, clicks, leads, conversions, revenue attribution, ROI, and funnels. `PlaceholderMarketingAnalytics` always returns an empty value map, no sources, and placeholder status. The UI renders em dashes and never fabricates performance.

## Growth objectives

Objectives support increasing leads, revenue, website traffic, engagement, referrals, repeat customers, and reducing acquisition cost, plus arbitrary future objective types. Dashboard labels document supported contracts and are not active company targets.

## Future extension points

- Official provider OAuth adapters with encrypted credentials and scope review
- Approved publishing adapters with idempotency, preview, validation, approval, audit, retries, and cancellation
- Email, SMS, and WhatsApp campaign delivery providers
- Durable tenant-scoped content, campaign, page, form, referral, and QR stores
- Public landing-page rendering and consent-aware form ingestion
- Verified attribution and analytics sources with freshness and lineage
- Approved AI Runtime integration for content suggestions, never direct provider calls
- Referral reward fulfillment behind financial approval and audit boundaries

Every activation requires separate security, privacy, consent, terms-of-service, rate-limit, regional compliance, and operational review.

