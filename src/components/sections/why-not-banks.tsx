import { motion } from "motion/react";
import { ArrowRight, BadgeIndianRupee, Building2, Check, Quote, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useLang } from "@/i18n";
import { scrollToId } from "@/lib/utils";

export function WhyNotBanks() {
  const { t } = useLang();

  return (
    <section id="why-not-banks" className="section-pad relative overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />

      <div className="container">
        <SectionHeading
          eyebrow={t.compare.eyebrow}
          title={t.compare.heading}
          sub={t.compare.sub}
          align="left"
          className="max-w-3xl"
        />

        {/* story */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-[62ch]">
            {t.compare.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="mb-4 text-[16px] leading-[1.75] text-navy-600 last:mb-0">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="relative rounded-2xl border border-brand-200 bg-brand-50/60 p-7">
              <Quote className="absolute right-6 top-6 size-8 text-brand-500/20" />
              <Logo className="mb-4" />
              <p className="text-[15.5px] font-medium leading-relaxed text-navy-800">{t.compare.highlight}</p>
            </div>
          </Reveal>
        </div>

        {/* comparison */}
        <Reveal className="mt-16">
          <h3 className="h3 mb-6 text-center">{t.compare.tableTitle}</h3>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* bank column */}
          <Reveal>
            <div className="h-full rounded-2xl border border-navy-100 bg-sand-50 p-6 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-navy-900/[0.06] text-navy-400">
                  <Building2 className="size-5" strokeWidth={1.9} />
                </span>
                <h4 className="font-display text-[17px] font-bold text-navy-500">{t.compare.colA}</h4>
              </div>
              <ul className="flex flex-col gap-4">
                {t.compare.rows.map((r, i) => (
                  <motion.li
                    key={r.a}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.05, duration: 0.45 }}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-navy-500"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-navy-900/[0.06]">
                      <X className="size-3 text-navy-400" strokeWidth={3} />
                    </span>
                    {r.a}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* KD column */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-brand-500/25 bg-navy-900 p-6 shadow-lift md:p-7">
              <div aria-hidden className="absolute -right-16 -top-16 size-52 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-500 text-white">
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <h4 className="font-display text-[17px] font-bold text-white">{t.compare.colB}</h4>
              </div>
              <ul className="relative flex flex-col gap-4">
                {t.compare.rows.map((r, i) => (
                  <motion.li
                    key={r.b}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.05, duration: 0.45 }}
                    className="flex gap-3 text-[14.5px] font-medium leading-relaxed text-white/90"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500">
                      <Check className="size-3 text-white" strokeWidth={4} />
                    </span>
                    {r.b}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* fee transparency */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-navy-100 bg-sand-50 p-7 md:p-9">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/12 text-brand-600">
                <BadgeIndianRupee className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="h3">{t.compare.feeTitle}</h3>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {t.compare.fee.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-soft"
                >
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-navy-400">{f.label}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-brand-600">{f.value}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-navy-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* punch line */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-7 py-12 text-center md:px-12 md:py-16">
            <div aria-hidden className="absolute inset-0 opacity-[0.07]">
              <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400 blur-[100px]" />
            </div>
            <p className="relative font-display text-xl font-semibold text-white/45 md:text-2xl">{t.compare.punch1}</p>
            <p className="relative mt-2 font-display text-2xl font-extrabold leading-tight text-white md:text-[2.1rem]">
              {t.compare.punch2}
            </p>
            <Button
              variant="accent"
              size="lg"
              className="group relative mt-8"
              onClick={() => scrollToId("contact")}
            >
              {t.compare.cta}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
