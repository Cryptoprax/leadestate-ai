# Google Contacts production setup

1. Enable the Google People API in the existing Google Cloud project.
2. Preserve the exact HTTPS OAuth callback URI.
3. Add `https://www.googleapis.com/auth/contacts.readonly`, `https://www.googleapis.com/auth/contacts.other.readonly`, and `https://www.googleapis.com/auth/directory.readonly` to the verified consent configuration.
4. Configure Workspace domain directory visibility where directory contacts are required.
5. Complete Google scope verification and organizational approval.
6. Set `FEATURE_GOOGLE_IDENTITY=true` and `FEATURE_GOOGLE_CONTACTS=true` only for approved workspaces.
7. Keep OAuth credentials and `GOOGLE_TOKEN_ENCRYPTION_KEY` in the server secret store.

Test consent denial, missing scopes, refresh, connections, Other Contacts, directory access denial, search, groups, pagination, missing names, multiple emails/phones, birthdays without years, photos, duplicate normalization, quota exhaustion, and revocation using non-production accounts. Never log or snapshot real contact details.
