# Lead Model

A Lead is a time-bound commercial interest associated with a Contact, not a person duplicate. It owns acquisition source, assignment, qualification, preferences, property interests, score/temperature, consent constraints, pipeline position, and follow-up intent.

Lead *→1 Contact; Lead 0→1 Employee; Lead *↔* Property; Lead 0→1 LeadSource; Lead 1→1 LeadTimeline; Lead 0→* Deal.

Statuses: new, contacted, qualified, nurturing, converted, disqualified, archived. Source, temperature, contact method, qualification fields, loss reasons, and tags are configurable. AI scores remain separate from verified human facts and include model/version/evidence metadata.
