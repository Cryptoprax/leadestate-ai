import { forwardRef, type HTMLAttributes } from "react";

export type SectionSpacing = "sm" | "md" | "lg";
export type SectionTone = "transparent" | "subtle";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  tone?: SectionTone;
}

const spacingStyles: Record<SectionSpacing, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

const toneStyles: Record<SectionTone, string> = {
  transparent: "",
  subtle: "border-y border-vds-border/[0.07] bg-vds-surface/[0.025]",
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    className = "",
    spacing = "lg",
    tone = "transparent",
    ...props
  },
  ref,
) {
  return (
    <section
      ref={ref}
      className={`${spacingStyles[spacing]} ${toneStyles[tone]} ${className}`}
      {...props}
    />
  );
});
