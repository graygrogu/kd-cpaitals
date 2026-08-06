import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, Check, ChevronDown, Lightbulb, Target, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n";
import { cn, scrollToId } from "@/lib/utils";
import type { CaseStudy } from "@/i18n/types";

function ImpactTable({ item, labels }: { item: CaseStudy; labels: { view: string; hide: string } }) {
  const [open, setOpen] = useState(false);
  if (!item.impact) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-navy-100 bg-sand-50">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900 transition-colors duration-200 hover:bg-navy-50/80"
      >
        <span className="text-[14.5px]">{open ? labels.hide : labels.view}</span>
        <ChevronDown className={cn("size-4 shrink-0 text-navy-400 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-navy-100 px-5 pb-5 pt-4">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-navy-400">
                {item.impact.title}
              </p>
              <div className="-mx-1 overflow-x-auto no-scrollbar">
                <table className="w-full min-w-[440px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr>
                      {item.impact.head.map((h, i) => (
                        <th
                          key={h}
                          className={cn(
                            "border-b border-navy-200 pb-2.5 text-[12.5px] font-bold uppercase tracking-wide text-navy-500",
                            i > 0 && "text-right",
                          )}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.impact.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-navy-100/80">
                        <td className="py-2.5 font-medium text-navy-600">{row[0]}</td>
                        <td className="py-2.5 text-right tabular-nums text-navy-400">{row[1]}</td>
                        <td className="py-2.5 text-right font-semibold tabular-nums text-navy-900">{row[2]}</td>
                      </tr>
                    ))}
                    <tr className="bg-brand-50">
                      {item.impact.footRow.map((c, i) => (
                        <td
                          key={i}
                          className={cn(
                            "py-3 font-display font-extrabold text-brand-700",
                            i === 0 ? "pl-2" : "pr-2 text-right tabular-nums",
                          )}
                        >
                          {c}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Column({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof AlertCircle;
  title: string;
  items: string[];
  tone: "bad" | "neutral" | "good";
}) {
  const styles = {
    bad: { chip: "bg-navy-900/[0.06] text-navy-400", dot: "bg-navy-300" },
    neutral: { chip: "bg-navy-900/[0.06] text-navy-600", dot: "bg-navy-400" },
    good: { chip: "bg-brand-500/12 text-brand-600", dot: "bg-brand-500" },
  }[tone];

  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className={cn("grid size-7 place-items-center rounded-lg", styles.chip)}>
          <Icon className="size-3.5" strokeWidth={2.2} />
        </span>
        <p className="text-[12.5px] font-bold uppercase tracking-wide text-navy-500">{title}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-navy-600">
            {tone === "good" ? (
              <Check className="mt-1 size-3.5 shrink-0 text-brand-600" strokeWidth={3.5} />
            ) : (
              <span className={cn("mt-[9px] size-1.5 shrink-0 rounded-full", styles.dot)} />
            )}
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudies() {
  const { t } = useLang();
  const L = t.cases.labels;

  return (
    <section id="case-studies" className="section-pad relative bg-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />

      <div className="container">
        <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.heading} sub={t.cases.sub} />

        <div className="mt-14 flex flex-col gap-7">
          {t.cases.items.map((item, idx) => (
            <Reveal key={item.title} delay={0.04}>
              <article className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift">
                {/* header */}
                <div className="border-b border-navy-100 bg-gradient-to-br from-sand-50 to-white p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="brand">{item.tag}</Badge>
                    <span className="text-[12.5px] font-semibold uppercase tracking-wide text-navy-300">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.4rem] font-extrabold leading-tight text-navy-900 md:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-navy-500">{item.subtitle}</p>

                  <div className="mt-5 flex flex-col gap-1.5 text-[13.5px] text-navy-500 sm:flex-row sm:flex-wrap sm:gap-x-8">
                    <p>
                      <span className="font-semibold text-navy-400">{L.profile}: </span>
                      {item.profile}
                    </p>
                    <p>
                      <span className="font-semibold text-navy-400">{L.requirement}: </span>
                      {item.requirement}
                    </p>
                  </div>

                  {/* metrics */}
                  <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100 sm:grid-cols-3">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="bg-white px-3 py-3.5 text-center sm:py-4">
                        <p className="font-display text-lg font-extrabold leading-tight text-navy-900 sm:text-xl">
                          {m.value}
                        </p>
                        <p className="mt-1 text-[12px] font-semibold leading-snug text-navy-400">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* body */}
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="grid gap-7 lg:grid-cols-3 lg:gap-8">
                    <Column icon={AlertCircle} title={L.problem} items={item.problem} tone="bad" />
                    <Column icon={Wrench} title={L.strategy} items={item.strategy} tone="neutral" />
                    <Column icon={Target} title={L.result} items={item.result} tone="good" />
                  </div>

                  <ImpactTable item={item} labels={{ view: L.viewImpact, hide: L.hideImpact }} />

                  <div className="mt-6 flex gap-3 rounded-xl bg-navy-900/[0.035] p-5">
                    <Lightbulb className="mt-0.5 size-[18px] shrink-0 text-brand-600" strokeWidth={2.1} />
                    <p className="text-[14.5px] leading-relaxed text-navy-700">
                      <span className="font-bold text-navy-900">{L.takeaway}: </span>
                      {item.takeaway}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* closing */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-navy-100 bg-sand-50 p-8 text-center md:p-12">
            <h3 className="h3">{t.cases.whyTitle}</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {t.cases.whyItems.map((w) => (
                <li
                  key={w}
                  className="rounded-full border border-navy-100 bg-white px-4 py-2 text-[13.5px] font-semibold text-navy-700 shadow-ring"
                >
                  {w}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-2xl font-display text-lg font-semibold text-navy-400 md:text-xl">
              {t.cases.closing1}
            </p>
            <p className="mx-auto mt-1 max-w-2xl font-display text-xl font-extrabold text-navy-900 md:text-2xl">
              {t.cases.closing2}
            </p>
            <Button variant="accent" size="lg" className="group mt-8" onClick={() => scrollToId("contact")}>
              {t.cases.cta}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <p className="mt-6 text-[12.5px] text-navy-400">{t.cases.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
