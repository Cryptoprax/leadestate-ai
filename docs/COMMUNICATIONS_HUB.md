# Vayon Communications Hub

## Architecture

The Communications Hub is an additive customer workspace using the established Repository → Service → ViewModel → Component → Page flow.

```text
App Router pages → shared communication components → query/detail view models
                                              → CommunicationsWorkspaceService
                                                → repository contract
                                                  ↙              ↘
                                       tenant Supabase       Aurora fixtures
```

Production reads retain organization and workspace filters. Aurora uses existing connected demo fixtures. Both adapters render through identical components. No external provider, credential, database migration, or autonomous communication was added.

## Conversation model

Conversations include customer and CRM references, channel, human and AI assignment, priority, status, unread count, pinned/archived presentation state, and optional deal, property, workflow, and task relationships. Missing production relationships are shown as unavailable rather than inferred.

The chronological timeline supports messages, calls, notes, meetings, AI recommendations, workflow events, CRM events, and provider events. Message states cover draft, pending approval, scheduled, prepared, sent, delivered, read, and archived.

## Channel model

The normalized channels are WhatsApp, email, SMS, phone, internal notes, and system notifications. Future provider adapters must enter through the Integration Platform and map provider payloads into this normalized model.

## Notification model

Notifications support workflow approved/rejected, approval pending, meeting reminders, assigned tasks, provider offline, conversations waiting, and AI recommendations. Production notifications remain empty until an authoritative governed event source exists; the Hub does not fabricate notices.

## Campaign model

Campaigns expose draft, scheduled, running, completed, and cancelled states with audience, progress, estimated reach, and approval status. Production returns an explicit empty state because this release introduces no campaign persistence. Aurora maps existing demo campaigns without inventing delivery metrics.

## Workflow integration

Outbound communication is modeled as:

```text
Draft → Approval Engine → Execution Request → Integration Platform
      → Deterministic Provider → Conversation Timeline
```

`OutboundCommunicationGovernance` can create draft proposals only. It cannot approve, create an execution request, invoke an integration, or append a sent message. Existing Workflow, Approval, and Integration Platform modules were not modified.

## CRM and AI Workforce integration

Conversation detail exposes CRM references and directs users to authoritative linked records for scores, deals, properties, activity, and meetings. Deterministic assistance derives only from supplied conversation state. It provides summary, suggested reply/follow-up, risk, next action, and explicit unavailable sentiment. No AI provider is called and no AI Workforce state is changed.

## Performance

Repository sources load concurrently through one snapshot call per page. Server Components keep repositories out of browser bundles. Inbox filtering, sorting, and pagination occur before rendering. Conversation rows use `content-visibility` and intrinsic-size containment; full viewport windowing can be introduced behind `InboxList` when durable queues become large.

## Future provider strategy

Live WhatsApp, Gmail, Outlook, SMS, or voice providers must register through Sprint 28 contracts, pass health and capability discovery, use credential references, enforce rate limits and retries, require approval evidence for outbound actions, preserve idempotency, and append safe audit events before timeline projection.
