"use client";
import { useState } from "react";
import { SearchableSelect, type SelectOption } from "@/features/onboarding/components/SearchableSelect";

export type RegionalSelectProps = { name: string; label: string; value?: string; defaultValue?: string; options: readonly SelectOption[]; onChange?: (value: string) => void; placeholder: string; required?: boolean; disabled?: boolean; error?: string };
export function RegionalSelect({ value, defaultValue, onChange, disabled, ...props }: RegionalSelectProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const update = (next: string) => { setInternal(next); onChange?.(next); };
  if (disabled) return <div className="opacity-60"><SearchableSelect {...props} value="" options={[]} onChange={() => undefined} placeholder="Select the preceding location first" /></div>;
  return <SearchableSelect {...props} value={current} onChange={update} />;
}
