import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "size"> {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    error,
    leadingIcon,
    className = "",
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    disabled,
    ...props
  },
  ref,
) {
  const descriptionId = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;
  const describedBy = [ariaDescribedBy, descriptionId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        {leadingIcon ? (
          <span
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={ariaInvalid ?? Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={`h-11 w-full rounded-xl border bg-white/[0.045] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-50 ${
            leadingIcon ? "pl-10" : ""
          } ${
            error
              ? "border-red-400/70"
              : "border-white/10 hover:border-white/20"
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
