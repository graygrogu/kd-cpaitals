import {
  Children,
  cloneElement,
  useEffect,
  useId,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>[]
    | ReactElement<{ "data-id": string }>;
  /** Controlled active id */
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

/**
 * Motion Primitives — Animated Background
 * Sliding highlight behind the active/hovered item (tabs, chips, toggles).
 */
export function AnimatedBackground({
  children,
  value,
  defaultValue,
  onValueChange,
  className,
  transition = { type: "spring", stiffness: 380, damping: 34 },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(value ?? defaultValue ?? null);
  const uniqueId = useId();
  const controlled = value !== undefined;

  useEffect(() => {
    if (controlled) setActiveId(value ?? null);
  }, [controlled, value]);

  useEffect(() => {
    if (!controlled && defaultValue !== undefined) setActiveId(defaultValue);
  }, [controlled, defaultValue]);

  const handleSetActiveId = (id: string | null) => {
    if (!controlled) setActiveId(id);
    onValueChange?.(id);
  };

  return Children.map(children, (child, index) => {
    type ChildProps = {
      "data-id": string;
      className?: string;
      onClick?: (e: MouseEvent) => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      "aria-pressed"?: boolean;
      "data-checked"?: string;
      children?: ReactNode;
    };

    const node = child as ReactElement<ChildProps>;
    const id = node.props["data-id"];

    const interactionProps: Partial<ChildProps> = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: (e: MouseEvent) => {
            node.props.onClick?.(e);
            handleSetActiveId(id);
          },
        };

    return cloneElement(
      node,
      {
        key: index,
        className: cn("relative inline-flex", node.props.className),
        "aria-pressed": activeId === id,
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      } satisfies Partial<ChildProps> & { key: number },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0", className)}
              transition={transition}
              initial={{ opacity: defaultValue || value ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10 inline-flex items-center gap-[inherit]">
          {node.props.children}
        </span>
      </>,
    );
  });
}
