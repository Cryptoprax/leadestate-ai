# WhatsApp Business Cloud Platform

## Architecture

Sprint 47 adds `features/platform/whatsapp` using Domain → Contract → Repository → Service → Provider → ViewModel → Server Component boundaries. It extends the established Meta integration and stores inbound activity in the canonical `communication_threads` and `communications` records. The WhatsApp routes are focused provider views over the Communications Hub, not another inbox system.

## Provider

`ProductionWhatsAppCloudProvider` exposes connection lifecycle, health and validation, governed text/template/media delivery, webhook ingestion, read state, typing capability, masked profile diagnostics, conversations, templates, and connection refresh. Live operations use the official Graph endpoint. Missing credentials, authorization failures, rate limits, and unconfirmed message acceptance fail explicitly.

## Webhook lifecycle

Meta validates the endpoint through the GET challenge and a server-held verification token. POST delivery requires `X-Hub-Signature-256`, verified with HMAC-SHA256 and constant-time comparison before JSON ingestion. Inbound messages and status changes use service-role, idempotent RPCs. Supported lifecycle data includes received messages and sent, delivered, read, and failed statuses. Missing configuration, invalid signatures, unknown phone-number connections, and processing errors fail safely.

## CRM integration

Conversations can reference Lead, Customer, Deal, Property, Meeting, Task, and Timeline identities only when an authoritative tenant-scoped relationship exists. The current link service reports durable linking storage as unavailable and creates no relationship instead of fabricating one.

## Timeline

Confirmed connection, conversation, message, delivery, and link outcomes are represented by the shared Event Bus and Business Timeline contracts. Publication belongs after the durable provider or webhook operation succeeds. Payloads must contain identifiers and safe metadata, never message bodies, credentials, or headers.

## Workflow

Outbound communication follows Draft → Approval → Execution Request → Integration Platform → WhatsApp Provider → Timeline. Repository delivery methods require both approval and execution-request identifiers. Provider capabilities do not permit direct UI execution, and the conversation composer remains disabled until the existing governance runtime supplies an approved request.

## AI

The model reserves conversation summary, suggested reply, sentiment, intent, priority, next action, follow-up, meeting suggestion, and lead qualification fields. Until an existing AI provider returns evidence-backed output, all fields remain empty and the UI displays an explicit unavailable state.

## Security

Credential ciphertext, decrypted tokens, webhook secrets, request headers, phone-number IDs, business-account IDs, and provider secrets stay in server-only modules. Settings expose only configured/unavailable labels and public profile metadata. Media is represented by provider metadata and is never downloaded or stored locally.

## Message and media model

Rendering covers text, image, video, audio, voice, document, sticker, location, contact, interactive metadata, template metadata, and reaction metadata. Unknown content displays an unsupported-message state. Delivery and read states are displayed only when persisted from Meta webhooks.

## Observability and notifications

Settings expose webhook configuration, connection and provider health, latency, public quality rating, queue state, rate-limit state, retry state, and API version. New customer messages, assignment, failed delivery, approval requirements, and connection issues map to the existing Notification Platform.

## Technical debt

- Add the tenant-scoped durable CRM conversation-link RPC and authoritative entity verifier.
- Connect approved Workflow execution requests to provider delivery and post-success Timeline publication.
- Persist assignment, pin, archive, label, and priority mutations through governed Communications Hub RPCs.
- Add durable retry/dead-letter telemetry and Graph rate-limit header collection.
- Enable typing indicators only after the active Graph version and message-context contract support them.
- Expand normalized webhook persistence for contacts, interactive content, locations, templates, reactions, and voice flags.

## Future enhancements

Future work can add embedded signup, webhook subscription diagnostics, media proxying with short-lived authorization, template pagination, conversation assignment automation, richer notification routing, and evidence-backed AI advisory results without changing the provider boundary.
