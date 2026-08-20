import type { CRMActivity, CRMCustomerIntelligence, CRMHealthIssue, CRMObservability, CRMRecommendation } from "../types";
export interface CRMEvidence { readonly customers: readonly CRMCustomerIntelligence[]; readonly issues: readonly CRMHealthIssue[]; readonly recommendations: readonly CRMRecommendation[]; readonly recentActivity: readonly CRMActivity[]; readonly observability: CRMObservability; }
export interface CRMAIRepositoryContract { evidence(): Promise<CRMEvidence>; }
