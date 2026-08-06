import {
  AnimatePresence,
  motion,
  type MotionProps,
  type Transition,
  type Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type TransitionPanelProps = {
  children: React.ReactNode[];
  className?: string;
  transition?: Transition;
  activeIndex: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

/** Default left → right panel slide (Motion Primitives style). */
export const slideLeftRight = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

/**
 * Motion Primitives — Transition Panel
 * Enter/exit content switches with directional motion.
 */
export function TransitionPanel({
  children,
  className,
  transition = { type: "spring", stiffness: 320, damping: 32, mass: 0.8 },
  variants = slideLeftRight,
  activeIndex,
  ...motionProps
}: TransitionPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence initial={false} mode="popLayout" custom={motionProps.custom}>
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
