import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-navy-200 bg-white px-4 text-[15px] text-navy-900",
        "placeholder:text-navy-300 transition-all duration-200 ease-out",
        "hover:border-navy-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-navy-200",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("mb-2 block text-sm font-semibold text-navy-800", className)} {...props} />
  ),
);
Label.displayName = "Label";
