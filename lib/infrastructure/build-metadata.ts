import packageMetadata from "../../package.json";
import { getAppEnvironment } from "./environment";

export interface BuildMetadata {
  readonly application: "vayon";
  readonly version: string;
  readonly environment: string;
  readonly buildId: string;
  readonly commitSha: string;
  readonly builtAt: string | null;
}

export function getBuildMetadata(): BuildMetadata {
  return Object.freeze({
    application: "vayon",
    version: process.env.APP_VERSION ?? packageMetadata.version,
    environment: getAppEnvironment(),
    buildId: process.env.BUILD_ID ?? process.env.VERCEL_DEPLOYMENT_ID ?? "local",
    commitSha: process.env.GIT_COMMIT_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    builtAt: process.env.BUILD_TIMESTAMP ?? null,
  });
}
