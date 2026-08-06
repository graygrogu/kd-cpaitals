import { Languages } from "lucide-react";
import { useLang } from "@/i18n";
import { cn } from "@/lib/utils";
import { AnimatedBackground } from "@/components/motion/animated-background";

export function LanguageToggle({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-navy-200 bg-white p-0.5 shadow-ring transition-colors duration-200",
        className,
      )}
      role="group"
      aria-label="Language / भाषा"
    >
      {!compact && <Languages className="ml-2 mr-0.5 size-3.5 text-navy-400" aria-hidden />}
      <AnimatedBackground
        value={lang}
        onValueChange={(id) => id && setLang(id as "en" | "hi")}
        className="rounded-full bg-navy-900 shadow-soft"
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        {(["en", "hi"] as const).map((l) => (
          <button
            key={l}
            type="button"
            data-id={l}
            className={cn(
              "min-h-8 min-w-8 rounded-full px-2.5 text-[11px] font-bold leading-none transition-colors duration-200",
              lang === l ? "text-white" : "text-navy-500 hover:text-navy-900",
            )}
          >
            {l === "en" ? "EN" : "हिं"}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}
