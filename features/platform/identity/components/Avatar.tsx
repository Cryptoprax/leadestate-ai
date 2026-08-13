export interface AvatarProps {
  name: string;
  initials: string;
  tone?: string;
  size?: "sm" | "md";
}

export function Avatar({
  name,
  initials,
  tone = "from-vds-primary to-vds-info",
  size = "md",
}: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} font-bold text-vds-foreground shadow-lg ${
        size === "sm" ? "size-7 text-[9px]" : "size-9 text-[10px]"
      }`}
      role="img"
      aria-label={`${name} avatar`}
    >
      {initials}
    </span>
  );
}
