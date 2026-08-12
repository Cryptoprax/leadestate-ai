# Activity Model

Activity is a human-readable, immutable timeline projection derived from domain events and explicit logged interactions. It references a subject and actor and carries type, summary, occurrence time, visibility, and metadata.

Activity can represent calls, meetings, messages, state changes, assignments, notes, documents, AI recommendations, and integration outcomes. It is not the audit log: Activity is operational narrative; AuditEvent is compliance evidence. Timelines group activities by subject/date and paginate by stable cursor.
