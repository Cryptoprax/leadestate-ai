import { settingsCategories } from "../config/settings";
import { SettingsSection } from "./SettingsSection";

export function SettingsPlatform() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {settingsCategories.map((category) => (
        <SettingsSection key={category.id} category={category} />
      ))}
    </div>
  );
}
