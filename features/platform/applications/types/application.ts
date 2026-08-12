export type ApplicationStatus =
  | "operational"
  | "beta"
  | "preview"
  | "maintenance";

export type ApplicationCategory =
  | "Product"
  | "Operations"
  | "Intelligence"
  | "Platform"
  | "Ecosystem";

export interface ApplicationNavigationItem {
  id: string;
  title: string;
  route: string;
  iconName: string;
}

export interface ApplicationTheme {
  accent: string;
  gradient: string;
  glow: string;
}

export interface PlatformApplication {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  status: ApplicationStatus;
  installed: boolean;
  version: string;
  category: ApplicationCategory;
  permissions: string[];
  navigation: ApplicationNavigationItem[];
  theme: ApplicationTheme;
}
