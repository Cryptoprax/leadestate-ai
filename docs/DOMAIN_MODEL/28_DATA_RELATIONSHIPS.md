# Data Relationships

```mermaid
graph TD
 O[Organization] --> W[Workspace]
 O --> B[Branch] --> D[Department] --> T[Team] --> E[Employee]
 W --> L[Lead] --> C[Contact]
 L --> PE[Pipeline Entry] --> PS[Pipeline Stage] --> PIP[Pipeline]
 L --> DL[Deal] --> P[Property]
 P --> PO[Property Owner] --> C
 PO --> CO[Company]
 DL --> V[Viewing]
 DL --> OF[Offer]
 DL --> CM[Commission]
 P --> PI[Property Image] --> M[Media Asset]
 P --> PD[Property Document] --> DOC[Document]
 L --> TK[Task]
 P --> TK
 DL --> TK
 C --> MSG[Conversation/Message]
 MK[Campaign] --> L
 AI[AI Employee] --> REC[Recommendation] --> L
 EV[Domain Event] --> ACT[Activity]
 EV --> AU[Audit Event]
 EV --> N[Notification]
 EV --> AN[Analytics Projection]
```

All tenant-owned records belong to one Organization. Workspace, branch, team, and employee add operational scope. Cross-aggregate references use IDs; event consumers build projections. Contact is the person, Company the business party, Organization the tenant, Employee the workforce membership, Lead the interest, Deal the transaction, and Property the asset.
