import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, Check, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/reveal";
import { NumberTicker } from "@/components/motion/number-ticker";
import { GridPattern, GrowthLine } from "@/components/motion/backdrop";
import { useLang } from "@/i18n";
import { cn, scrollToId } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28 md:pb-24 md:pt-36">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-50/80 via-sand-50 to-sand-50" />
        <GridPattern className="text-navy-900/[0.045]" id="hero-grid" />
        <div className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-brand-400/10 blur-[110px]" />
        <div className="absolute -right-32 top-20 size-[30rem] rounded-full bg-navy-400/10 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sand-50 to-transparent" />
      </div>

      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* ── copy ── */}
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ShieldCheck className="size-3.5 text-brand-600" />
              {t.hero.eyebrow}
            </motion.span>

            <h1 className="h1 mt-6 text-balance">
              <TextReveal text={t.hero.headline1} delay={0.12} />{" "}
              <TextReveal
                text={t.hero.headline2}
                delay={0.34}
                wordClassName="bg-gradient-to-br from-brand-600 to-brand-500 bg-clip-text text-transparent"
              />
            </h1>

            <motion.p
              className="lede mt-7 max-w-xl text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
            >
              {t.hero.sub}
            </motion.p>

            <motion.ul
              className="mt-7 flex flex-wrap gap-x-5 gap-y-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.75 } } }}
            >
              {t.hero.badges.map((b) => (
                <motion.li
                  key={b}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="flex items-center gap-2 text-[14px] font-semibold text-navy-700"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/12">
                    <Check className="size-3 text-brand-600" strokeWidth={3.5} />
                  </span>
                  <Marked text={b} />
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
            >
              <Button size="lg" variant="accent" onClick={() => scrollToId("contact")} className="group w-full sm:w-auto">
                {t.hero.ctaPrimary}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId("contact")} className="w-full sm:w-auto">
                <CalendarCheck />
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>

            <motion.p
              className="mt-5 text-[13px] font-medium text-navy-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
            >
              {t.hero.note}
            </motion.p>
          </div>

          {/* ── visual ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
          >
            <div className="relative mx-auto w-full max-w-[440px] lg:pt-[4.75rem]">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-400/12 via-transparent to-navy-500/10 blur-2xl" />

              <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lift">
                <div className="flex items-center justify-between border-b border-navy-100 bg-navy-900 px-6 py-4">
                  <span className="font-display text-sm font-bold text-white">{t.hero.cardTitle}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-500/20 px-2.5 py-1 text-[11px] font-bold text-brand-300">
                    <TrendingUp className="size-3" />
                    +150%
                  </span>
                </div>

                <div className="divide-y divide-navy-100">
                  {t.hero.cardRows.map((r, i) => (
                    <motion.div
                      key={r.label}
                      className="flex min-w-0 items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.95 + i * 0.16, duration: 0.5, ease: EASE }}
                    >
                      <span className="min-w-0 text-[13px] font-medium text-navy-500 sm:text-sm">{r.label}</span>
                      <span
                        className={cn(
                          "shrink-0 font-display text-base font-extrabold tabular-nums sm:text-lg",
                          r.tone === "bad" && "text-navy-300 line-through decoration-navy-300/70",
                          r.tone === "good" && "text-brand-600",
                          r.tone === "neutral" && "text-navy-900",
                        )}
                      >
                        {r.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-sand-50 px-6 pb-5 pt-4">
                  <GrowthLine className="mb-3" />
                  <p className="text-center text-[13px] font-semibold text-navy-500">{t.hero.cardFoot}</p>
                </div>
              </div>

              {/* floating trust chips */}
              <motion.div
                className="absolute left-3 top-0 z-10 hidden rounded-2xl border border-navy-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur lg:block"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg bg-brand-500/12">
                    <ShieldCheck className="size-4 text-brand-600" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-[13px] font-extrabold text-navy-900">30+ Lenders</p>
                    <p className="text-[11px] text-navy-400">Compared for you</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 right-2 hidden rounded-2xl border border-navy-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur lg:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.68, duration: 0.6, ease: EASE }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg bg-navy-900/[0.06]">
                    <TrendingUp className="size-4 text-navy-700" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-[13px] font-extrabold text-navy-900">₹84 L saved</p>
                    <p className="text-[11px] text-navy-400">One MSME client</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── stats strip ── */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 shadow-soft md:mt-20 md:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7, ease: EASE }}
        >
          {t.hero.stats.map((s) => (
            <div key={s.label} className="bg-white px-3 py-5 text-center sm:px-5 sm:py-6 md:px-6 md:py-7">
              <p className="font-display text-[1.35rem] font-extrabold tracking-tight text-navy-900 sm:text-[1.6rem] md:text-3xl">
                <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix === "*" ? "" : s.suffix} />
                {s.suffix === "*" && <sup className="ml-0.5 text-[0.55em] font-bold">*</sup>}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase leading-snug tracking-wider text-navy-400 sm:text-[12px] md:text-[13px]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-navy-400">{t.hero.feeNote}</p>
      </div>
    </section>
  );
}

function Marked({ text }: { text: string }) {
  if (!text.endsWith("*")) return text;
  return (
    <>
      {text.slice(0, -1)}
      <sup className="ml-0.5 text-[0.7em] font-bold leading-none">*</sup>
    </>
  );
}
