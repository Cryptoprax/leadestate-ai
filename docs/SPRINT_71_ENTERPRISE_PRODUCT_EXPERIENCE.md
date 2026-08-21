# Sprint 71 — Enterprise Product Experience

Sprint 71 extends the Sprint 70 design language into a richer enterprise product narrative. It changes presentation only: authentication, APIs, providers, database schema, Supabase, security, and business services are untouched.

## Interactive experience

- Split enterprise hero with a seven-view product mockup that cycles every 3.6 seconds and supports manual selection.
- Eight-employee AI Workforce visualization connected around Vayon Core.
- Nine-layer animated platform architecture.
- Eight-tab enterprise dashboard preview with revenue, meetings, pipeline, lead source, task, and conversation-volume demonstrations.
- Enterprise feature system spanning workforce, CRM, communications, knowledge, automation, analytics, security, governance, billing, and developers.
- Sequential governed workflow, premium pricing, illustrative customer-success stories, and animated FAQ.

## Performance and accessibility

The homepage remains a Server Component. Interactive behavior is contained in one client module, while Framer Motion honors `prefers-reduced-motion`. Timers are cleaned up on unmount. Controls use native button semantics through VDS, expose pressed or expanded state, and retain keyboard focus treatment. No remote imagery or additional media payload was introduced.

## Evidence boundaries

Dashboard and customer-success values are presentation data only. Case studies are visibly labelled illustrative, customer logo slots are placeholders, and 99.9% is labelled an availability target. No claim is represented as customer or production evidence.

No screenshots were generated in the implementation environment because no browser capture runner is configured. Visual runtime certification remains a separate launch-environment gate.
