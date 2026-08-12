import { SectionHeader } from "../../components/SectionHeader";
import type { SettingsCategory } from "../types/settings";
import { SettingsCard } from "./SettingsCard";

export function SettingsSection({
  category,
}: {
  category: SettingsCategory;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
      <SectionHeader
        title={category.name}
        description={category.description}
      />
      <div className="mt-4 space-y-2">
        {category.options.map((option) => (
          <SettingsCard key={option.id} option={option} />
        ))}
      </div>
    </section>
  );
}
