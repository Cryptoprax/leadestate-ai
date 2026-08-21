import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");

test("proxy excludes every webhook endpoint from authentication", async () => {
  const source = await read("proxy.ts");

  assert.match(source, /path === "\/api\/webhooks"/);
  assert.match(source, /path\.startsWith\(WEBHOOK_PATH_PREFIX\)/);
  assert.match(source, /return NextResponse\.next\(\)/);
  assert.match(source, /api\/webhooks\(\?:\/\|\$\)/);
});

test("Supabase session guard cannot redirect webhook requests", async () => {
  const source = await read("lib/supabase/proxy.ts");
  const bypass = source.indexOf('path === "/api/webhooks"');
  const authentication = source.indexOf("supabase.auth.getUser()");

  assert.ok(bypass >= 0);
  assert.ok(authentication >= 0);
  assert.ok(bypass < authentication);
  assert.match(source, /path\.startsWith\("\/api\/webhooks\/"\)/);
});

test("WhatsApp and Stripe webhooks retain provider verification", async () => {
  const [whatsApp, stripe] = await Promise.all([
    read("app/api/webhooks/whatsapp/route.ts"),
    read("app/api/webhooks/stripe/route.ts"),
  ]);

  assert.match(whatsApp, /hub\.verify_token/);
  assert.match(whatsApp, /status:403/);
  assert.match(whatsApp, /x-hub-signature-256/);
  assert.match(stripe, /stripe-signature/);
  assert.match(stripe, /\.webhook\(/);
});
