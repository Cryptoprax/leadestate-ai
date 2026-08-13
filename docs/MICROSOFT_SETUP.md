# Microsoft 365 setup

## Azure app registration

1. In Microsoft Entra admin center, create an app registration for the approved organizational account policy. Vayon currently uses the `organizations` authority.
2. Add the Web redirect URI exactly: `https://<vayon-domain>/integrations/microsoft/callback`.
3. Create a client secret in the deployment secret store. Never commit its value.
4. Add delegated Microsoft Graph permission `User.Read`. OpenID permissions `openid`, `profile`, `email`, and `offline_access` are requested by the authorization flow.
5. Configure the publisher, privacy statement, terms, support contact, and administrator consent policy appropriate to the tenant.

Do not grant Mail, Calendar, Files, Contacts, Chat, or directory permissions for Release 2.8. Those capabilities are registry placeholders for later incremental authorization.

## Deployment variables

Set server-side values:

- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`
- `MICROSOFT_OAUTH_REDIRECT_URI`
- `MICROSOFT_TOKEN_ENCRYPTION_KEY` — a high-entropy secret independent from Google encryption
- `FEATURE_MICROSOFT_IDENTITY=true` only in approved workspaces/environments

Ensure `NEXT_PUBLIC_APP_URL` has the same origin as the redirect URI. Production redirects must use HTTPS.

## Testing

Use non-production tenants and accounts. Test consent success and denial, altered/expired state, nonce mismatch, invalid issuer/audience/signature, missing scopes, unavailable `/me`, token refresh, refresh rotation, cookie capacity, workspace AAD mismatch, feature-disabled state, disconnect, expiration health, and absence of token values from logs. Verify Outlook, Calendar, OneDrive, People, and Teams operations remain unavailable.

Successful compilation does not prove Microsoft connectivity. Complete an administrator-observed staging consent test after configuring real secrets and approved redirect URIs.
