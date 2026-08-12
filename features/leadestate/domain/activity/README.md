# Activity domain

Owns the implementation-independent contracts and configurable catalogs for activity. It contains no persistence, transport, authentication, or business-rule implementation. Identifiers are tenant-scoped through shared references; integrations consume published events rather than internal state.

