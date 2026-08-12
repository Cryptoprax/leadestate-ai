export type SearchResultCategory =
  | "Applications"
  | "Organizations"
  | "Users"
  | "Properties"
  | "Leads"
  | "Commands"
  | "Pages"
  | "Reports"
  | "Documents"
  | "Settings";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchResultCategory;
  metadata: string;
  iconName: string;
}
