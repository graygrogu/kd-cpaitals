import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calculator } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { Wobble } from "@/components/motion/magnetic";
import { RangeField, useShort } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n";
import { calculateEMI, cn, formatINR, scrollToId } from "@/lib/utils";

export function EmiCalculator() {
  const { t } = useLang();
  const short = useShort();

  const [amount, setAmount] = useState(5_000_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [active, setActive] = useState<string | null>(null);

  const { emi, interest, total, principal } = useMemo(
    () => calculateEMI(amount, rate, years * 12),
    [amount, rate, years],
  );

  const principalPct = total > 0 ? (principal / total) * 100 : 0;
  const R = 54;
  const C = 2 * Math.PI * R;

  const applyPreset = (p: { label: string; amount: number; rate: number; years: number }) => {
    setAmount(p.amount);
    setRate(p.rate);
    setYears(p.years);
    setActive(p.label);
  };

  return (
    <section id="calculator" className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-50 via-white to-sand-50" />

      <div className="container">
        <SectionHeading eyebrow={t.emi.eyebrow} title={t.emi.heading} sub={t.emi.sub} />

        <Reveal className="mt-12">
          <Wobble intensity={0.18}>
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lift">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* controls */}
              <div className="border-b border-navy-100 p-5 sm:p-7 md:p-9 lg:border-b-0 lg:border-r">
                <div className="mb-7">
                  <p className="mb-3 text-[12.5px] font-bold uppercase tracking-wide text-navy-400">
                    {t.emi.presets}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <AnimatedBackground
                      value={active}
                      onValueChange={(id) => {
                        const p = t.emi.presetItems.find((item) => item.label === id);
                        if (p) applyPreset(p);
                      }}
                      className="rounded-full bg-brand-500 shadow-soft"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    >
                      {t.emi.presetItems.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          data-id={p.label}
                          className={cn(
                            "min-h-10 rounded-full border px-3 py-2 text-[12.5px] font-semibold transition-colors duration-200 sm:px-4 sm:text-[13.5px]",
                            active === p.label
                              ? "border-transparent text-white"
                              : "border-navy-200 bg-white text-navy-600 hover:border-navy-300 hover:text-navy-900",
                          )}
                        >
                          {p.label}
                        </button>
                      ))}
                    </AnimatedBackground>
                  </div>
                </div>

                <div className="flex flex-col gap-7">
                  <RangeField
                    label={t.emi.amount}
                    value={amount}
                    min={100000}
                    max={100000000}
                    step={100000}
                    onChange={(v) => {
                      setAmount(v);
                      setActive(null);
                    }}
                    display={short(amount)}
                    minLabel={short(100000)}
                    maxLabel={short(100000000)}
                  />
                  <RangeField
                    label={t.emi.rate}
                    value={rate}
                    min={7}
                    max={24}
                    step={0.05}
                    onChange={(v) => {
                      setRate(v);
                      setActive(null);
                    }}
                    display={`${rate.toFixed(2)}%`}
                    minLabel="7%"
                    maxLabel="24%"
                  />
                  <RangeField
                    label={t.emi.tenure}
                    value={years}
                    min={1}
                    max={30}
                    step={1}
                    onChange={(v) => {
                      setYears(v);
                      setActive(null);
                    }}
                    display={`${years} ${t.emi.years}`}
                    minLabel={`1 ${t.emi.years}`}
                    maxLabel={`30 ${t.emi.years}`}
                  />
                </div>
              </div>

              {/* result */}
              <div className="relative flex flex-col justify-center bg-navy-900 p-5 text-center sm:p-7 md:p-9">
                <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-500/15 blur-3xl" />

                <div className="relative mx-auto">
                  <svg viewBox="0 0 140 140" className="size-[168px] -rotate-90" aria-hidden>
                    <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="13" />
                    <motion.circle
                      cx="70"
                      cy="70"
                      r={R}
                      fill="none"
                      stroke="#0E9F6E"
                      strokeWidth="13"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      animate={{ strokeDashoffset: C - (principalPct / 100) * C }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                        {t.emi.monthlyEmi}
                      </p>
                      <p className="mt-1 font-display text-[1.65rem] font-extrabold tabular-nums leading-none text-white">
                        {formatINR(emi)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {[
                    { label: t.emi.principal, value: short(principal), dot: "bg-brand-500" },
                    { label: t.emi.interest, value: short(interest), dot: "bg-white/25" },
                    { label: t.emi.total, value: short(total), dot: "bg-transparent" },
                  ].map((b) => (
                    <div key={b.label} className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3.5 sm:px-2">
                      <span className="mx-auto mb-1.5 flex items-center justify-center gap-1.5">
                        {b.dot !== "bg-transparent" && <span className={cn("size-2 shrink-0 rounded-full", b.dot)} />}
                        <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-white/45">
                          {b.label}
                        </span>
                      </span>
                      <p className="font-display text-[15px] font-extrabold tabular-nums text-white sm:text-[14px] md:text-[15px]">{b.value}</p>
                    </div>
                  ))}
                </div>

                <Button variant="accent" size="lg" className="group relative mt-7" onClick={() => scrollToId("contact")}>
                  <Calculator />
                  {t.emi.cta}
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Button>

                <p className="relative mt-5 text-[11.5px] leading-relaxed text-white/40">{t.emi.disclaimer}</p>
              </div>
            </div>
          </div>
          </Wobble>
        </Reveal>
      </div>
    </section>
  );
}
