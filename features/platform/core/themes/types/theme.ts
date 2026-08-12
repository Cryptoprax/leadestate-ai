export interface Theme {
  id: string;
  name: string;
  description: string;
  typography: string;
  colors: string[];
  borderRadius: string;
  status: "Available" | "Preview" | "Custom";
  isDefault: boolean;
  previewClass: string;
}
