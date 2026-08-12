import { forwardRef, type HTMLAttributes } from "react";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "border-white/10 bg-white/[0.06] text-slate-300",
  accent: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  warning: "border-amber-300/20 bg-amber-300/10 text-amber-200",
};

const dotStyles: Record<BadgeVariant, string> = {
  neutral: "bg-slate-400",
  accent: "bg-cyan-300",
  success: "bg-emerald-300",
  warning: "bg-amber-300",
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
