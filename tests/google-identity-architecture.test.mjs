import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read=path=>readFileSync(path,"utf8");
test("Google identity uses identity-only scopes",()=>{const source=read("features/platform/integrations/identity/registry.ts");assert.match(source,/\["openid", "email", "profile"\]/);assert.doesNotMatch(source,/googleIdentityScopes[^\n]+gmail/)});
test("OAuth uses PKCE, nonce, one-time state and offline access",()=>{const action=read("features/platform/integrations/google/actions.ts"),service=read("features/platform/integrations/google/services/google-oauth.service.ts"),callback=read("app/integrations/google/callback/route.ts");for(const token of["code_challenge","S256","nonce","access_type","offline"])assert.match(service,new RegExp(token));for(const token of["google_oauth_state","google_oauth_nonce","google_oauth_verifier","httpOnly"])assert.match(action,new RegExp(token));assert.match(callback,/store\.delete\("google_oauth_state"\)/)});
test("credentials remain server-only",()=>{const source=read("features/platform/integrations/google/services/token-crypto.service.ts")+read("features/platform/integrations/google/actions.ts");assert.match(source,/aes-256-gcm/);assert.doesNotMatch(source,/localStorage|sessionStorage/)});
test("provider-neutral extension targets are registered",()=>{const source=read("features/platform/integrations/identity/contracts.ts");for(const provider of["google","microsoft","apple","slack","meta","stripe","dropbox","box","zoom"])assert.match(source,new RegExp(`\\b${provider}\\b`))});
test("release documentation records schema safety",()=>assert.match(read("docs/RELEASE_2_1_GOOGLE_IDENTITY.md"),/No schema or migration was changed/));
