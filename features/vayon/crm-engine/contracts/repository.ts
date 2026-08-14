import type {
  CrmCompany,
  CrmLeadListQuery,
  CrmLeadProfile,
  CrmLeadRow,
  CrmPage,
  CrmProviderKind,
  CrmTimelineItem,
} from "../domain/contracts";
export interface CrmRepository {
  readonly provider: CrmProviderKind;
  leads(query: CrmLeadListQuery): Promise<CrmPage<CrmLeadRow>>;
  lead(id: string): Promise<CrmLeadProfile | null>;
  customers(query: CrmLeadListQuery): Promise<CrmPage<CrmLeadRow>>;
  companies(search?: string): Promise<readonly CrmCompany[]>;
  activities(limit?: number): Promise<readonly CrmTimelineItem[]>;
}
