export interface SettingsOption {
  id: string;
  label: string;
  description: string;
  value: string;
}

export interface SettingsCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  options: SettingsOption[];
}
