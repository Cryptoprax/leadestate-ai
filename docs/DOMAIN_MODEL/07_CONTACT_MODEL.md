# Contact Model

Contact is the canonical natural-person party. Buyer, Seller, Investor, Tenant, Landlord, and DeveloperContact are contextual roles, not separate identities.

Contact owns names, contact points, addresses, locale/preferences, consent references, and identity-resolution aliases. Lead references Contact. Company employs or represents Contacts. Deals bind Contacts in named participant roles.

Customer lifecycle: Prospect → Engaged → Qualified → ActiveCustomer → PastCustomer → Dormant, with re-engagement allowed. This lifecycle is a relationship classification independent of lead/deal state. Merge preserves a surviving identity, redirects aliases, and emits ContactMerged.
