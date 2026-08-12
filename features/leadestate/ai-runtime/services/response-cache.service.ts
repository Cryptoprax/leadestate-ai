import"server-only";import{createHash}from"node:crypto";export class ResponseCacheService{key(value:unknown){return createHash("sha256").update(JSON.stringify(value)).digest("hex")}}
