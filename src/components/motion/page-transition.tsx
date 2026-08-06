import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n";
import { slideLeftRight } from "@/components/motion/transition-panel";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/**
 * Full-page left↔right Transition Panel when language switches.
 * On touch / small screens: light fade only (no blur/slide jank).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const prev = useRef(lang);
  const direction = useRef(1);

  if (prev.current !== lang) {
    direction.current = lang === "hi" ? 1 : -1;
    prev.current = lang;
  }

  if (reduce) return <>{children}</>;

  const rich = fine;

  return (
    <AnimatePresence mode="wait" custom={direction.current} initial={false}>
      <motion.div
        key={lang}
        custom={direction.current}
        variants={
          rich
            ? slideLeftRight
            : {
                enter: { opacity: 0 },
                center: { opacity: 1 },
                exit: { opacity: 0 },
              }
        }
        initial="enter"
        animate="center"
        exit="exit"
        transition={
          rich
            ? { type: "spring", stiffness: 280, damping: 30, mass: 0.85 }
            : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
