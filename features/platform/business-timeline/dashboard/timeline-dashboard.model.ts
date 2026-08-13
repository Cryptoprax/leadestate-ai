export const timelineEnvelopeFields = [
  "Event ID",
  "Event name + version",
  "Envelope version",
  "Organization + workspace",
  "Partition + sequence",
  "Primary subject",
  "Related objects",
  "Actor + owner + source",
  "Occurred + recorded + received",
  "Correlation + causation",
  "Idempotency key",
  "Category + priority + severity",
  "Visibility + classification",
  "Summary + payload",
  "Retention",
  "Derived from + supersedes",
  "Trace + integrity",
] as const;

export const timelineLifecycle = [
  "Proposed",
  "Validated",
  "Deduplicated",
  "Accepted",
  "Persisted locally",
  "Projected",
  "Replayable",
  "Superseded by append",
] as const;

export const timelineProjectionLabels = [
  "Workspace Timeline",
  "Object Timeline",
  "Recent Events",
  "Category View",
  "Actor View",
  "Correlation View",
] as const;
