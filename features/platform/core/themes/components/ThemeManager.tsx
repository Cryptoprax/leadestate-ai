import { themes } from "../config/themes";
import { ThemeCard } from "./ThemeCard";

export function ThemeManager() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
}
