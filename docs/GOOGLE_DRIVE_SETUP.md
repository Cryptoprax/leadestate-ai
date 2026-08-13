# Google Drive production setup

1. Enable the Google Drive API in the Google Cloud project used by Vayon Identity.
2. Keep the existing exact HTTPS OAuth callback URI.
3. Add `https://www.googleapis.com/auth/drive` to the verified consent configuration. Vayon requires this scope for browsing existing files plus rename, move, copy, trash, restore, and folder operations.
4. Complete Google's restricted/sensitive-scope verification and organizational approval before production rollout.
5. Set `FEATURE_GOOGLE_IDENTITY=true` and `FEATURE_GOOGLE_DRIVE=true` for approved workspaces. Gmail and Calendar remain separate flags.
6. Keep OAuth client credentials and `GOOGLE_TOKEN_ENCRYPTION_KEY` in the server secret store.

Test consent denial, missing scopes, refresh, My Drive, Shared Drives, shared-with-me, trash, nested folders, escaping in search, sorting, pagination, Google-native files, binary uploads/downloads, large-file boundaries, read-only permissions, quota exhaustion, and revocation using non-production Drive accounts. Monitor Drive API quota and storage errors; do not blindly retry mutations.
