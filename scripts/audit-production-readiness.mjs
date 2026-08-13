import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  ".env.example",
  "config/environments/development.env.example",
  "config/environments/staging.env.example",
  "config/environments/production.env.example",
  ".github/workflows/ci.yml",
  "vercel.json",
  "infrastructure/deployment-manifest.json",
  "instrumentation.ts",
  "app/api/health/route.ts",
  "app/api/health/live/route.ts",
  "app/api/health/ready/route.ts",
  "app/api/version/route.ts",
  "docs/PRODUCTION_DEPLOYMENT_GUIDE.md",
  "docs/ENVIRONMENT_GUIDE.md",
  "docs/OPERATIONS_RUNBOOK.md",
  "docs/PRODUCTION_DEPLOYMENT_CHECKLIST.md",
];

const missing = requiredFiles.filter(file => !existsSync(file));
const env = readFileSync(".env.example", "utf8");
const leakedCredential = /(?:sk_live_|whsec_[A-Za-z0-9]{20,}|eyJ[A-Za-z0-9_-]{30,}\.)/.test(env);
const nextConfig = readFileSync("next.config.ts", "utf8");
const requiredHeaders = ["Content-Security-Policy-Report-Only", "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"];
const absentHeaders = requiredHeaders.filter(header => !nextConfig.includes(header));

if (missing.length || leakedCredential || absentHeaders.length) {
  for (const file of missing) console.error(`Missing production artifact: ${file}`);
  if (leakedCredential) console.error("Environment template appears to contain a credential.");
  for (const header of absentHeaders) console.error(`Missing security header: ${header}`);
  process.exitCode = 1;
} else {
  console.log("Production readiness audit passed: artifacts, credential hygiene, and security headers are present.");
}
