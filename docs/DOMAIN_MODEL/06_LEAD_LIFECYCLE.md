# Lead Lifecycle

```mermaid
stateDiagram-v2
 [*] --> New
 New --> Contacted
 Contacted --> Qualified
 Contacted --> Nurturing
 Qualified --> Converted
 Qualified --> Nurturing
 Nurturing --> Contacted
 New --> Disqualified
 Contacted --> Disqualified
 Qualified --> Disqualified
 Converted --> Archived
 Disqualified --> Archived
```

Events: LeadCreated, LeadAssigned, LeadContacted, LeadQualified, LeadNurtured, LeadDisqualified, LeadConverted, LeadArchived. Duplicate detection links or merges under a governed process and preserves aliases/audit. Conversion creates or associates a Deal; it does not erase the Lead.
