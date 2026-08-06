import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-brand-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className={cn("h2 text-balance", align === "center" && "mx-auto max-w-3xl")}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className={cn("lede text-pretty", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>{sub}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
