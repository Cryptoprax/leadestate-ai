# LeadEstate AI Domain Model

LeadEstate AI is a multi-tenant, AI-native real-estate operating model built above AtlasOS. This blueprint defines business language and contracts, not storage, APIs, authentication, or executable rules.

## Principles

- **DDD:** aggregates own invariants; bounded contexts communicate through versioned events.
- **Configuration first:** statuses, classifications, workflows, permissions, and regional policy are catalogs.
- **Platform agnostic:** contracts use opaque IDs, ISO timestamps, ISO country/language/currency codes, and storage/provider references.
- **AI native:** AI produces traceable evidence and recommendations under capability, budget, safety, and approval policies.
- **Tenant safe:** organization is the isolation boundary; workspace is an operating partition.
- **International:** money never exists without currency; time never exists without timezone; text may be localized.
- **Audit friendly:** mutable entities carry actor/time/version; irreversible facts are events.
- **Cross-industry:** shared party, work, content, event, automation, entitlement, and analytics patterns can serve future AtlasOS applications.

## Bounded contexts

Organization and Workspace govern tenancy. Contact and Company model parties. Property models inventory. Lead, Pipeline, and Deal model revenue. Activity, Task, and Calendar coordinate work. Document and Media manage content. Marketing creates demand. AI and Automation assist decisions. Notifications communicate internally. Billing controls commercial entitlement. Search, Analytics, Reports, Audit, Permissions, and Integrations are supporting contexts.

## Contract rules

Interfaces describe shapes only. Catalog codes are stable machine identifiers; labels are localized. References cross aggregate boundaries; aggregates do not embed mutable foreign aggregates. Domain events use past tense, include tenant, aggregate, actor, correlation, causation, time, schema version, and payload. Personal and regulated fields receive classification, consent, retention, and regional policies during implementation.
