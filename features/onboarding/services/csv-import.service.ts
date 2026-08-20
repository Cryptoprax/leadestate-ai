import type { ImportKind, ImportPreview } from "../domain/enterprise-onboarding";

const required: Record<ImportKind, readonly string[]> = {
  contacts: ["name"],
  companies: ["name"],
  leads: ["name"],
  deals: ["name"],
  properties: ["title"],
};

export class OnboardingCsvImportService {
  preview(kind: ImportKind, csv: string): ImportPreview {
    const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
    const headers = this.row(lines[0] ?? "").map((value) => value.trim().toLowerCase());
    const errors = required[kind]
      .filter((field) => !headers.includes(field))
      .map((field) => `Missing required column: ${field}`);
    const rows = lines.slice(1, 101).map((line) =>
      Object.fromEntries(headers.map((header, index) => [header, this.row(line)[index]?.trim() ?? ""])),
    );
    const keys = new Set<string>();
    let duplicates = 0;
    for (const row of rows) {
      const key = `${row.email ?? ""}|${row.phone ?? ""}|${row.name ?? row.title ?? ""}`.toLowerCase();
      if (keys.has(key)) duplicates += 1;
      else keys.add(key);
    }
    return { kind, headers, rows, duplicates, errors };
  }

  private row(line: string) {
    const values: string[] = [];
    let value = "", quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"' && line[index + 1] === '"') { value += '"'; index += 1; }
      else if (character === '"') quoted = !quoted;
      else if (character === "," && !quoted) { values.push(value); value = ""; }
      else value += character;
    }
    values.push(value);
    return values;
  }
}
