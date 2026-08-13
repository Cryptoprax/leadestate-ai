import { forwardRef, type HTMLAttributes } from "react";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "border-vds-border bg-vds-surface/[0.06] text-vds-secondary",
  accent: "border-vds-accent-border bg-vds-primary-soft text-vds-primary",
  success: "border-vds-success bg-vds-success-soft text-vds-success",
  warning: "border-vds-warning bg-vds-warning-soft text-vds-warning",
};

const dotStyles: Record<BadgeVariant, string> = {
  neutral: "bg-vds-subtle",
  accent: "bg-vds-primary",
  success: "bg-vds-success",
  warning: "bg-vds-warning",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className = "",
    variant = "neutral",
    withDot = false,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {withDot ? (
        <span
          className={`size-1.5 rounded-full ${dotStyles[variant]}`}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </span>
  );
});
