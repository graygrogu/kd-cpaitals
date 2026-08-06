import { ArrowUpRight, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Wobble } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n";

export function Social() {
  const { t } = useLang();

  return (
    <section id="social" className="section-pad bg-white">
      <div className="container">
        <SectionHeading eyebrow={t.social.eyebrow} title={t.social.heading} sub={t.social.sub} />

        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3" stagger={0.06}>
          {t.social.placeholders.map((p, i) => (
            <StaggerItem key={p}>
              <Wobble intensity={0.24}>
                <a
                  href={t.brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-900 to-navy-800 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift sm:aspect-square sm:p-5"
                >
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 size-40 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: i % 2 ? "rgba(14,159,110,0.22)" : "rgba(92,124,176,0.22)", opacity: 0.7 }}
                  />
                  <Instagram className="relative size-5 text-white/50" />
                  <div className="relative">
                    <p className="font-display text-[13.5px] font-bold leading-snug text-white sm:text-[15px] md:text-base">{p}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-300">
                      {t.social.handle}
                      <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </Wobble>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex justify-center">
          <a href={t.brand.instagram} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              <Instagram />
              {t.social.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
