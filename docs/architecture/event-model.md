# Event Model

Business Timeline events are immutable facts with tenant, workspace, actor, source, subject, correlation, causation, version, classification, and occurrence-time metadata.

Workflow governance currently records local audit entries rather than generating production Business Timeline events. A future adapter may submit canonical event proposals after a transition is committed. It must never rewrite historical events or embed credentials and should use correlation IDs to connect recommendation, approval, execution, and provider outcome.

Derived projections may be replayed; source events remain immutable. Event consumers must enforce tenant and visibility boundaries before projection or search.
