import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  duration = "42s",
  gap = "3.5rem",
  pauseOnHover = true,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: string;
  gap?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={{ ["--duration" as string]: duration, ["--gap" as string]: gap, gap }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 animate-marquee items-center justify-around",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
