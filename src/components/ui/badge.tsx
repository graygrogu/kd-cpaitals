import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "navy",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "navy" | "brand" | "muted" }) {
  const tones = {
    navy: "bg-navy-900/5 text-navy-700 border-navy-100",
    brand: "bg-brand-50 text-brand-700 border-brand-200",
    muted: "bg-sand-100 text-navy-600 border-navy-100",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
