import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b12] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)] hover:bg-cyan-300 active:bg-cyan-500",
  secondary:
    "border border-white/10 bg-white/10 text-white shadow-sm hover:border-white/15 hover:bg-white/15 active:bg-white/20",
  outline:
    "border border-white/20 bg-transparent text-slate-100 hover:border-cyan-300/50 hover:bg-cyan-300/5 hover:text-cyan-100",
  ghost:
    "bg-transparent text-slate-300 hover:bg-white/[0.07] hover:text-white active:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={joinClasses(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
