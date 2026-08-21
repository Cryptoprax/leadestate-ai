import { forwardRef, type HTMLAttributes } from "react";

export type CardVariant = "default" | "glass";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "border border-vds-border bg-[var(--vds-color-surface)] shadow-[0_18px_60px_var(--vds-shadow-color)]",
  glass:
    "border border-vds-border bg-vds-surface/[0.055] shadow-[0_18px_60px_var(--vds-shadow-color)] backdrop-blur-xl",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-7 sm:p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className = "",
    variant = "default",
    padding = "md",
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`vds-card-motion rounded-3xl transition duration-200 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    />
  );
});
