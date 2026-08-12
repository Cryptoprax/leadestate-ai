import type { HTMLAttributes } from "react";

export function PageContainer({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[100rem] px-5 py-7 sm:px-8 sm:py-9 xl:px-10 ${className}`}
      {...props}
    />
  );
}
