# Pipeline Model

Pipeline is a configurable ordered state model for Leads, Deals, or future entities. PipelineStage owns order, terminal semantics, probability, SLA, capacity/limit metadata, and required fields. PipelineEntry relates one subject to its current stage with version and entry time.

Movement is an explicit transition producing PipelineStageChanged with from/to stage, reason, actor, and version. Multiple pipelines are supported per workspace. Catalog configuration supplies defaults; customer customization creates data, not source-code enums.
