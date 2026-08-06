import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/** Soft spring — the “wobbly” Motion Primitives magnetic feel */
const WOBBLE_SPRING: SpringOptions = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

export type MagneticProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  range?: number;
  actionArea?: "self" | "parent" | "global";
  springOptions?: SpringOptions;
};

/**
 * Motion Primitives — Magnetic
 * Cursor-attracted wobble via a soft spring. Disabled on touch / coarse pointers.
 */
export function Magnetic({
  children,
  className,
  intensity = 0.35,
  range = 120,
  actionArea = "self",
  springOptions = WOBBLE_SPRING,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;
  const [isHovered, setIsHovered] = useState(actionArea === "global");
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    if (!enabled) return;

    const calculateDistance = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const absoluteDistance = Math.hypot(distanceX, distanceY);

      if (isHovered && absoluteDistance <= range) {
        const scale = 1 - absoluteDistance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    document.addEventListener("mousemove", calculateDistance);
    return () => document.removeEventListener("mousemove", calculateDistance);
  }, [enabled, isHovered, intensity, range, x, y]);

  useEffect(() => {
    if (!enabled || actionArea !== "parent" || !ref.current?.parentElement) return;
    const parent = ref.current.parentElement;
    const enter = () => setIsHovered(true);
    const leave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };
    parent.addEventListener("mouseenter", enter);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mouseenter", enter);
      parent.removeEventListener("mouseleave", leave);
    };
  }, [enabled, actionArea, x, y]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      onMouseEnter={actionArea === "self" ? () => setIsHovered(true) : undefined}
      onMouseLeave={
        actionArea === "self"
          ? () => {
              setIsHovered(false);
              x.set(0);
              y.set(0);
            }
          : undefined
      }
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/** Convenience alias — wobbly container using Magnetic springs */
export function Wobble({
  children,
  className,
  intensity = 0.28,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <Magnetic className={className} intensity={intensity} range={140} actionArea="self">
      {children}
    </Magnetic>
  );
}
