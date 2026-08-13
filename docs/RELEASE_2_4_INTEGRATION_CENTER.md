# Release 2.4 — Integration Center

## Overview

`/vayon/settings/integrations` is the administrator-owned source of truth for external provider discovery, connection posture, permissions, health, diagnostics, workspace flags, and management links. Existing provider-specific pages remain intact.

## Architecture

Every integration registers an immutable `IntegrationDefinition` containing its code, label, category, version, feature flag, required scopes, management route, availability, and incremental-authorization capability. `IntegrationCenterService` assembles workspace-scoped view models from existing Google credentials, WhatsApp connection state, and environment-backed feature flags. It does not invoke provider APIs during rendering.

The registry includes Google Identity, Gmail, Google Calendar, Drive, Contacts, Meet, Microsoft Identity, Outlook, Microsoft Calendar, Teams, WhatsApp Business, Facebook, Instagram, LinkedIn, Telegram, Slack, Zoom, Stripe, Dropbox, Box, OpenAI, Anthropic, Gemini, OpenRouter, HubSpot, Salesforce, and a future-provider slot.

## Status and health

Connection status is derived only from existing connection evidence and granted scopes. Health states are Healthy, Needs Attention, Authorization Required, Disabled, Unavailable, and Unknown. Unregistered diagnostics are shown as unknown rather than fabricated. Token expiration is displayed only where the existing encrypted Google credential exposes it.

## Permissions and diagnostics

Cards show granted and missing scopes plus incremental-authorization readiness. Last validation, last synchronization, errors, retry counts, quota status, and rate limits remain unknown until a durable provider-neutral observability projection is authorized. Secrets, tokens, and credential ciphertext are never included in the model.

## Search, filters, and management

Administrators can search by provider, code, or category and filter connection state and categories including communication, AI, CRM, payments, and storage. Available providers link to their existing settings or product surfaces. Provider-specific pages and flows are not removed.

## Extension rule

Future providers must first register an `IntegrationDefinition`, then expose connection evidence through the center service without importing provider credentials into presentation code. Durable health and lifecycle projections should implement provider-neutral contracts in a future schema-authorized release.
