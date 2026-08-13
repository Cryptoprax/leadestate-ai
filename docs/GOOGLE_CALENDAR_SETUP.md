# Google Calendar production setup

1. Enable the Google Calendar API in the existing Vayon Google Cloud project.
2. Retain the exact HTTPS OAuth callback configured for Google Identity.
3. Add `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar.readonly` to the consent configuration.
4. Complete Google verification before production use.
5. Set `FEATURE_GOOGLE_IDENTITY=true` and `FEATURE_GOOGLE_CALENDAR=true` for approved environments. Gmail remains independently controlled.
6. Keep Google client credentials and `GOOGLE_TOKEN_ENCRYPTION_KEY` in the server secret store.

Test consent denial, missing scopes, token refresh, calendar-list permissions, read-only calendars, recurrence expansion, all-day dates, DST boundaries, IANA timezones, attendee updates, conference creation, deletion, free/busy, pagination, quota failures, and revocation using non-production calendars. Monitor per-user and per-project Calendar API quotas and do not blindly retry mutations.
