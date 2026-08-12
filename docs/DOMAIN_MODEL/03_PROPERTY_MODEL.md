# Property Model

**Aggregate:** Property, the marketable real-estate asset or unit. It owns identity/reference, classification, listing intent, location, specifications, publication state, pricing references, media ordering, and document links.

Property 1→* PropertyPricing; Property 1→* PropertyImage; Property 1→* PropertyDocument; Property *↔* Contact/Company through PropertyOwner. A development may contain buildings, phases, and units through parent-child property relationships.

Status catalog: draft, available, reserved, under_offer, sold, rented, withdrawn, archived. Listing type, property type, tenure, completion status, area unit, amenities, and publication channels are catalogs. Money is currency-qualified; measurements retain units. MLS/provider identifiers are integration aliases, never primary identity.
