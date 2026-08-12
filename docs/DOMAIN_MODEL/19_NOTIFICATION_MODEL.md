# Notification Model

Notification is an organization-scoped delivery intent for a recipient, category, priority, localized template rendering, action reference, and lifecycle. Preferences define channels, urgency, quiet hours, digest, and opt-outs.

Priority catalog: low, normal, high, urgent. Lifecycle: Created → Scheduled/Queued → Delivered → Read/Dismissed; failure may retry or dead-letter. Deduplication keys prevent noise. Provider delivery is an adapter; the domain remains channel-neutral.
