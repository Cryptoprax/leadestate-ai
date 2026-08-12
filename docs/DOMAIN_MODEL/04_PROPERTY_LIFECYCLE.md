# Property Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Available: publish
  Available --> Reserved: reserve
  Available --> UnderOffer: accept negotiation
  UnderOffer --> Reserved: reservation agreed
  UnderOffer --> Available: offer lapses
  Reserved --> Sold: sale closes
  Reserved --> Rented: lease activates
  Reserved --> Available: reservation released
  Available --> Withdrawn: owner withdraws
  Withdrawn --> Available: relist
  Draft --> Archived
  Sold --> Archived
  Rented --> Archived
```

Transitions emit PropertyCreated, PropertyPublished, PropertyReserved, PropertyOfferReceived, PropertySold, PropertyRented, PropertyWithdrawn, PropertyRelisted, and PropertyArchived. Preconditions such as mandate, compliance, pricing, required media, or availability are policy/configuration concerns. History is immutable; current state is a projection.
