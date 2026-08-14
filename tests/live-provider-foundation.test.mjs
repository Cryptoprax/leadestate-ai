import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");
const root = "features/platform/live-providers";

test("live provider inventory covers the approved provider set", () => {
  const source = read(`${root}/registry/provider-catalog.ts`);
  for (const provider of [
    "whatsapp-cloud",
    "google-calendar",
    "gmail",
    "microsoft-outlook",
    "microsoft-365",
  ])
    assert.match(source, new RegExp(provider));
});

test("connection model covers every required lifecycle state", () => {
  const source = read(`${root}/domain/contracts.ts`);
  for (const state of [
    "connected",
    "disconnected",
    "expired",
    "pending",
    "validation-failed",
  ])
    assert.match(source, new RegExp(state));
  assert.match(source, /CredentialReference/);
});

test("OAuth state contract uses PKCE nonce expiry version and trusted return paths", () => {
  const source = read(`${root}/services/oauth-state.service.ts`);
  for (const value of [
    "sha256",
    "codeVerifier",
    "nonce",
    "expiresAt",
    "version",
    "/vayon/providers",
  ])
    assert.match(source, new RegExp(value));
  assert.doesNotMatch(source, /accessToken|refreshToken|clientSecret/);
});

test("capabilities remain disabled and governance first", () => {
  const source = read(`${root}/registry/provider-catalog.ts`);
  assert.match(source, /enabled: false/);
  for (const action of [
    "message.send",
    "meeting.create",
    "mail.read",
    "mail.send",
    "calendar.write",
  ])
    assert.match(source, new RegExp(action.replace(".", "\\.")));
});

test("health and sandbox validation make no external traffic", () => {
  const source = read(`${root}/services/provider-readiness.service.ts`);
  assert.match(source, /latencyMs: null/);
  assert.match(source, /externalRequestMade: false/);
  assert.doesNotMatch(
    source,
    /fetch\(|axios|graphql|googleapis|graph\.microsoft|facebook\.com/,
  );
});

test("provider routes and boundaries exist", () => {
  for (const path of [
    "app/vayon/providers/page.tsx",
    "app/vayon/providers/[provider]/page.tsx",
    "app/vayon/providers/loading.tsx",
    "app/vayon/providers/error.tsx",
  ])
    assert.ok(existsSync(path), path);
});

test("provider UI exposes connection capability authorization health and diagnostics", () => {
  const source =
    read(`${root}/components/ProviderViews.tsx`) +
    read(`${root}/components/ConnectionWizard.tsx`);
  for (const label of [
    "Connection wizard",
    "Capabilities",
    "Authorization",
    "Health",
    "Diagnostics",
    "No live traffic",
  ])
    assert.match(source, new RegExp(label, "i"));
  assert.match(source, /aria-label/);
  assert.match(source, /aria-live/);
});

test("foundation cannot execute operations or store credentials", () => {
  const files = [
    "domain/contracts.ts",
    "registry/provider-catalog.ts",
    "repositories/reference.repository.ts",
    "services/provider-readiness.service.ts",
    "services/oauth-state.service.ts",
  ]
    .map((path) => read(`${root}/${path}`))
    .join("\n");
  assert.doesNotMatch(
    files,
    /execute\s*\(|send\s*\(|createMeeting|save\s*\(|store\s*\(|supabase|database/i,
  );
});

test("documentation records safety and future activation boundaries", () => {
  const source = read("docs/LIVE_PROVIDER_FOUNDATION.md");
  for (const value of [
    "Connection wizard",
    "OAuth state model",
    "Capability discovery",
    "Sandbox validation",
    "Health",
    "credential safety",
    "Governance boundary",
  ])
    assert.match(source, new RegExp(value, "i"));
});
