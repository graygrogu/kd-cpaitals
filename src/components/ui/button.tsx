import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
    "transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none " +
    "disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy-900 text-white shadow-lift hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lift",
        accent: "bg-brand-500 text-white shadow-lift hover:bg-brand-600 hover:-translate-y-0.5",
        outline: "border border-navy-200 bg-white/80 text-navy-900 backdrop-blur hover:border-navy-300 hover:bg-white hover:-translate-y-0.5 shadow-soft",
        ghost: "text-navy-700 hover:bg-navy-50 hover:text-navy-900",
        whatsapp: "bg-[#25D366] text-white shadow-lift hover:bg-[#1FB855] hover:-translate-y-0.5",
        link: "text-brand-600 underline-offset-4 hover:underline rounded-md",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg]:size-4",
        md: "h-12 px-6 text-[15px] [&_svg]:size-[18px]",
        lg: "h-14 px-7 text-base [&_svg]:size-5",
        icon: "h-11 w-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
