# Release 2.2 — Gmail Workspace Integration

## Architecture

Gmail is the first active implementation of the provider-neutral messaging contracts in `features/platform/messaging`. Mail providers own connection status, folders, paginated messages, full message and thread retrieval, drafts, sending, label mutation, and attachments. Outlook, Exchange, IMAP, shared inbox, and enterprise provider identifiers are extension targets only and have no implementation.

The Gmail adapter reuses the Release 2.1 encrypted Google credential. Gmail permissions are requested in a separate incremental authorization flow; identity sign-in and identity connection remain identity-only.

## Mailbox and messages

The live workspace supports inbox, sent, drafts, starred, important, archive, spam, trash, unread, Gmail-native search, pagination, labels, and thread navigation. Full MIME payload parsing exposes addresses, CC/BCC, bodies, quoted history, labels, attachment metadata, and chronological threads. HTML is retained but never injected as trusted markup.

Compose contracts cover new mail, reply, reply-all, forward, multipart attachments, drafts, templates, signatures, and scheduling. Sending and draft persistence remain explicit user actions. Attachment downloads are authenticated, owner-authorized, private, non-cacheable responses. Virus scanning and Drive links are marked unavailable.

## Platform integration

The Gmail Universal Bar provider returns live communication results using Gmail search syntax and links them to message views. Email context slices support contacts, companies, leads, deals, properties, campaigns, and meetings without creating relationships. Canonical proposal helpers model received, sent, draft saved, attachment added, archived, and labeled events but never append to Business Timeline storage. Executive Home displays only live Gmail estimates and explicit unavailable states.

## Security and observability

All operations derive organization and workspace from the authenticated server session. Gmail calls require the encrypted workspace credential and refresh through the existing versioned token path. Logs record operation, folder, result count, status, label count, and attachment count only—never recipients, subjects, bodies, attachment contents, or tokens. Gmail API quota failures surface as provider errors and are not retried blindly.

## Known limitations

No background synchronization, push notifications, local mailbox cache, virus scanner, HTML sanitizer/rendering, scheduling, signature persistence, template persistence, Timeline append, or inferred CRM relationship matching is included. Universal Bar exposes a live provider contract; wiring it into the current synchronous client search aggregator is deferred until that aggregator supports authenticated asynchronous providers.
