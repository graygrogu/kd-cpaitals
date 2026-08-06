import {
  Award, BookOpen, Handshake, Layers, Network, Route, ShieldCheck, Quote,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { GridPattern } from "@/components/motion/backdrop";
import { Wobble } from "@/components/motion/magnetic";
import { useLang } from "@/i18n";

const ICONS = {
  award: Award, network: Network, handshake: Handshake, book: BookOpen,
  layers: Layers, route: Route, shield: ShieldCheck,
} as const;

export function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why-us" className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <GridPattern className="text-navy-900/[0.035]" id="why-grid" />
        <div className="absolute -left-24 top-1/4 size-96 rounded-full bg-brand-400/[0.07] blur-[100px]" />
      </div>

      <div className="container">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.heading} sub={t.why.sub} />

        {/* founder */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
              <div className="relative">
                <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-400/15 to-navy-500/10 blur-xl" />
                {/* Portrait placeholder — drop in the real photo at /public/founder.jpg */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-100 via-sand-100 to-brand-50 shadow-lift">
                  <svg viewBox="0 0 200 250" className="absolute inset-0 size-full text-navy-900/15" aria-hidden>
                    <circle cx="100" cy="88" r="40" fill="currentColor" />
                    <path d="M30 250c0-42 31-72 70-72s70 30 70 72z" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-transparent px-6 pb-6 pt-16">
                    <p className="font-display text-xl font-extrabold text-white">{t.why.founderName}</p>
                    <p className="mt-1 text-[13px] font-semibold text-brand-300">{t.why.founderRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-[1.6rem] font-bold leading-snug text-navy-900 md:text-[1.9rem]">
                {t.why.founderHeading}
              </h3>
            </Reveal>
            {t.why.founderStory.map((p, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.75] text-navy-600">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="mt-9 rounded-2xl border-l-[3px] border-brand-500 bg-white p-6 shadow-soft">
                <Quote className="mb-3 size-5 text-brand-500/40" />
                <p className="font-display text-lg font-bold leading-snug text-navy-900 md:text-xl">
                  {t.why.punch1}
                  <br />
                  <span className="text-brand-600">{t.why.punch2}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* USPs */}
        <Reveal className="mt-16">
          <h3 className="h3 mb-7 text-center">{t.why.uspTitle}</h3>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.06}>
          {t.why.usps.map((u) => {
            const Icon = ICONS[u.icon as keyof typeof ICONS] ?? ShieldCheck;
            return (
              <StaggerItem key={u.title} className="h-full">
                <Wobble className="h-full" intensity={0.2}>
                  <div className="group h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                    <span className="grid size-11 place-items-center rounded-xl bg-navy-900/[0.05] text-navy-700 transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </span>
                    <p className="mt-4 font-display text-[15.5px] font-bold leading-snug text-navy-900">{u.title}</p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-navy-500">{u.desc}</p>
                  </div>
                </Wobble>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-navy-500">
            {t.why.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
