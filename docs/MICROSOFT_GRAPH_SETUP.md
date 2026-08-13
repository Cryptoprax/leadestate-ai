# Microsoft Graph application setup

Use the existing Release 2.8 Entra app and callback URI. Add delegated permissions incrementally and approve only capabilities enabled for the workspace.

## Delegated permissions

- Outlook Mail: `Mail.ReadWrite`, `Mail.Send`
- Outlook Calendar: `Calendars.ReadWrite`
- OneDrive: `Files.ReadWrite`
- Microsoft People: `Contacts.Read`, `People.Read`, `User.ReadBasic.All`
- Teams: `Chat.Read`, `Channel.ReadBasic.All`, `ChannelMessage.Read.All`, `Presence.Read.All`, `Calendars.Read`

Keep identity permissions `openid profile email offline_access User.Read`. Some Teams and directory permissions require administrator consent. Do not grant application permissions; Release 2.9 uses delegated user access only.

## Validation

In a non-production tenant, test each capability independently: consent denial, missing scopes, admin-consent requirements, token refresh, pagination links, empty responses, throttling, revoked consent, unavailable resources, attachment/download authorization, upload size boundaries, recurrence/time zones, directory restrictions, duplicate contacts, Teams access policies, and log redaction. Confirm workflow nodes never execute and Timeline proposals are never submitted.

Successful compilation does not demonstrate live Graph connectivity. Record administrator-observed staging results separately after secrets, tenant policies, and redirect URIs are configured.
