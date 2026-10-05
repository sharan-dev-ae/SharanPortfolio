import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-border bg-surface text-secondary inline-flex rounded-full border px-2.5 py-1 text-xs",
        className,
      )}
      {...props}
    />
  );
}
