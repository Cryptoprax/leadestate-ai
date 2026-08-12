import { forwardRef, type HTMLAttributes } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ className = "", size = "xl", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  },
);
