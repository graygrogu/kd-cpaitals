import { Briefcase, Gauge, Home, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Wobble } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n";
import { scrollToId } from "@/lib/utils";

const ICONS = { briefcase: Briefcase, home: Home, gauge: Gauge } as const;

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="section-pad relative">
      <div className="container">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.heading} sub={t.services.sub} />

        <Stagger className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.groups.map((g) => {
            const Icon = ICONS[g.icon as keyof typeof ICONS] ?? Briefcase;
            return (
              <StaggerItem key={g.title} className="h-full">
                <Wobble className="h-full" intensity={0.22}>
                  <TiltCard className="h-full rounded-2xl">
                    <div className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                      <span className="grid size-12 place-items-center rounded-xl bg-navy-900 text-white transition-transform duration-300 ease-out group-hover:scale-105">
                        <Icon className="size-[22px]" strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{g.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-navy-500">{g.blurb}</p>

                      <div className="my-6 hairline" />

                      <ul className="flex flex-1 flex-col gap-4">
                        {g.items.map((item) => (
                          <li key={item.name} className="flex gap-3">
                            <span className="mt-1 grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-500/12">
                              <Check className="size-2.5 text-brand-600" strokeWidth={4} />
                            </span>
                            <div>
                              <p className="text-[14.5px] font-bold leading-snug text-navy-900">{item.name}</p>
                              <p className="mt-0.5 text-[13px] leading-relaxed text-navy-500">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </Wobble>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="group" onClick={() => scrollToId("contact")}>
            {t.services.cta}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
