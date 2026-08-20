export type SecuritySeverity="critical"|"high"|"medium"|"low"|"informational";export type FindingStatus="open"|"mitigated"|"accepted"|"verified";
export interface SecurityFinding{id:string;area:string;severity:SecuritySeverity;title:string;evidence:string;recommendation:string;status:FindingStatus}
export interface RlsAudit{tables:number;enabled:number;fullyCovered:number;missingRls:readonly string[];missingPolicies:readonly string[]}
export interface SecuritySnapshot{score:number;statuses:{rbac:string;rls:string;dependencies:string;secrets:string;rateLimiting:string};findings:readonly SecurityFinding[];rls:RlsAudit;dependency:{total:number;critical:number;high:number;moderate:number;low:number;generatedAt:string};events:{permissionDenials:number;rateLimits:number;suspiciousRequests:number};generatedAt:string}
export interface RateLimitDecision{allowed:boolean;remaining:number;retryAfterSeconds:number}
export interface RateLimitProvider{readonly id:string;consume(key:string,limit:number,windowSeconds:number):Promise<RateLimitDecision>}
