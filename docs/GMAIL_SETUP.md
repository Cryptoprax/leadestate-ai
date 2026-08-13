# Gmail production setup

1. Enable the Gmail API in the same Google Cloud project used for Vayon Identity.
2. Keep the existing OAuth web client and exact HTTPS callback URI.
3. Configure the OAuth consent screen and request only:
   - `openid`, `email`, `profile` for identity
   - `https://www.googleapis.com/auth/gmail.modify` when Gmail is activated
   - `https://www.googleapis.com/auth/gmail.send` when Gmail is activated
4. Complete Google's verification process for restricted/sensitive Gmail scopes before production use.
5. Set `FEATURE_GOOGLE_IDENTITY=true` and `FEATURE_GMAIL=true` only for approved environments.
6. Preserve `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_OAUTH_REDIRECT_URI`, and `GOOGLE_TOKEN_ENCRYPTION_KEY` in the server secret store.

Use Google test users during development. Exercise consent denial, expired state, missing scopes, refresh, quota exhaustion, send, draft, labels, pagination, MIME alternatives, large threads, and attachments. Never use production mailboxes in automated tests.

Monitor Gmail API per-user and per-project quotas in Google Cloud. Vayon uses bounded pages and does not automatically retry sends. Production rollout should begin with a small workspace allow-list and include revocation and encryption-key rotation runbooks.
